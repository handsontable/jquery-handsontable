import {
  getScrollableElement,
  getTrimmingContainer
} from './../../../../helpers/dom/element';
import { arrayEach } from './../../../../helpers/array';
import { warn } from './../../../../helpers/console';
import EventManager from './../../../../eventManager';
import Clone from '../core/clone';

const registeredOverlays = {};

/**
 * Creates an overlay over the original Walkontable instance. The overlay renders the clone of the original Walkontable
 * and (optionally) implements behavior needed for native horizontal and vertical scrolling.
 *
 * @class Overlay
 */
class Overlay {
  /**
   * @type {String}
   */
  static get CLONE_TOP() {
    return 'top';
  }

  /**
   * @type {String}
   */
  static get CLONE_BOTTOM() {
    return 'bottom';
  }

  /**
   * @type {String}
   */
  static get CLONE_LEFT() {
    return 'left';
  }

  /**
   * @type {String}
   */
  static get CLONE_TOP_LEFT_CORNER() {
    return 'top_left_corner';
  }

  /**
   * @type {String}
   */
  static get CLONE_BOTTOM_LEFT_CORNER() {
    return 'bottom_left_corner';
  }

  /**
   * @type {String}
   */
  static get CLONE_DEBUG() {
    return 'debug';
  }

  /**
   * List of all availables clone types
   *
   * @type {Array}
   */
  static get CLONE_TYPES() {
    return [
      Overlay.CLONE_TOP,
      Overlay.CLONE_BOTTOM,
      Overlay.CLONE_LEFT,
      Overlay.CLONE_TOP_LEFT_CORNER,
      Overlay.CLONE_BOTTOM_LEFT_CORNER,
      Overlay.CLONE_DEBUG,
    ];
  }

  /**
   * Register overlay class.
   *
   * @param {String} type Overlay type, one of the CLONE_TYPES value
   * @param {Overlay} overlayClass Overlay class extended from base overlay class {@link Overlay}
   */
  static registerOverlay(type, overlayClass) {
    if (Overlay.CLONE_TYPES.indexOf(type) === -1) {
      throw new Error(`Unsupported overlay (${type}).`);
    }
    registeredOverlays[type] = overlayClass;
  }

  /**
   * Create new instance of overlay type.
   *
   * @param {String} type Overlay type, one of the CLONE_TYPES value
   * @param {Walkontable} wot Walkontable instance
   */
  static createOverlay(type, wot) {
    return new registeredOverlays[type](wot);
  }

  /**
   * Check if specified overlay was registered.
   *
   * @param {String} type Overlay type, one of the CLONE_TYPES value
   * @returns {Boolean}
   */
  static hasOverlay(type) {
    return registeredOverlays[type] !== void 0;
  }

  /**
   * @param {Walkontable} wotInstance
   */
  constructor(wotInstance) {
    this.master = wotInstance;
    this.type = '';
    this.mainTableScrollableElement = null;
    this.trimmingContainer = getTrimmingContainer(this.master.wtTable.hider.parentNode.parentNode);
    this.areElementSizesAdjusted = false;
  }

  /**
   * Update internal state of object with an information about the need of full rendering of the overlay.
   */
  updateStateOfRendering() {
    const oldNeedFullRender = this.needFullRender;

    this.needFullRender = this.shouldBeRendered();

    if (oldNeedFullRender && !this.needFullRender) {
      this.resetElementsSize();
    }
  }

  /**
   * Checks if overlay should be fully rendered
   *
   * @returns {Boolean}
   */
  shouldBeRendered() {
    return true;
  }

  /**
   * Set the DOM element responsible for trimming the overlay's root element. It will be some parent element or the window.
   */
  updateTrimmingContainer() {
    this.trimmingContainer = getTrimmingContainer(this.master.wtTable.hider.parentNode.parentNode);
  }

  /**
   * Update the main scrollable element.
   */
  updateMainScrollableElement() {
    const { wtTable, rootWindow } = this.master;

    if (rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden') {
      this.mainTableScrollableElement = this.master.wtTable.holder;
    } else {
      this.mainTableScrollableElement = getScrollableElement(wtTable.TABLE);
    }
  }

  /**
   * Calculates coordinates of the provided element, relative to the root Handsontable element.
   * NOTE: The element needs to be a child of the overlay in order for the method to work correctly.
   *
   * @param {HTMLElement} element The cell element to calculate the position for.
   * @param {Number} rowIndex Visual row index.
   * @param {Number} columnIndex Visual column index.
   * @returns {{top: Number, left: Number}|undefined}
   */
  getRelativeCellPosition(element, rowIndex, columnIndex) {
    if (this.clone.wtTable.holder.contains(element) === false) {
      warn(`The provided element is not a child of the ${this.type} overlay`);

      return;
    }
    const windowScroll = this.mainTableScrollableElement === this.master.rootWindow;
    const fixedColumn = columnIndex < this.master.getSetting('fixedColumnsLeft');
    const fixedRowTop = rowIndex < this.master.getSetting('fixedRowsTop');
    const fixedRowBottom = rowIndex >= this.master.getSetting('totalRows') - this.master.getSetting('fixedRowsBottom');
    const spreaderOffset = {
      left: this.clone.wtTable.spreader.offsetLeft,
      top: this.clone.wtTable.spreader.offsetTop
    };
    const elementOffset = {
      left: element.offsetLeft,
      top: element.offsetTop
    };
    let offsetObject = null;

    if (windowScroll) {
      offsetObject = this.getRelativeCellPositionWithinWindow(fixedRowTop, fixedColumn, elementOffset, spreaderOffset);

    } else {
      offsetObject = this.getRelativeCellPositionWithinHolder(fixedRowTop, fixedRowBottom, fixedColumn, elementOffset, spreaderOffset);
    }

    return offsetObject;
  }

  /**
   * Calculates coordinates of the provided element, relative to the root Handsontable element within a table with window
   * as a scrollable element.
   *
   * @private
   * @param {Boolean} onFixedRowTop `true` if the coordinates point to a place within the top fixed rows.
   * @param {Boolean} onFixedColumn `true` if the coordinates point to a place within the fixed columns.
   * @param {Number} elementOffset Offset position of the cell element.
   * @param {Number} spreaderOffset Offset position of the spreader element.
   * @returns {{top: Number, left: Number}}
   */
  getRelativeCellPositionWithinWindow(onFixedRowTop, onFixedColumn, elementOffset, spreaderOffset) {
    const absoluteRootElementPosition = this.master.wtTable.wtRootElement.getBoundingClientRect();
    let horizontalOffset = 0;
    let verticalOffset = 0;

    if (!onFixedColumn) {
      horizontalOffset = spreaderOffset.left;

    } else {
      horizontalOffset = absoluteRootElementPosition.left <= 0 ? (-1) * absoluteRootElementPosition.left : 0;
    }

    if (onFixedRowTop) {
      const absoluteOverlayPosition = this.clone.wtTable.TABLE.getBoundingClientRect();

      verticalOffset = absoluteOverlayPosition.top - absoluteRootElementPosition.top;

    } else {
      verticalOffset = spreaderOffset.top;
    }

    return {
      left: elementOffset.left + horizontalOffset,
      top: elementOffset.top + verticalOffset
    };
  }

  /**
   * Calculates coordinates of the provided element, relative to the root Handsontable element within a table with window
   * as a scrollable element.
   *
   * @private
   * @param {Boolean} onFixedRowTop `true` if the coordinates point to a place within the top fixed rows.
   * @param {Boolean} onFixedRowBottom `true` if the coordinates point to a place within the bottom fixed rows.
   * @param {Boolean} onFixedColumn `true` if the coordinates point to a place within the fixed columns.
   * @param {Number} elementOffset Offset position of the cell element.
   * @param {Number} spreaderOffset Offset position of the spreader element.
   * @returns {{top: Number, left: Number}}
   */
  getRelativeCellPositionWithinHolder(onFixedRowTop, onFixedRowBottom, onFixedColumn, elementOffset, spreaderOffset) {
    const tableScrollPosition = {
      horizontal: this.clone.overlay.master.wtOverlays.leftOverlay.getScrollPosition(),
      vertical: this.clone.overlay.master.wtOverlays.topOverlay.getScrollPosition()
    };
    let horizontalOffset = 0;
    let verticalOffset = 0;

    if (!onFixedColumn) {
      horizontalOffset = tableScrollPosition.horizontal - spreaderOffset.left;
    }

    if (onFixedRowBottom) {
      const absoluteRootElementPosition = this.master.wtTable.wtRootElement.getBoundingClientRect();
      const absoluteOverlayPosition = this.clone.wtTable.TABLE.getBoundingClientRect();
      verticalOffset = (absoluteOverlayPosition.top * (-1)) + absoluteRootElementPosition.top;

    } else if (!onFixedRowTop) {
      verticalOffset = tableScrollPosition.vertical - spreaderOffset.top;
    }

    return {
      left: elementOffset.left - horizontalOffset,
      top: elementOffset.top - verticalOffset,
    };
  }

  /**
   * Make a clone of table for overlay
   *
   * @param {String} direction Can be `Overlay.CLONE_TOP`, `Overlay.CLONE_LEFT`,
   *                           `Overlay.CLONE_TOP_LEFT_CORNER`, `Overlay.CLONE_DEBUG`
   * @returns {Walkontable}
   */
  makeClone(direction) {
    if (Overlay.CLONE_TYPES.indexOf(direction) === -1) {
      throw new Error(`Clone type "${direction}" is not supported.`);
    }
    const { wtTable, rootDocument, rootWindow } = this.master;
    const clone = rootDocument.createElement('DIV');
    const clonedTable = rootDocument.createElement('TABLE');

    clone.className = `ht_clone_${direction} handsontable`;
    clone.style.position = 'absolute';
    clone.style.top = 0;
    clone.style.left = 0;
    clone.style.overflow = 'visible';

    clonedTable.className = wtTable.TABLE.className;
    clone.appendChild(clonedTable);

    this.type = direction;
    wtTable.wtRootElement.parentNode.appendChild(clone);

    const preventOverflow = this.master.getSetting('preventOverflow');

    if (preventOverflow === true ||
      preventOverflow === 'horizontal' && this.type === Overlay.CLONE_TOP ||
      preventOverflow === 'vertical' && this.type === Overlay.CLONE_LEFT) {
      this.mainTableScrollableElement = rootWindow;

    } else if (rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden') {
      this.mainTableScrollableElement = wtTable.holder;
    } else {
      this.mainTableScrollableElement = getScrollableElement(wtTable.TABLE);
    }

    return new Clone({
      overlay: this,
      createTableFn: this.createTable,
      table: clonedTable,
    });
  }

  /**
   * Redraws the content of the overlay's clone instance of Walkontable, including the cells, selections and borders.
   * Does not change the size nor the position of the overlay root element.
   *
   * @param {Boolean} [fastDraw=false]
   */
  redrawClone(fastDraw = false) {
    if (this.needFullRender) {
      this.clone.drawClone(fastDraw);
    }
  }

  /**
   * Reset overlay root element's width and height to initial values.
   */
  resetElementsSize() {
    const { holder, hider, wtRootElement } = this.clone.wtTable;
    const holderStyle = holder.style;
    const hidderStyle = hider.style;
    const rootStyle = wtRootElement.style;

    arrayEach([holderStyle, hidderStyle, rootStyle], (style) => {
      style.width = '';
      style.height = '';
    });
  }

  /**
   * Destroy overlay instance
   */
  destroy() {
    (new EventManager(this.clone)).destroy();
  }
}

export default Overlay;
