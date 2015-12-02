
import BasePlugin from './../_base';
import {arrayEach} from './../../helpers/array';
import {CommandExecutor} from './commandExecutor';
import {EventManager} from './../../eventManager';
import {hasClass} from './../../helpers/dom/element';
import {ItemsFactory} from './itemsFactory';
import {Menu} from './menu';
import {objectEach, mixin} from './../../helpers/object';
import {registerPlugin} from './../../plugins';
import {stopPropagation} from './../../helpers/dom/event';
import {
  ROW_ABOVE,
  ROW_BELOW,
  COLUMN_LEFT,
  COLUMN_RIGHT,
  REMOVE_ROW,
  REMOVE_COLUMN,
  UNDO,
  REDO,
  READ_ONLY,
  ALIGNMENT,
  SEPARATOR,
  predefinedItems
} from './predefinedItems';

/**
 * @plugin ContextMenu
 */
class ContextMenu extends BasePlugin {
  /**
   * Default menu items order when `contextMenu` is enabled by `true`.
   *
   * @returns {Array}
   */
  static get DEFAULT_ITEMS() {
    return [
      ROW_ABOVE, ROW_BELOW,
      SEPARATOR,
      COLUMN_LEFT, COLUMN_RIGHT,
      SEPARATOR,
      REMOVE_ROW, REMOVE_COLUMN,
      SEPARATOR,
      UNDO, REDO,
      SEPARATOR,
      READ_ONLY,
      SEPARATOR,
      ALIGNMENT,
    ];
  }

  constructor(hotInstance) {
    super(hotInstance);
    /**
     * Instance of {@link EventManager}.
     *
     * @type {EventManager}
     */
    this.eventManager = new EventManager(this);
    /**
     * Instance of {@link CommandExecutor}.
     *
     * @type {CommandExecutor}
     */
    this.commandExecutor = new CommandExecutor(this.hot);
    /**
     * Instance of {@link ItemsFactory}.
     *
     * @type {ItemsFactory}
     */
    this.itemsFactory = null;
    /**
     * Instance of {@link Menu}.
     *
     * @type {Menu}
     */
    this.menu = null;
  }

  /**
   * Check if the plugin is enabled in the handsontable settings.
   *
   * @returns {Boolean}
   */
  isEnabled() {
    return this.hot.getSettings().contextMenu;
  }

  /**
   * Enable plugin for this Handsontable instance.
   */
  enablePlugin() {
    if (this.enabled) {
      return;
    }
    this.itemsFactory = new ItemsFactory(this.hot, ContextMenu.DEFAULT_ITEMS);

    const settings = this.hot.getSettings().contextMenu;
    let predefinedItems = {
      items: this.itemsFactory.getVisibleItems(settings)
    };
    this.registerEvents();

    if (typeof settings.callback === 'function') {
      this.commandExecutor.setCommonCallback(settings.callback);
    }
    super.enablePlugin();

    this.callOnPluginsReady(() => {
      this.hot.runHooks('afterContextMenuDefaultOptions', predefinedItems);

      this.itemsFactory.setPredefinedItems(predefinedItems.items);
      let menuItems = this.itemsFactory.getVisibleItems(settings);

      this.menu = new Menu(this.hot, {
        className: 'htContextMenu',
        keepInViewport: true // 自动调节右键菜单的位置
      });
      this.menu.setMenuItems(menuItems);

      this.menu.addLocalHook('afterOpen', () => this.hot.runHooks('afterContextMenuShow', this));
      this.menu.addLocalHook('afterClose', () => this.hot.runHooks('afterContextMenuHide', this));
      this.menu.addLocalHook('executeCommand', (...params) => this.executeCommand.apply(this, params));

      // Register all commands. Predefined and added by user or by plugins
      arrayEach(menuItems, (command) => this.commandExecutor.registerCommand(command.key, command));
    });
  }

  /**
   * Disable plugin for this Handsontable instance.
   */
  disablePlugin() {
    this.close();

    if (this.menu) {
      this.menu.destroy();
      this.menu = null;
    }
    super.disablePlugin();
  }

  /**
   * Register dom listeners.
   *
   * @private
   */
  registerEvents() {
    this.eventManager.addEventListener(this.hot.rootElement, 'contextmenu', (event) => this.onContextMenu(event));
  }

  /**
   * Open menu and re-position it based on dom event object.
   *
   * @param {Event} event
   */
  open(event) {
    if (!this.menu) {
      return;
    }
    this.menu.open();
    this.menu.setPosition(event);

    // ContextMenu is not detected HotTableEnv correctly because is injected outside hot-table
    this.menu.hotMenu.isHotTableEnv = this.hot.isHotTableEnv;
    Handsontable.eventManager.isHotTableEnv = this.hot.isHotTableEnv;
  }

  /**
   * Close menu.
   */
  close() {
    if (!this.menu) {
      return;
    }
    this.menu.close();
  }

  /**
   * Execute context menu command.
   *
   * You can execute all predefined commands:
   *  * `'row_above'` - Insert row above
   *  * `'row_below'` - Insert row below
   *  * `'col_left'` - Insert column on the left
   *  * `'col_right'` - Insert column on the right
   *  * `'clear_column'` - Clear selected column
   *  * `'remove_row'` - Remove row
   *  * `'remove_col'` - Remove column
   *  * `'undo'` - Undo last action
   *  * `'redo'` - Redo last action
   *  * `'make_read_only'` - Make cell read only
   *  * `'alignment:left'` - Alignment to the left
   *  * `'alignment:top'` - Alignment to the top
   *  * `'alignment:right'` - Alignment to the right
   *  * `'alignment:bottom'` - Alignment to the bottom
   *  * `'alignment:middle'` - Alignment to the middle
   *  * `'alignment:center'` - Alignment to the center (justify)
   *
   * Or you can execute command registered in settings where `key` is your command name.
   *
   * @param {String} commandName
   * @param {*} params
   */
  executeCommand(...params) {
    this.commandExecutor.execute.apply(this.commandExecutor, params);
  }

  /**
   * Destroy instance.
   */
  destroy() {
    this.close();

    if (this.menu) {
      this.menu.destroy();
    }
    super.destroy();
  }

  /**
   * On context menu listener.
   *
   * @private
   * @param {Event} event
   */
  onContextMenu(event) {
    let settings = this.hot.getSettings();
    let showRowHeaders = settings.rowHeaders;
    let showColHeaders = settings.colHeaders;

    function isValidElement(element) {
      return element.nodeName === 'TD' || element.parentNode.nodeName === 'TD';
    }
    // if event is from hot-table we must get web component element not element inside him
    let element = event.realTarget;
    this.close();

    event.preventDefault();
    stopPropagation(event);

    if (!(showRowHeaders || showColHeaders)) {
      if (!isValidElement(element) && !(hasClass(element, 'current') && hasClass(element, 'wtBorder'))) {
        return;
      }
    } else if (showRowHeaders && showColHeaders) {
      // do nothing after right-click on corner header
      let containsCornerHeader = element.parentNode.querySelectorAll('.cornerHeader').length > 0;

      if (containsCornerHeader) {
        return;
      }
    }
    this.open(event);
  }
}

ContextMenu.SEPARATOR = {
  name: SEPARATOR
};

Handsontable.hooks.register('afterContextMenuDefaultOptions');
Handsontable.hooks.register('afterContextMenuShow');
Handsontable.hooks.register('afterContextMenuHide');
Handsontable.hooks.register('afterContextMenuExecute');

export {ContextMenu};

registerPlugin('contextMenu', ContextMenu);
