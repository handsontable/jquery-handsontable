// TODO remove hot-formula-parser

import { BasePlugin } from '../base';
import staticRegister from '../../utils/staticRegister';
import { registerHF } from './hyperformulaSetup';
import { error } from '../../helpers/console';
import { isDefined, isUndefined } from '../../helpers/mixed';

export const PLUGIN_KEY = 'formulas';
export const PLUGIN_PRIORITY = 260;

/**
 * The formulas plugin.
 *
 * @plugin Formulas
 */
export class Formulas extends BasePlugin {
  static get PLUGIN_KEY() {
    return PLUGIN_KEY;
  }

  static get PLUGIN_PRIORITY() {
    return PLUGIN_PRIORITY;
  }

  /**
   * Plugin settings.
   *
   * @private
   */
  #settings = this.hot.getSettings()[PLUGIN_KEY];

  /**
   * Static register used to set up one global HyperFormula instance.
   *
   * @private
   * @type {object}
   */
  #staticRegister = staticRegister('formulas');

  /**
   * Flag used to retrieve the data straight from Handsontable.
   *
   * @private
   * @type {boolean}
   */
  #skipHF = false;

  /**
   * Flag used to bypass hooks in internal operations.
   *
   * @type {boolean}
   */
  #internal = false;

  /**
   * The HyperFormula instance that will be used for this instance of Handsontable.
   *
   * @type {HyperFormula}
   */
  hyperformula = null;

  /**
   * HyperFormula's sheet name.
   *
   * @type {string}
   */
  sheetName = null;

  /**
   * HyperFormula's sheet id.
   *
   * @type {number}
   */
  sheetId = null;

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link Formulas#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  isEnabled() {
    /* eslint-disable no-unneeded-ternary */
    return this.hot.getSettings()[PLUGIN_KEY] ? true : false;
  }

  /**
   * Enables the plugin functionality for this Handsontable instance.
   */
  enablePlugin() {
    if (this.enabled) {
      return;
    }

    this.addHook('afterLoadData', (...args) => this.onAfterLoadData(...args));
    this.addHook('modifyData', (...args) => this.onModifyData(...args));
    this.addHook('modifySourceData', (...args) => this.onModifySourceData(...args));

    // TODO test if the `before` hook will actually block operations
    this.addHook('beforeCreateRow', (...args) => this.onBeforeCreateRow(...args));
    this.addHook('beforeCreateCol', (...args) => this.onBeforeCreateCol(...args));

    this.addHook('afterCreateRow', (...args) => this.onAfterCreateRow(...args));
    this.addHook('afterCreateCol', (...args) => this.onAfterCreateCol(...args));

    this.addHook('beforeRemoveRow', (...args) => this.onBeforeRemoveRow(...args));
    this.addHook('beforeRemoveCol', (...args) => this.onBeforeRemoveCol(...args));

    this.addHook('afterRemoveRow', (...args) => this.onAfterRemoveRow(...args));
    this.addHook('afterRemoveCol', (...args) => this.onAfterRemoveCol(...args));

    this.setupHF();

    // HyperFormula events:
    this.hyperformula.on('valuesUpdated', (...args) => this.onHFvaluesUpdated(...args));

    this.applyHFSettings();

    super.enablePlugin();
  }

  /**
   * Disables the plugin functionality for this Handsontable instance.
   */
  disablePlugin() {
    super.disablePlugin();
  }

  /**
   * Triggered on `updateSettings`.
   */
  updatePlugin() {
    this.#settings = this.hot.getSettings()[PLUGIN_KEY];

    this.applyHFSettings();

    if (this.#settings.sheetName !== this.sheetName) {
      this.switchSheet(this.#settings.sheetName);
    }

    super.updatePlugin();
  }

  /**
   * Destroys the plugin instance.
   */
  destroy() {
    const hfInstances = staticRegister('formulas').getItem('hyperformulaInstances');
    const sharedHFInstanceUsage = hfInstances.get(this.hyperformula);

    if (sharedHFInstanceUsage && sharedHFInstanceUsage.includes(this.hot.guid)) {
      sharedHFInstanceUsage.splice(
        sharedHFInstanceUsage.indexOf(this.hot.guid),
        1
      );

      this.hyperformula.destroy();
    }

    super.destroy();
  }

  /**
   * Setup the HyperFormula instance. It either creates a new (possibly shared) HyperFormula instance, or attaches
   * the plugin to an already-existing instance.
   */
  setupHF() {
    const settingsHF = this.#settings.hyperformula;

    switch (typeof settingsHF) {
      // There was a HyperFormula class passed.
      case 'function': {
        this.hyperformula = registerHF(settingsHF, this.hot.guid);
        break;
      }
      // There was a HyperFormula instance passed.
      case 'object': {
        const hfInstances = staticRegister('formulas').getItem('hyperformulaInstances');
        const sharedHFInstanceUsage = hfInstances.get(settingsHF);

        this.hyperformula = settingsHF;

        if (sharedHFInstanceUsage) {
          sharedHFInstanceUsage.push(this.hot.guid);
        }

        break;
      }
      default:
    }
  }

  /**
   * Add a sheet to the shared HyperFormula instance.
   *
   * @param {Array} sheetData Data passed to the shared HyperFormula instance. Has to be declared as an array of
   * arrays - array of objects is not supported in this scenario.
   * @param {string} [sheetName] The new sheet name. If not provided, will be auto-generated by HyperFormula.
   * @param {boolean} [autoLoad] If `true`, the new sheet will be loaded into the Handsontable instance.
   * @returns {boolean} `false` if the data format is unusable, `true` otherwise.
   */
  addSheet(sheetData, sheetName, autoLoad) {
    if (
      !sheetData ||
      !Array.isArray(sheetData) ||
      (sheetData.length && !Array.isArray(sheetData[0]))
    ) {
      error('The provided data should be an array of arrays.');
      return false;
    }

    const actualSheetName = this.hyperformula.addSheet(sheetName ?? void 0);
    this.hyperformula.setSheetContent(actualSheetName, sheetData);

    if (autoLoad) {
      this.switchSheet(actualSheetName);
    }

    return true;
  }

  /**
   * Switch the sheet used as data in the Handsontable instance (it loads the data from the shared HyperFormula
   * instance).
   *
   * @param {string} sheetName Sheet name used in the shared HyperFormula instance.
   */
  switchSheet(sheetName) {
    this.sheetName = sheetName;
    this.sheetId = this.hyperformula.getSheetId(this.sheetName);

    this.#internal = true;
    this.hot.loadData(this.hyperformula.getSheetSerialized(this.sheetId));
    this.#internal = false;
  }

  /**
   * Applies the settings passed to the plugin to the HF instance.
   *
   * @private
   */
  applyHFSettings() {
    const hotSettings = this.hot.getSettings();
    const hfConfig = this.#settings.hyperFormulaConfig;

    this.hyperformula.updateConfig({
      ...(hfConfig || {}),
      maxColumns: hotSettings.maxColumns,
      maxRows: hotSettings.maxRows
    });
  }

  /**
   * `afterLoadData` hook callback.
   *
   * @private
   */
  onAfterLoadData() {
    if (this.#internal) {
      return;
    }

    const sheetName = this.#settings.sheetName;

    if (
      isUndefined(sheetName) ||
      (isDefined(sheetName) && !this.hyperformula.doesSheetExist(sheetName))
    ) {
      this.sheetName = this.hyperformula.addSheet(sheetName);
    }

    this.sheetId = this.hyperformula.getSheetId(this.sheetName);

    if (this.hot.getSettings().data) {
      this.skipHF = true;
      this.hyperformula.setSheetContent(this.sheetName, this.hot.getSourceDataArray());
      this.skipHF = false;

    } else {
      this.switchSheet(sheetName);
    }
  }

  onModifyData(row, column, valueHolder, ioMode) {
    if (!this.enabled || this.#skipHF) {
      // TODO check if this line is actually ever reached
      return;
    }

    const address = {
      row: this.hot.toVisualRow(row),
      col: column,
      sheet: this.hyperformula.getSheetId(this.sheetName)
    };

    if (ioMode === 'get') {
      const cellValue = this.hyperformula.getCellValue(address);

      // If `cellValue` is an object it is expected to be an error
      const value = (typeof cellValue === 'object' && cellValue !== null) ? cellValue.value : cellValue;

      // Omit the leading `'` from presentation, and all `getData` operations
      const prettyValue = typeof value === 'string' ? (value.indexOf('\'') === 0 ? value.slice(1) : value) : value;

      valueHolder.value = prettyValue;
    } else {
      this.hyperformula.setCellContents(address, valueHolder.value);
    }
  }

  onModifySourceData(row, col, valueHolder, ioMode) {
    if (!this.enabled || this.skipHF) {
      return;
    }

    const dimensions = this.hyperformula.getSheetDimensions(this.hyperformula.getSheetId(this.sheetName));

    // Don't actually change the source data if HyperFormula is not
    // initialized yet. This is done to allow the `afterLoadData` hook to
    // load the existing source data with `Handsontable#getSourceDataArray`
    // properly.
    if (dimensions.width === 0 && dimensions.height === 0) {
      return;
    }

    const address = {
      row: this.hot.toVisualRow(row),
      col,
      sheet: this.hyperformula.getSheetId(this.sheetName)
    };

    if (ioMode === 'get') {
      valueHolder.value = this.hyperformula.getCellSerialized(address);
    } else if (ioMode === 'set') {
      this.hyperformula.setCellContents(address, valueHolder.value);
    }
  }

  onBeforeCreateRow(row, amount) {
    return this.hyperformula.isItPossibleToAddRows(this.sheetId, [row, amount]);
  }

  onBeforeCreateCol(col, amount) {
    return this.hyperformula.isItPossibleToAddColumns(this.sheetId, [col, amount]);
  }

  onAfterCreateRow(row, amount) {
    this.hyperformula.addRows(this.sheetId, [row, amount]);
  }

  onAfterCreateCol(col, amount) {
    this.hyperformula.addColumns(this.sheetId, [col, amount]);
  }

  onBeforeRemoveRow(row, amount) {
    return this.hyperformula.isItPossibleToRemoveRows(this.sheetId, [row, amount]);
  }

  onBeforeRemoveCol(col, amount) {
    return this.hyperformula.isItPossibleToRemoveRows(this.sheetId, [col, amount]);
  }

  onAfterRemoveRow(row, amount) {
    this.hyperformula.removeRows(this.sheetId, [row, amount]);
  }

  onAfterRemoveCol(col, amount) {
    this.hyperformula.removeColumns(this.sheetId, [col, amount]);
  }

  /**
   * HyperFormula's `valuesUpdated` event callback.
   *
   * @param {Array} changes Array of objects containing information about HF changes.
   */
  onHFvaluesUpdated(changes) {
    let isAffectedByChange = false;

    changes.some((change) => {
      isAffectedByChange = change.address.sheet === this.sheetId;

      return isAffectedByChange;
    });

    if (isAffectedByChange) {
      this.hot.render();
    }
  }
}
