import Handsontable from 'handsontable';

const elem = document.createElement('div');
const hot = new Handsontable(elem, {});

hot.addHook('afterChange', (changes: any[] | null, source: string) => {});
hot.addHook('afterChange', [(changes: any[] | null, source: string) => {}]);
hot.addHookOnce('afterChange', (changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => {});
hot.addHookOnce('afterChange', [(changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => {}]);
hot.alter('insert_row', [[0, 0], [1, 2]], 123, 'foo', true);
hot.alter('insert_row', 123, 123, 'foo', true);
hot.alter('insert_row');
hot.batch(() => 'string').toUpperCase();
hot.batch(() => 12345).toFixed();
hot.batch(() => {});
hot.batchExecution(() => 'string', true).toUpperCase();
hot.batchExecution(() => 12345, false).toFixed();
hot.batchRender(() => 'string').toUpperCase();
hot.batchRender(() => 12345).toFixed();
hot.clear();
hot.clearUndo();
hot.colOffset() === 123;
hot.colToProp(123) === 'foo';
hot.countCols() === 123;
hot.countEmptyCols(true) === 123;
hot.countEmptyRows(true) === 123;
hot.countRenderedCols() === 123;
hot.countRenderedRows() === 123;
hot.countRows() === 123;
hot.countSourceRows() === 123;
hot.countVisibleCols() === 123;
hot.countVisibleRows() === 123;
hot.deselectCell();
hot.destroy();
hot.destroyEditor(true, true);
hot.emptySelectedCells();
hot.getActiveEditor();
hot.getCell(123, 123, true)!.focus();
hot.getCellEditor(123, 123);
hot.getCellMeta(123, 123).type === "text";
hot.getCellMetaAtRow(123).forEach(meta => meta.type === "text");
hot.getCellRenderer(123, 123)(hot, {} as any as HTMLTableCellElement, 1, 2, 'prop', '', {} as any as Handsontable.CellProperties);
hot.getCellsMeta()[0].visualRow
hot.getCellValidator(123, 123);
hot.getColHeader().forEach((header: number | string) => {});
hot.getColHeader(123).toString();
hot.getColWidth(123) === 123;
hot.getCoords(elem.querySelector('td')).row === 0;
hot.getCopyableData(123, 123).toUpperCase();
hot.getCopyableText(123, 123, 123, 123).toUpperCase();
hot.getData(123, 123, 123, 123).forEach(v => v === '');
hot.getDataAtCell(123, 123) === '';
hot.getDataAtCol(123).forEach(v => v === '');
hot.getDataAtProp(123).forEach(v => v === '');
hot.getDataAtRow(123).forEach(v => v === '');
hot.getDataAtRowProp(123, 'foo') === '';
hot.getDataType(123, 123, 123, 123) === 'text';
hot.getInstance() === hot;
hot.getRowHeader().forEach(header => header.toString());
hot.getRowHeader(123) === '';
hot.getRowHeight(123) === 123;
hot.getSchema()['foo'];
hot.getSelected()![0][0] === 123;
hot.getSelectedLast()![0] === 123;
hot.getSelectedRange()![0].from.row === 123;
hot.getSelectedRangeLast()!.to.col === 123;
hot.getSettings().type === 'text';
hot.getSourceData()[0];
hot.getSourceData(123, 123, 123, 123)[0];
hot.getSourceDataAtCell(123, 123) === '';
hot.getSourceDataAtCol(123)[0] === '';
hot.getSourceDataAtRow(123) as any[];
hot.getTranslatedPhrase('foo', 123)!.toLowerCase();
hot.getValue() === '';
hot.hasColHeaders() === true;
hot.hasHook('afterChange') === true;
hot.hasRowHeaders() === true;
hot.init() === void 0;
hot.isColumnModificationAllowed() === true;
hot.isEmptyCol(123) === true;
hot.isEmptyRow(123) === true;
hot.isExecutionSuspended();
hot.isListening() === true;
hot.isRedoAvailable() === true;
hot.isRenderSuspended();
hot.isUndoAvailable() === true;
hot.listen();
hot.loadData([[1,2,3], [1,2,3]]);
hot.loadData([{a:'a',b:2,c:''}, {a:'a',b:2,c:''}]);
hot.populateFromArray(123, 123, [], 123, 123, 'foo', 'shift_down', 'left', []);
hot.propToCol('foo') === 123;
hot.propToCol(123) === 123;
hot.redo();
hot.refreshDimensions();
hot.removeCellMeta(123, 123, 'foo');
hot.removeHook('afterChange', function() {});
hot.render();
hot.resumeExecution();
hot.resumeRender();
hot.rowOffset() === 123;
hot.runHooks('afterChange', 123, 'foo', true, {}, [], function() {});
hot.selectAll();
hot.selectCell(123, 123, 123, 123, true, true);
hot.selectCellByProp(123, 'foo', 123, 'foo', true);
hot.selectCells([[123, 'prop1', 123, 'prop2']], true, true);
hot.selectCells([[123, 123, 123, 123]], true, true);
hot.selectColumns(1, 4);
hot.selectColumns(1);
hot.selectRows(1, 4);
hot.selectRows(1);
hot.setCellMeta(123, 123, 'foo', 'foo');
hot.setCellMetaObject(123, 123, {});
hot.setDataAtCell([[123, 123, 'foo'], [123, 123, {myProperty: 'foo'}]], 'foo');
hot.setDataAtCell(123, 123, 'foo', 'foo');
hot.setDataAtCell(123, 123, {myProperty: 'foo'}, 'foo');
hot.setDataAtRowProp([[123, 'foo', 'foo'], [123, 'foo', 'foo']], 'foo');
hot.setDataAtRowProp(123, 'foo', 'foo', 'foo');
hot.setSourceDataAtCell([[1, 'foo', 'foo']]);
hot.setSourceDataAtCell(123, 123, 'foo', 'sourceString');
hot.setSourceDataAtCell(123, 123, 'foo');
hot.spliceCol(123, 123, 123, 'foo');
hot.spliceRow(123, 123, 123, 'foo');
hot.suspendExecution();
hot.suspendRender();
hot.toPhysicalColumn(123) == 123;
hot.toPhysicalRow(123) === 123;
hot.toVisualColumn(123) === 123;
hot.toVisualRow(123) === 123;
hot.undo();
hot.unlisten();
hot.updateSettings({} as Handsontable.GridSettings, true);
hot.validateCell('test', {} as Handsontable.CellProperties, (valid: boolean) => {}, 'sourceString');
hot.validateCells((valid: boolean) => {});
hot.validateColumns([1, 2, 3], (valid: boolean) => {});
hot.validateRows([1, 2, 3], (valid: boolean) => {});
hot.isDestroyed === false;

hot.rowIndexMapper.executeBatchOperations(() => {});
hot.rowIndexMapper.getPhysicalFromVisualIndex(0);
hot.rowIndexMapper.getVisualFromPhysicalIndex(0);
hot.rowIndexMapper.getRenderableFromVisualIndex(0);
hot.rowIndexMapper.getVisualFromRenderableIndex(0);
hot.rowIndexMapper.getPhysicalFromRenderableIndex(0);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, -1);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, -1, true);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, -1, true, 4);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, 1);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, 1, true);
hot.rowIndexMapper.getFirstNotHiddenIndex(3, 1, true, 2);
hot.rowIndexMapper.getRenderableIndexes();
hot.rowIndexMapper.getRenderableIndexes(false);
hot.rowIndexMapper.getRenderableIndexes(true);
hot.rowIndexMapper.getRenderableIndexesLength();
hot.rowIndexMapper.getNotHiddenIndexes();
hot.rowIndexMapper.getNotHiddenIndexes(false);
hot.rowIndexMapper.getNotHiddenIndexes(true);
hot.rowIndexMapper.getNotHiddenIndexesLength();
hot.rowIndexMapper.getIndexesSequence();
hot.rowIndexMapper.setIndexesSequence([0, 1, 2]);
hot.rowIndexMapper.getNotTrimmedIndexes();
hot.rowIndexMapper.getNotTrimmedIndexes(false);
hot.rowIndexMapper.getNotTrimmedIndexes(true);
hot.rowIndexMapper.getNotTrimmedIndexesLength();
hot.rowIndexMapper.getNumberOfIndexes();
hot.rowIndexMapper.moveIndexes(0, 1);
hot.rowIndexMapper.moveIndexes([0], 1);
hot.rowIndexMapper.isTrimmed(0);
hot.rowIndexMapper.isHidden(0);

hot.columnIndexMapper.executeBatchOperations(() => {});
hot.columnIndexMapper.getPhysicalFromVisualIndex(0);
hot.columnIndexMapper.getVisualFromPhysicalIndex(0);
hot.columnIndexMapper.getRenderableFromVisualIndex(0);
hot.columnIndexMapper.getVisualFromRenderableIndex(0);
hot.columnIndexMapper.getPhysicalFromRenderableIndex(0);
hot.columnIndexMapper.getFirstNotHiddenIndex(0, -1);
hot.columnIndexMapper.getFirstNotHiddenIndex(0, 1);
hot.columnIndexMapper.getRenderableIndexes();
hot.columnIndexMapper.getRenderableIndexes(false);
hot.columnIndexMapper.getRenderableIndexes(true);
hot.columnIndexMapper.getRenderableIndexesLength();
hot.columnIndexMapper.getNotHiddenIndexes();
hot.columnIndexMapper.getNotHiddenIndexes(false);
hot.columnIndexMapper.getNotHiddenIndexes(true);
hot.columnIndexMapper.getNotHiddenIndexesLength();
hot.columnIndexMapper.getIndexesSequence();
hot.columnIndexMapper.setIndexesSequence([0, 1, 2]);
hot.columnIndexMapper.getNotTrimmedIndexes();
hot.columnIndexMapper.getNotTrimmedIndexes(false);
hot.columnIndexMapper.getNotTrimmedIndexes(true);
hot.columnIndexMapper.getNotTrimmedIndexesLength();
hot.columnIndexMapper.getNumberOfIndexes();
hot.columnIndexMapper.moveIndexes(0, 1);
hot.columnIndexMapper.moveIndexes([0], 1);
hot.columnIndexMapper.isTrimmed(0);
hot.columnIndexMapper.isHidden(0);

const testToHTMLTableElement: HTMLTableElement = hot.toTableElement();
const testToHTML: string = hot.toHTML();

const autoColumnSize: Handsontable.plugins.AutoColumnSize = hot.getPlugin('autoColumnSize');
const autoRowSize: Handsontable.plugins.AutoRowSize = hot.getPlugin('autoRowSize');
const autofill: Handsontable.plugins.Autofill = hot.getPlugin('autofill');
const bindeRowsWithHeaders: Handsontable.plugins.BindRowsWithHeaders = hot.getPlugin('bindRowsWithHeaders');
const collapsibleColumns: Handsontable.plugins.CollapsibleColumns = hot.getPlugin('collapsibleColumns');
const columnSorting: Handsontable.plugins.ColumnSorting = hot.getPlugin('columnSorting');
const columnSummary: Handsontable.plugins.ColumnSummary = hot.getPlugin('columnSummary');
const comments: Handsontable.plugins.Comments = hot.getPlugin('comments');
const contextMenu: Handsontable.plugins.ContextMenu = hot.getPlugin('contextMenu');
const copyPaste: Handsontable.plugins.CopyPaste = hot.getPlugin('copyPaste');
const customBorders: Handsontable.plugins.CustomBorders = hot.getPlugin('customBorders');
const dragToScroll: Handsontable.plugins.DragToScroll = hot.getPlugin('dragToScroll');
const dropdownMenu: Handsontable.plugins.DropdownMenu = hot.getPlugin('dropdownMenu');
const exportFile: Handsontable.plugins.ExportFile = hot.getPlugin('exportFile');
const filters: Handsontable.plugins.Filters = hot.getPlugin('filters');
const headerTooltips: Handsontable.plugins.HeaderTooltips = hot.getPlugin('headerTooltips');
const hiddenColumns: Handsontable.plugins.HiddenColumns = hot.getPlugin('hiddenColumns');
const hiddenRows: Handsontable.plugins.HiddenRows = hot.getPlugin('hiddenRows');
const manualColumnFreeze: Handsontable.plugins.ManualColumnFreeze = hot.getPlugin('manualColumnFreeze');
const manualColumnMove: Handsontable.plugins.ManualColumnMove = hot.getPlugin('manualColumnMove');
const manualColumnResize: Handsontable.plugins.ManualColumnResize = hot.getPlugin('manualColumnResize');
const manualRowMove: Handsontable.plugins.ManualRowMove = hot.getPlugin('manualRowMove');
const manualRowResize: Handsontable.plugins.ManualRowResize = hot.getPlugin('manualRowResize');
const mergeCells: Handsontable.plugins.MergeCells = hot.getPlugin('mergeCells');
const multiColumnSorting: Handsontable.plugins.MultiColumnSorting = hot.getPlugin('multiColumnSorting');
const nestedHeaders: Handsontable.plugins.NestedHeaders = hot.getPlugin('nestedHeaders');
const observeChanges: Handsontable.plugins.ObserveChanges = hot.getPlugin('observeChanges');
const persistentState: Handsontable.plugins.PersistenState = hot.getPlugin('persistentState');
const search: Handsontable.plugins.Search = hot.getPlugin('search');
const trimeRows: Handsontable.plugins.TrimRows = hot.getPlugin('trimRows');
const formulas: Handsontable.plugins.Formulas = hot.getPlugin('formulas');
const nestedRows: Handsontable.plugins.NestedRows = hot.getPlugin('nestedRows');

autoColumnSize.samplesGenerator.setSampleCount(5);
