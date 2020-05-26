import Hooks from './../../pluginHooks';
import { arrayMap, arrayEach } from './../../helpers/array';
import { rangeEach } from './../../helpers/number';
import { inherit, deepClone } from './../../helpers/object';
import { stopImmediatePropagation, isImmediatePropagationStopped } from './../../helpers/dom/event';
import { align } from './../contextMenu/utils';

/**
 * @description
 * Handsontable UndoRedo plugin allows to undo and redo certain actions done in the table.
 *
 * __Note__, that not all actions are currently undo-able. The UndoRedo plugin is enabled by default.
 * @example
 * ```js
 * undo: true
 * ```
 * @class UndoRedo
 * @plugin UndoRedo
 * @param {Core} instance The Handsontable instance.
 */
function UndoRedo(instance) {
  const plugin = this;
  this.instance = instance;
  this.doneActions = [];
  this.undoneActions = [];
  this.ignoreNewActions = false;

  instance.addHook('afterChange', function(changes, source) {
    const changesLen = changes && changes.length;

    if (!changesLen || ['UndoRedo.undo', 'UndoRedo.redo', 'MergeCells'].includes(source)) {
      return;
    }
    const hasDifferences = changes.find((change) => {
      const [,, oldValue, newValue] = change;

      return oldValue !== newValue;
    });

    if (!hasDifferences) {
      return;
    }

    const clonedChanges = changes.reduce((arr, change) => { arr.push([...change]); return arr; }, []);

    arrayEach(clonedChanges, (change) => {
      change[1] = instance.propToCol(change[1]);
    });

    const selected = changesLen > 1 ? this.getSelected() : [[clonedChanges[0][0], clonedChanges[0][1]]];

    plugin.done(new UndoRedo.ChangeAction(clonedChanges, selected));
  });

  instance.addHook('afterCreateRow', (index, amount, source) => {
    if (source === 'UndoRedo.undo' || source === 'UndoRedo.undo' || source === 'auto') {
      return;
    }

    const action = new UndoRedo.CreateRowAction(index, amount);
    plugin.done(action);
  });

  instance.addHook('beforeRemoveRow', (index, amount, logicRows, source) => {
    if (source === 'UndoRedo.undo' || source === 'UndoRedo.redo' || source === 'auto') {
      return;
    }

    const originalData = plugin.instance.getSourceDataArray();
    const rowIndex = (originalData.length + index) % originalData.length;
    const physicalRowIndex = instance.toPhysicalRow(rowIndex);
    const removedData = deepClone(originalData.slice(physicalRowIndex, physicalRowIndex + amount));

    plugin.done(new UndoRedo.RemoveRowAction(rowIndex, removedData));
  });

  instance.addHook('afterCreateCol', (index, amount, source) => {
    if (source === 'UndoRedo.undo' || source === 'UndoRedo.redo' || source === 'auto') {
      return;
    }

    plugin.done(new UndoRedo.CreateColumnAction(index, amount));
  });

  instance.addHook('beforeRemoveCol', (index, amount, logicColumns, source) => {
    if (source === 'UndoRedo.undo' || source === 'UndoRedo.redo' || source === 'auto') {
      return;
    }

    const originalData = plugin.instance.getSourceDataArray();
    const columnIndex = (plugin.instance.countCols() + index) % plugin.instance.countCols();
    const removedData = [];
    const headers = [];
    const indexes = [];

    rangeEach(originalData.length - 1, (i) => {
      const column = [];
      const origRow = originalData[i];

      rangeEach(columnIndex, columnIndex + (amount - 1), (j) => {
        column.push(origRow[instance.toPhysicalColumn(j)]);
      });
      removedData.push(column);
    });

    rangeEach(amount - 1, (i) => {
      indexes.push(instance.toPhysicalColumn(columnIndex + i));
    });

    if (Array.isArray(instance.getSettings().colHeaders)) {
      rangeEach(amount - 1, (i) => {
        headers.push(instance.getSettings().colHeaders[instance.toPhysicalColumn(columnIndex + i)] || null);
      });
    }

    const columnsMap = instance.columnIndexMapper.getIndexesSequence();
    const action = new UndoRedo.RemoveColumnAction(columnIndex, indexes, removedData, headers, columnsMap);

    plugin.done(action);
  });

  instance.addHook('beforeCellAlignment', (stateBefore, range, type, alignment) => {
    const action = new UndoRedo.CellAlignmentAction(stateBefore, range, type, alignment);
    plugin.done(action);
  });

  instance.addHook('beforeFilter', (conditionsStack) => {
    plugin.done(new UndoRedo.FiltersAction(conditionsStack));
  });

  instance.addHook('beforeRowMove', (rows, finalIndex) => {
    if (rows === false) {
      return;
    }

    plugin.done(new UndoRedo.RowMoveAction(rows, finalIndex));
  });

  instance.addHook('beforeMergeCells', (cellRange, auto) => {
    if (auto) {
      return;
    }

    plugin.done(new UndoRedo.MergeCellsAction(instance, cellRange));
  });

  instance.addHook('afterUnmergeCells', (cellRange, auto) => {
    if (auto) {
      return;
    }

    plugin.done(new UndoRedo.UnmergeCellsAction(instance, cellRange));
  });

}

/**
 * @param {object} action The action desciptor.
 */
UndoRedo.prototype.done = function(action) {
  if (!this.ignoreNewActions) {
    this.doneActions.push(action);
    this.undoneActions.length = 0;
  }
};

/**
 * Undo the last action performed to the table.
 *
 * @function undo
 * @memberof UndoRedo#
 * @fires Hooks#beforeUndo
 * @fires Hooks#afterUndo
 */
UndoRedo.prototype.undo = function() {
  if (this.isUndoAvailable()) {
    const action = this.doneActions.pop();
    const actionClone = deepClone(action);
    const instance = this.instance;

    const continueAction = instance.runHooks('beforeUndo', actionClone);

    if (continueAction === false) {
      return;
    }

    this.ignoreNewActions = true;
    const that = this;
    action.undo(this.instance, () => {
      that.ignoreNewActions = false;
      that.undoneActions.push(action);
    });

    instance.runHooks('afterUndo', actionClone);
  }
};

/**
 * Redo the previous action performed to the table (used to reverse an undo).
 *
 * @function redo
 * @memberof UndoRedo#
 * @fires Hooks#beforeRedo
 * @fires Hooks#afterRedo
 */
UndoRedo.prototype.redo = function() {
  if (this.isRedoAvailable()) {
    const action = this.undoneActions.pop();
    const actionClone = deepClone(action);
    const instance = this.instance;

    const continueAction = instance.runHooks('beforeRedo', actionClone);

    if (continueAction === false) {
      return;
    }

    this.ignoreNewActions = true;
    const that = this;
    action.redo(this.instance, () => {
      that.ignoreNewActions = false;
      that.doneActions.push(action);
    });

    instance.runHooks('afterRedo', actionClone);
  }
};

/**
 * Checks if undo action is available.
 *
 * @function isUndoAvailable
 * @memberof UndoRedo#
 * @returns {boolean} Return `true` if undo can be performed, `false` otherwise.
 */
UndoRedo.prototype.isUndoAvailable = function() {
  return this.doneActions.length > 0;
};

/**
 * Checks if redo action is available.
 *
 * @function isRedoAvailable
 * @memberof UndoRedo#
 * @returns {boolean} Return `true` if redo can be performed, `false` otherwise.
 */
UndoRedo.prototype.isRedoAvailable = function() {
  return this.undoneActions.length > 0;
};

/**
 * Clears undo history.
 *
 * @function clear
 * @memberof UndoRedo#
 */
UndoRedo.prototype.clear = function() {
  this.doneActions.length = 0;
  this.undoneActions.length = 0;
};

UndoRedo.Action = function() {};
UndoRedo.Action.prototype.undo = function() {};
UndoRedo.Action.prototype.redo = function() {};

/**
 * Change action.
 *
 * @private
 * @param {Array} changes 2D array containing information about each of the edited cells.
 * @param {number[]} selected The cell selection.
 */
UndoRedo.ChangeAction = function(changes, selected) {
  this.changes = changes;
  this.selected = selected;
  this.actionType = 'change';
};
inherit(UndoRedo.ChangeAction, UndoRedo.Action);

UndoRedo.ChangeAction.prototype.undo = function(instance, undoneCallback) {
  const data = deepClone(this.changes);
  const emptyRowsAtTheEnd = instance.countEmptyRows(true);
  const emptyColsAtTheEnd = instance.countEmptyCols(true);

  for (let i = 0, len = data.length; i < len; i++) {
    data[i].splice(3, 1);
  }

  instance.addHookOnce('afterChange', undoneCallback);

  instance.setDataAtCell(data, null, null, 'UndoRedo.undo');

  for (let i = 0, len = data.length; i < len; i++) {
    const [row, column] = data[i];

    if (instance.getSettings().minSpareRows && row + 1 + instance.getSettings().minSpareRows === instance.countRows() &&
      emptyRowsAtTheEnd === instance.getSettings().minSpareRows) {

      instance.alter('remove_row', parseInt(row + 1, 10), instance.getSettings().minSpareRows);
      instance.undoRedo.doneActions.pop();
    }

    if (instance.getSettings().minSpareCols && column + 1 + instance.getSettings().minSpareCols === instance.countCols() &&
      emptyColsAtTheEnd === instance.getSettings().minSpareCols) {

      instance.alter('remove_col', parseInt(column + 1, 10), instance.getSettings().minSpareCols);
      instance.undoRedo.doneActions.pop();
    }
  }

  instance.selectCells(this.selected, false, false);
};
UndoRedo.ChangeAction.prototype.redo = function(instance, onFinishCallback) {
  const data = deepClone(this.changes);

  for (let i = 0, len = data.length; i < len; i++) {
    data[i].splice(2, 1);
  }

  instance.addHookOnce('afterChange', onFinishCallback);
  instance.setDataAtCell(data, null, null, 'UndoRedo.redo');

  if (this.selected) {
    instance.selectCells(this.selected, false, false);
  }
};

/**
 * Create row action.
 *
 * @private
 * @param {number} index The visual row index.
 * @param {number} amount The number of created rows.
 */
UndoRedo.CreateRowAction = function(index, amount) {
  this.index = index;
  this.amount = amount;
  this.actionType = 'insert_row';
};
inherit(UndoRedo.CreateRowAction, UndoRedo.Action);

UndoRedo.CreateRowAction.prototype.undo = function(instance, undoneCallback) {
  const rowCount = instance.countRows();
  const minSpareRows = instance.getSettings().minSpareRows;

  if (this.index >= rowCount && this.index - minSpareRows < rowCount) {
    this.index -= minSpareRows; // work around the situation where the needed row was removed due to an 'undo' of a made change
  }

  instance.addHookOnce('afterRemoveRow', undoneCallback);
  instance.alter('remove_row', this.index, this.amount, 'UndoRedo.undo');
};
UndoRedo.CreateRowAction.prototype.redo = function(instance, redoneCallback) {
  instance.addHookOnce('afterCreateRow', redoneCallback);
  instance.alter('insert_row', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Remove row action.
 *
 * @private
 * @param {number} index The visual row index.
 * @param {Array} data The removed data.
 */
UndoRedo.RemoveRowAction = function(index, data) {
  this.index = index;
  this.data = data;
  this.actionType = 'remove_row';
};
inherit(UndoRedo.RemoveRowAction, UndoRedo.Action);

UndoRedo.RemoveRowAction.prototype.undo = function(instance, undoneCallback) {
  instance.alter('insert_row', this.index, this.data.length, 'UndoRedo.undo');
  instance.addHookOnce('afterRender', undoneCallback);
  instance.populateFromArray(this.index, 0, this.data, void 0, void 0, 'UndoRedo.undo');
};
UndoRedo.RemoveRowAction.prototype.redo = function(instance, redoneCallback) {
  instance.addHookOnce('afterRemoveRow', redoneCallback);
  instance.alter('remove_row', this.index, this.data.length, 'UndoRedo.redo');
};

/**
 * Create column action.
 *
 * @private
 * @param {number} index The visual column index.
 * @param {number} amount The number of created columns.
 */
UndoRedo.CreateColumnAction = function(index, amount) {
  this.index = index;
  this.amount = amount;
  this.actionType = 'insert_col';
};
inherit(UndoRedo.CreateColumnAction, UndoRedo.Action);

UndoRedo.CreateColumnAction.prototype.undo = function(instance, undoneCallback) {
  instance.addHookOnce('afterRemoveCol', undoneCallback);
  instance.alter('remove_col', this.index, this.amount, 'UndoRedo.undo');
};
UndoRedo.CreateColumnAction.prototype.redo = function(instance, redoneCallback) {
  instance.addHookOnce('afterCreateCol', redoneCallback);
  instance.alter('insert_col', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Remove column action.
 *
 * @private
 * @param {number} index The visual column index.
 * @param {number[]} indexes The visual column indexes.
 * @param {Array} data The removed data.
 * @param {Array} headers The header values.
 * @param {number[]} columnPositions The column position.
 */
UndoRedo.RemoveColumnAction = function(index, indexes, data, headers, columnPositions) {
  this.index = index;
  this.indexes = indexes;
  this.data = data;
  this.amount = this.data[0].length;
  this.headers = headers;
  this.columnPositions = columnPositions.slice(0);
  this.actionType = 'remove_col';
};
inherit(UndoRedo.RemoveColumnAction, UndoRedo.Action);

UndoRedo.RemoveColumnAction.prototype.undo = function(instance, undoneCallback) {
  const ascendingIndexes = this.indexes.slice(0).sort();
  const sortByIndexes = (elem, j, arr) => arr[this.indexes.indexOf(ascendingIndexes[j])];

  const removedDataLength = this.data.length;
  const sortedData = [];

  for (let rowIndex = 0; rowIndex < removedDataLength; rowIndex++) {
    sortedData.push(arrayMap(this.data[rowIndex], sortByIndexes));
  }

  const sortedHeaders = arrayMap(this.headers, sortByIndexes);
  const isFormulaPluginEnabled = instance.getPlugin('formulas') ? instance.getPlugin('formulas').enabled : false;
  const changes = [];

  instance.alter('insert_col', this.indexes[0], this.indexes.length, 'UndoRedo.undo');

  arrayEach(instance.getSourceDataArray(), (rowData, rowIndex) => {
    arrayEach(ascendingIndexes, (changedIndex, contiquesIndex) => {
      rowData[changedIndex] = sortedData[rowIndex][contiquesIndex];

      changes.push([rowIndex, changedIndex, rowData[changedIndex]]);
    });
  });

  instance.setSourceDataAtCell(changes);
  instance.columnIndexMapper.insertIndexes(ascendingIndexes[0], ascendingIndexes.length);

  // TODO Temporary hook for undo/redo mess
  if (isFormulaPluginEnabled) {
    const changes = [];

    arrayEach(instance.getSourceDataArray(), (rowData, rowIndex) => {
      arrayEach(ascendingIndexes, (changedIndex, contiquesIndex) => {
        rowData[changedIndex] = sortedData[rowIndex][contiquesIndex];

        changes.push([rowIndex, changedIndex, null, rowData[changedIndex]]);
      });
    });

    instance.getPlugin('formulas').onAfterSetDataAtCell(changes);
  }

  if (typeof this.headers !== 'undefined') {
    arrayEach(sortedHeaders, (headerData, columnIndex) => {
      instance.getSettings().colHeaders[ascendingIndexes[columnIndex]] = headerData;
    });
  }

  instance.columnIndexMapper.setIndexesSequence(this.columnPositions);

  instance.addHookOnce('afterRender', undoneCallback);

  // TODO Temporary hook for undo/redo mess
  instance.runHooks('afterCreateCol', this.indexes[0], this.indexes.length, 'UndoRedo.undo');

  if (isFormulaPluginEnabled) {
    instance.getPlugin('formulas').recalculateFull();
  }

  instance.render();
};

UndoRedo.RemoveColumnAction.prototype.redo = function(instance, redoneCallback) {
  instance.addHookOnce('afterRemoveCol', redoneCallback);
  instance.alter('remove_col', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Cell alignment action.
 *
 * @private
 * @param {Array} stateBefore The previous state.
 * @param {object} range The cell range.
 * @param {string} type The type of the alignment ("top", "left", "bottom" or "right").
 * @param {string} alignment The alignment CSS class.
 */
UndoRedo.CellAlignmentAction = function(stateBefore, range, type, alignment) {
  this.stateBefore = stateBefore;
  this.range = range;
  this.type = type;
  this.alignment = alignment;
};
UndoRedo.CellAlignmentAction.prototype.undo = function(instance, undoneCallback) {
  arrayEach(this.range, ({ from, to }) => {
    for (let row = from.row; row <= to.row; row += 1) {
      for (let col = from.col; col <= to.col; col += 1) {
        instance.setCellMeta(row, col, 'className', this.stateBefore[row][col] || ' htLeft');
      }
    }
  });

  instance.addHookOnce('afterRender', undoneCallback);
  instance.render();
};
UndoRedo.CellAlignmentAction.prototype.redo = function(instance, undoneCallback) {
  align(this.range, this.type, this.alignment, (row, col) => instance.getCellMeta(row, col),
    (row, col, key, value) => instance.setCellMeta(row, col, key, value));

  instance.addHookOnce('afterRender', undoneCallback);
  instance.render();
};

/**
 * Filters action.
 *
 * @private
 * @param {Array} conditionsStack An array of the filter condition.
 */
UndoRedo.FiltersAction = function(conditionsStack) {
  this.conditionsStack = conditionsStack;
  this.actionType = 'filter';
};
inherit(UndoRedo.FiltersAction, UndoRedo.Action);

UndoRedo.FiltersAction.prototype.undo = function(instance, undoneCallback) {
  const filters = instance.getPlugin('filters');

  instance.addHookOnce('afterRender', undoneCallback);

  filters.conditionCollection.importAllConditions(this.conditionsStack.slice(0, this.conditionsStack.length - 1));
  filters.filter();
};
UndoRedo.FiltersAction.prototype.redo = function(instance, redoneCallback) {
  const filters = instance.getPlugin('filters');

  instance.addHookOnce('afterRender', redoneCallback);

  filters.conditionCollection.importAllConditions(this.conditionsStack);
  filters.filter();
};

/**
 * Merge Cells action.
 *
 * @util
 */
class MergeCellsAction extends UndoRedo.Action {
  constructor(instance, cellRange) {
    super();
    this.cellRange = cellRange;
    this.rangeData = instance.getData(cellRange.from.row, cellRange.from.col, cellRange.to.row, cellRange.to.col);
  }

  undo(instance, undoneCallback) {
    const mergeCellsPlugin = instance.getPlugin('mergeCells');
    instance.addHookOnce('afterRender', undoneCallback);

    mergeCellsPlugin.unmergeRange(this.cellRange, true);
    instance.populateFromArray(this.cellRange.from.row, this.cellRange.from.col, this.rangeData, void 0, void 0, 'MergeCells');
  }

  redo(instance, redoneCallback) {
    const mergeCellsPlugin = instance.getPlugin('mergeCells');
    instance.addHookOnce('afterRender', redoneCallback);

    mergeCellsPlugin.mergeRange(this.cellRange);
  }
}
UndoRedo.MergeCellsAction = MergeCellsAction;

/**
 * Unmerge Cells action.
 *
 * @util
 */
class UnmergeCellsAction extends UndoRedo.Action {
  constructor(instance, cellRange) {
    super();
    this.cellRange = cellRange;
  }

  undo(instance, undoneCallback) {
    const mergeCellsPlugin = instance.getPlugin('mergeCells');
    instance.addHookOnce('afterRender', undoneCallback);

    mergeCellsPlugin.mergeRange(this.cellRange, true);
  }

  redo(instance, redoneCallback) {
    const mergeCellsPlugin = instance.getPlugin('mergeCells');
    instance.addHookOnce('afterRender', redoneCallback);

    mergeCellsPlugin.unmergeRange(this.cellRange, true);
    instance.render();
  }
}
UndoRedo.UnmergeCellsAction = UnmergeCellsAction;

/**
 * ManualRowMove action.
 *
 * @TODO removeRow undo should works on logical index
 * @private
 * @param {number[]} rows An array with moved rows.
 * @param {number} finalIndex The destination index.
 */
UndoRedo.RowMoveAction = function(rows, finalIndex) {
  this.rows = rows.slice();
  this.finalIndex = finalIndex;
};
inherit(UndoRedo.RowMoveAction, UndoRedo.Action);

UndoRedo.RowMoveAction.prototype.undo = function(instance, undoneCallback) {
  const manualRowMove = instance.getPlugin('manualRowMove');
  const copyOfRows = [].concat(this.rows);
  const rowsMovedUp = copyOfRows.filter(a => a > this.finalIndex);
  const rowsMovedDown = copyOfRows.filter(a => a <= this.finalIndex);
  const allMovedRows = rowsMovedUp.sort((a, b) => b - a).concat(rowsMovedDown.sort((a, b) => a - b));

  instance.addHookOnce('afterRender', undoneCallback);

  // Moving rows from those with higher indexes to those with lower indexes when action was performed from bottom to top
  // Moving rows from those with lower indexes to those with higher indexes when action was performed from top to bottom
  for (let i = 0; i < allMovedRows.length; i += 1) {
    const newPhysicalRow = instance.toVisualRow(allMovedRows[i]);

    manualRowMove.moveRow(newPhysicalRow, allMovedRows[i]);
  }

  instance.render();

  instance.deselectCell();
  instance.selectRows(this.rows[0], this.rows[0] + this.rows.length - 1);
};
UndoRedo.RowMoveAction.prototype.redo = function(instance, redoneCallback) {
  const manualRowMove = instance.getPlugin('manualRowMove');

  instance.addHookOnce('afterRender', redoneCallback);
  manualRowMove.moveRows(this.rows.slice(), this.finalIndex);
  instance.render();

  instance.deselectCell();
  instance.selectRows(this.finalIndex, this.finalIndex + this.rows.length - 1);
};

/**
 *
 */
function init() {
  const instance = this;
  const pluginEnabled = typeof instance.getSettings().undo === 'undefined' || instance.getSettings().undo;

  if (pluginEnabled) {
    if (!instance.undoRedo) {
      /**
       * Instance of Handsontable.UndoRedo Plugin {@link Handsontable.UndoRedo}.
       *
       * @alias undoRedo
       * @memberof! Handsontable.Core#
       * @type {UndoRedo}
       */
      instance.undoRedo = new UndoRedo(instance);

      exposeUndoRedoMethods(instance);

      instance.addHook('beforeKeyDown', onBeforeKeyDown);
      instance.addHook('afterChange', onAfterChange);
    }
  } else if (instance.undoRedo) {
    delete instance.undoRedo;

    removeExposedUndoRedoMethods(instance);

    instance.removeHook('beforeKeyDown', onBeforeKeyDown);
    instance.removeHook('afterChange', onAfterChange);
  }
}

/**
 * @param {Event} event The keyboard event object.
 */
function onBeforeKeyDown(event) {
  if (isImmediatePropagationStopped(event)) {
    return;
  }

  const instance = this;
  const editor = instance.getActiveEditor();

  if (editor && editor.isOpened()) {
    return;
  }

  const {
    altKey,
    ctrlKey,
    keyCode,
    metaKey,
    shiftKey,
  } = event;
  const isCtrlDown = (ctrlKey || metaKey) && !altKey;

  if (!isCtrlDown) {
    return;
  }

  const isRedoHotkey = keyCode === 89 || (shiftKey && keyCode === 90);

  if (isRedoHotkey) { // CTRL + Y or CTRL + SHIFT + Z
    instance.undoRedo.redo();
    stopImmediatePropagation(event);

  } else if (keyCode === 90) { // CTRL + Z
    instance.undoRedo.undo();
    stopImmediatePropagation(event);
  }
}

/**
 * @param {Array} changes 2D array containing information about each of the edited cells.
 * @param {string} source String that identifies source of hook call.
 * @returns {boolean}
 */
function onAfterChange(changes, source) {
  const instance = this;
  if (source === 'loadData') {
    return instance.undoRedo.clear();
  }
}

/**
 * @param {Core} instance The Handsontable instance.
 */
function exposeUndoRedoMethods(instance) {
  /**
   * {@link UndoRedo#undo}.
   *
   * @alias undo
   * @memberof! Handsontable.Core#
   * @returns {boolean}
   */
  instance.undo = function() {
    return instance.undoRedo.undo();
  };

  /**
   * {@link UndoRedo#redo}.
   *
   * @alias redo
   * @memberof! Handsontable.Core#
   * @returns {boolean}
   */
  instance.redo = function() {
    return instance.undoRedo.redo();
  };

  /**
   * {@link UndoRedo#isUndoAvailable}.
   *
   * @alias isUndoAvailable
   * @memberof! Handsontable.Core#
   * @returns {boolean}
   */
  instance.isUndoAvailable = function() {
    return instance.undoRedo.isUndoAvailable();
  };

  /**
   * {@link UndoRedo#isRedoAvailable}.
   *
   * @alias isRedoAvailable
   * @memberof! Handsontable.Core#
   * @returns {boolean}
   */
  instance.isRedoAvailable = function() {
    return instance.undoRedo.isRedoAvailable();
  };

  /**
   * {@link UndoRedo#clear}.
   *
   * @alias clearUndo
   * @memberof! Handsontable.Core#
   * @returns {boolean}
   */
  instance.clearUndo = function() {
    return instance.undoRedo.clear();
  };
}

/**
 * @param {Core} instance The Handsontable instance.
 */
function removeExposedUndoRedoMethods(instance) {
  delete instance.undo;
  delete instance.redo;
  delete instance.isUndoAvailable;
  delete instance.isRedoAvailable;
  delete instance.clearUndo;
}

const hook = Hooks.getSingleton();

hook.add('afterInit', init);
hook.add('afterUpdateSettings', init);

hook.register('beforeUndo');
hook.register('afterUndo');
hook.register('beforeRedo');
hook.register('afterRedo');

export default UndoRedo;
