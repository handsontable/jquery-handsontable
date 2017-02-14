import Handsontable from './browser';
import {WalkontableCellCoords} from './3rdparty/walkontable/src/cell/coords';
import {KEY_CODES, isMetaKey, isCtrlKey} from './helpers/unicode';
import {stopPropagation, stopImmediatePropagation, isImmediatePropagationStopped} from './helpers/dom/event';
import {getEditor} from './editors';
import {eventManager as eventManagerObject} from './eventManager';

export {EditorManager};

// support for older versions of Handsontable
Handsontable.EditorManager = EditorManager;

function EditorManager(instance, priv, selection) {
  var _this = this,
    destroyed = false,
    eventManager,
    activeEditor;

  eventManager = eventManagerObject(instance);

  function moveSelectionAfterEnter(shiftKey) {
    var enterMoves = typeof priv.settings.enterMoves === 'function' ? priv.settings.enterMoves(event) : priv.settings.enterMoves;

    if (shiftKey) {
      // move selection up
      selection.transformStart(-enterMoves.row, -enterMoves.col);

    } else {
      // move selection down (add a new row if needed)
      selection.transformStart(enterMoves.row, enterMoves.col, true);
    }
  }

  function moveSelectionUp(shiftKey, ctrlKey) {
    if (ctrlKey) {
      var data = instance.getSourceData();
      var selected = instance.getSelected();
      var cellIsBlank = false;
      var selectionRowStart = selected[0];
      var selectionColumnStart = selected[1];
      var selectionRowEnd = selected[2];
      var selectionColumnEnd = selected[3];
      instance.selectCell(selectionRowEnd, selectionColumnEnd);
      var i = selectionRowStart;
      while (i > 0 && !cellIsBlank) {
        selection.transformStart(-1, 0);
        if (instance.getValue() === '' || instance.getValue() === null) {
          selection.transformStart(1, 0);
          cellIsBlank = true;
        }
        i--;
      }
      if (shiftKey) {
        selectNonBlankRange(instance, selection, selectionRowStart, instance.getSelected()[0], selectionColumnStart, instance.getSelected()[1]);
      }
    } else if (shiftKey) {
      selection.transformEnd(-1, 0);
    } else {
      selection.transformStart(-1, 0);
    }
  }

  function moveSelectionDown(shiftKey, ctrlKey) {
    if (ctrlKey) {
      var data = instance.getSourceData();
      var selected = instance.getSelected();
      var cellIsBlank = false;
      var selectionRowStart = selected[0];
      var selectionColumnStart = selected[1];
      var selectionRowEnd = selected[2];
      var selectionColumnEnd = selected[3];
      instance.selectCell(selectionRowEnd, selectionColumnEnd);
      var i = selectionRowEnd;
      while (i < data.length - 1 && !cellIsBlank) {
        selection.transformStart(1, 0);
        if (instance.getValue() === '' || instance.getValue() === null) {
          selection.transformStart(-1, 0);
          cellIsBlank = true;
        }
        i++;
      }
      if (shiftKey) {
        selectNonBlankRange(instance, selection, selectionRowStart, instance.getSelected()[0], selectionColumnStart, instance.getSelected()[1]);
      }
    } else if (shiftKey) {
      // expanding selection down with shift
      selection.transformEnd(1, 0);
    } else {
      // move selection down
      selection.transformStart(1, 0);
    }
  }

  function moveSelectionRight(shiftKey, ctrlKey) {
    if (ctrlKey) {
      var data = instance.getSourceData();
      var selected = instance.getSelected();
      var cellIsBlank = false;
      var selectionRowStart = selected[0];
      var selectionColumnStart = selected[1];
      var selectionRowEnd = selected[2];
      var selectionColumnEnd = selected[3];
      instance.selectCell(selectionRowEnd, selectionColumnEnd);
      var i = selectionColumnEnd;
      while (i < instance.countCols() - 1 && !cellIsBlank) {
        selection.transformStart(0, 1);
        if (instance.getValue() === '' || instance.getValue() === null) {
          selection.transformStart(0, -1);
          cellIsBlank = true;
        }
        i++;
      }
      if (shiftKey) {
        selectNonBlankRange(instance, selection, selectionRowStart, instance.getSelected()[0], selectionColumnStart, instance.getSelected()[1]);
      }
    } else if (shiftKey) {
      selection.transformEnd(0, 1);
    } else {
      selection.transformStart(0, 1);
    }
  }

  function moveSelectionLeft(shiftKey, ctrlKey) {
    if (ctrlKey) {
      var data = instance.getSourceData();
      var selected = instance.getSelected();
      var cellIsBlank = false;
      var selectionRowStart = selected[0];
      var selectionColumnStart = selected[1];
      var selectionRowEnd = selected[2];
      var selectionColumnEnd = selected[3];
      instance.selectCell(selectionRowEnd, selectionColumnEnd);
      var i = selectionColumnEnd;
      while (i > 0 && !cellIsBlank) {
        selection.transformStart(0, -1);
        if (instance.getValue() === '' || instance.getValue() === null) {
          selection.transformStart(0, 1);
          cellIsBlank = true;
        }
        i++;
      }
      if (shiftKey) {
        selectNonBlankRange(instance, selection, selectionRowStart, instance.getSelected()[0], selectionColumnStart, instance.getSelected()[1]);
      }
    } else if (shiftKey) {
      selection.transformEnd(0, -1);
    } else {
      selection.transformStart(0, -1);
    }
  }

  function selectNonBlankRange(instance, selection, startingRow, endingRow, startingColumn, endingColumn) {
    var totalRows = endingRow - startingRow;
    var totalColumns = endingColumn - startingColumn;
    instance.selectCell(startingRow, startingColumn);
    selection.transformEnd(totalRows, totalColumns);
  }

  function onKeyDown(event) {
    var ctrlDown, rangeModifier;

    if (!instance.isListening()) {
      return;
    }
    Handsontable.hooks.run(instance, 'beforeKeyDown', event);

    if (destroyed) {
      return;
    }
    if (isImmediatePropagationStopped(event)) {
      return;
    }
    priv.lastKeyCode = event.keyCode;

    if (!selection.isSelected()) {
      return;
    }
    // catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)
    ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey;

    if (activeEditor && !activeEditor.isWaiting()) {
      if (!isMetaKey(event.keyCode) && !isCtrlKey(event.keyCode) && !ctrlDown && !_this.isEditorOpened()) {
        _this.openEditor('', event);

        return;
      }
    }
    rangeModifier = event.shiftKey ? selection.setRangeEnd : selection.setRangeStart;

    switch (event.keyCode) {

      case KEY_CODES.A:
        if (!_this.isEditorOpened() && ctrlDown) {
          selection.selectAll();

          event.preventDefault();
          stopPropagation(event);
        }
        break;

      case KEY_CODES.ARROW_UP:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionUp(event.shiftKey, event.ctrlKey);

        event.preventDefault();
        stopPropagation(event);
        break;

      case KEY_CODES.ARROW_DOWN:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionDown(event.shiftKey, event.ctrlKey);

        event.preventDefault();
        stopPropagation(event);
        break;

      case KEY_CODES.ARROW_RIGHT:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionRight(event.shiftKey, event.ctrlKey);

        event.preventDefault();
        stopPropagation(event);
        break;

      case KEY_CODES.ARROW_LEFT:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionLeft(event.shiftKey, event.ctrlKey);

        event.preventDefault();
        stopPropagation(event);
        break;

      case KEY_CODES.TAB:
        var tabMoves = typeof priv.settings.tabMoves === 'function' ? priv.settings.tabMoves(event) : priv.settings.tabMoves;

        if (event.shiftKey) {
          // move selection left
          selection.transformStart(-tabMoves.row, -tabMoves.col);
        } else {
          // move selection right (add a new column if needed)
          selection.transformStart(tabMoves.row, tabMoves.col, true);
        }
        event.preventDefault();
        stopPropagation(event);
        break;

      case KEY_CODES.BACKSPACE:
      case KEY_CODES.DELETE:
        selection.empty(event);
        _this.prepareEditor();
        event.preventDefault();
        break;

      case KEY_CODES.F2:
        /* F2 */
        _this.openEditor(null, event);

        if (activeEditor) {
          activeEditor.enableFullEditMode();
        }
        event.preventDefault(); // prevent Opera from opening 'Go to Page dialog'
        break;

      case KEY_CODES.ENTER:
        /* return/enter */
        if (_this.isEditorOpened()) {

          if (activeEditor && activeEditor.state !== Handsontable.EditorState.WAITING) {
            _this.closeEditorAndSaveChanges(ctrlDown);
          }
          moveSelectionAfterEnter(event.shiftKey);

        } else {
          if (instance.getSettings().enterBeginsEditing) {
            _this.openEditor(null, event);

            if (activeEditor) {
              activeEditor.enableFullEditMode();
            }
          } else {
            moveSelectionAfterEnter(event.shiftKey);
          }
        }
        event.preventDefault(); // don't add newline to field
        stopImmediatePropagation(event); // required by HandsontableEditor
        break;

      case KEY_CODES.ESCAPE:
        if (_this.isEditorOpened()) {
          _this.closeEditorAndRestoreOriginalValue(ctrlDown);
        }
        event.preventDefault();
        break;

      case KEY_CODES.HOME:
        if (event.ctrlKey || event.metaKey) {
          rangeModifier(new WalkontableCellCoords(0, priv.selRange.from.col));
        } else {
          rangeModifier(new WalkontableCellCoords(priv.selRange.from.row, 0));
        }
        event.preventDefault(); // don't scroll the window
        stopPropagation(event);
        break;

      case KEY_CODES.END:
        if (event.ctrlKey || event.metaKey) {
          rangeModifier(new WalkontableCellCoords(instance.countRows() - 1, priv.selRange.from.col));
        } else {
          rangeModifier(new WalkontableCellCoords(priv.selRange.from.row, instance.countCols() - 1));
        }
        event.preventDefault(); // don't scroll the window
        stopPropagation(event);
        break;

      case KEY_CODES.PAGE_UP:
        selection.transformStart(-instance.countVisibleRows(), 0);
        event.preventDefault(); // don't page up the window
        stopPropagation(event);
        break;

      case KEY_CODES.PAGE_DOWN:
        selection.transformStart(instance.countVisibleRows(), 0);
        event.preventDefault(); // don't page down the window
        stopPropagation(event);
        break;
    }
  }

  function init() {
    instance.addHook('afterDocumentKeyDown', onKeyDown);

    eventManager.addEventListener(document.documentElement, 'keydown', function(event) {
      if (!destroyed) {
        instance.runHooks('afterDocumentKeyDown', event);
      }
    });

    function onDblClick(event, coords, elem) {
      // may be TD or TH
      if (elem.nodeName == 'TD') {
        _this.openEditor();

        if (activeEditor) {
          activeEditor.enableFullEditMode();
        }
      }
    }
    instance.view.wt.update('onCellDblClick', onDblClick);

    instance.addHook('afterDestroy', function() {
      destroyed = true;
    });
  }

  /**
   * Destroy current editor, if exists.
   *
   * @function destroyEditor
   * @memberof! Handsontable.EditorManager#
   * @param {Boolean} revertOriginal
   */
  this.destroyEditor = function(revertOriginal) {
    this.closeEditor(revertOriginal);
  };

  /**
   * Get active editor.
   *
   * @function getActiveEditor
   * @memberof! Handsontable.EditorManager#
   * @returns {*}
   */
  this.getActiveEditor = function() {
    return activeEditor;
  };

  /**
   * Prepare text input to be displayed at given grid cell.
   *
   * @function prepareEditor
   * @memberof! Handsontable.EditorManager#
   */
  this.prepareEditor = function() {
    var row, col, prop, td, originalValue, cellProperties, editorClass;

    if (activeEditor && activeEditor.isWaiting()) {
      this.closeEditor(false, false, function(dataSaved) {
        if (dataSaved) {
          _this.prepareEditor();
        }
      });

      return;
    }
    row = priv.selRange.highlight.row;
    col = priv.selRange.highlight.col;
    prop = instance.colToProp(col);
    td = instance.getCell(row, col);

    originalValue = instance.getSourceDataAtCell(instance.runHooks('modifyRow', row), col);
    cellProperties = instance.getCellMeta(row, col);
    editorClass = instance.getCellEditor(cellProperties);

    if (editorClass) {
      activeEditor = Handsontable.editors.getEditor(editorClass, instance);
      activeEditor.prepare(row, col, prop, td, originalValue, cellProperties);

    } else {
      activeEditor = void 0;
    }
  };

  /**
   * Check is editor is opened/showed.
   *
   * @function isEditorOpened
   * @memberof! Handsontable.EditorManager#
   * @returns {Boolean}
   */
  this.isEditorOpened = function() {
    return activeEditor && activeEditor.isOpened();
  };

  /**
   * Open editor with initial value.
   *
   * @function openEditor
   * @memberof! Handsontable.EditorManager#
   * @param {String} initialValue
   * @param {DOMEvent} event
   */
  this.openEditor = function(initialValue, event) {
    if (activeEditor && !activeEditor.cellProperties.readOnly) {
      activeEditor.beginEditing(initialValue, event);
    } else if (activeEditor && activeEditor.cellProperties.readOnly) {

      // move the selection after opening the editor with ENTER key
      if (event && event.keyCode === KEY_CODES.ENTER) {
        moveSelectionAfterEnter();
      }
    }
  };

  /**
   * Close editor, finish editing cell.
   *
   * @function closeEditor
   * @memberof! Handsontable.EditorManager#
   * @param {Boolean} restoreOriginalValue
   * @param {Boolean} [ctrlDown]
   * @param {Function} [callback]
   */
  this.closeEditor = function(restoreOriginalValue, ctrlDown, callback) {
    if (activeEditor) {
      activeEditor.finishEditing(restoreOriginalValue, ctrlDown, callback);
    } else {
      if (callback) {
        callback(false);
      }
    }
  };

  /**
   * Close editor and save changes.
   *
   * @function closeEditorAndSaveChanges
   * @memberof! Handsontable.EditorManager#
   * @param {Boolean} ctrlDown
   */
  this.closeEditorAndSaveChanges = function(ctrlDown) {
    return this.closeEditor(false, ctrlDown);
  };

  /**
   * Close editor and restore original value.
   *
   * @function closeEditorAndRestoreOriginalValue
   * @memberof! Handsontable.EditorManager#
   * @param {Boolean} ctrlDown
   */
  this.closeEditorAndRestoreOriginalValue = function(ctrlDown) {
    return this.closeEditor(true, ctrlDown);
  };

  init();
}
