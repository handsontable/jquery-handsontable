/*!
 * Handsontable 0.19.0
 * Handsontable is a JavaScript library for editable tables with basic copy-paste compatibility with Excel and Google Docs
 *
 * Copyright (c) 2012-2014 Marcin Warpechowski
 * Copyright 2015 Handsoncode sp. z o.o. <hello@handsontable.com>
 * Licensed under the MIT license.
 * http://handsontable.com/
 *
 * Date: Fri Nov 27 2015 21:41:20 GMT+0800 (CST)
 */
/*jslint white: true, browser: true, plusplus: true, indent: 4, maxerr: 50 */

window.Handsontable = {
  version: '0.19.0',
  buildDate: 'Fri Nov 27 2015 21:41:20 GMT+0800 (CST)',
};
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Handsontable = f()}})(function(){var define,module,exports;return (function init(modules, cache, entry) {
  (function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;
    var globalNS = JSON.parse('{"zeroclipboard":"ZeroClipboard"}') || {};

    function newRequire(name, jumped){
      if(!cache[name]) {

        if(!modules[name]) {
          // if we cannot find the the module within our internal map or
          // cache jump to the current global require ie. the last bundle
          // that was added to the page.
          var currentRequire = typeof require == "function" && require;
          if (!jumped && currentRequire) return currentRequire(name, true);

          // If there are other bundles on this page the require from the
          // previous one is saved to 'previousRequire'. Repeat this as
          // many times as there are bundles until the module is found or
          // we exhaust the require chain.
          if (previousRequire) return previousRequire(name, true);

          // Try find module from global scope
          if (globalNS[name] && typeof window[globalNS[name]] !== 'undefined') {
            return window[globalNS[name]];
          }

          var err = new Error('Cannot find module \'' + name + '\'');
          err.code = 'MODULE_NOT_FOUND';
          throw err;
        }
        var m = cache[name] = {exports:{}};
        modules[name][0].call(m.exports, function(x){
          var id = modules[name][1][x];
          return newRequire(id ? id : x);
        },m,m.exports,outer,modules,cache,entry);
      }

      return cache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
  })(modules, cache, entry);

  return function() {
    return Handsontable;
  };
})
({1:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableBorder: {get: function() {
      return WalkontableBorder;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47__46__46__47_eventManager__,
    $__cell_47_coords__,
    $__overlay_47__95_base_46_js__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getComputedStyle = $__0.getComputedStyle,
    getTrimmingContainer = $__0.getTrimmingContainer,
    innerWidth = $__0.innerWidth,
    innerHeight = $__0.innerHeight,
    offset = $__0.offset,
    outerHeight = $__0.outerHeight,
    outerWidth = $__0.outerWidth;
var stopImmediatePropagation = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__}).stopImmediatePropagation;
var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager__}).EventManager;
var WalkontableCellCoords = ($__cell_47_coords__ = require("cell/coords"), $__cell_47_coords__ && $__cell_47_coords__.__esModule && $__cell_47_coords__ || {default: $__cell_47_coords__}).WalkontableCellCoords;
var WalkontableOverlay = ($__overlay_47__95_base_46_js__ = require("overlay/_base.js"), $__overlay_47__95_base_46_js__ && $__overlay_47__95_base_46_js__.__esModule && $__overlay_47__95_base_46_js__ || {default: $__overlay_47__95_base_46_js__}).WalkontableOverlay;
var WalkontableBorder = function WalkontableBorder(wotInstance, settings) {
  if (!settings) {
    return;
  }
  this.eventManager = new EventManager(wotInstance);
  this.instance = wotInstance;
  this.wot = wotInstance;
  this.settings = settings;
  this.mouseDown = false;
  this.main = null;
  this.top = null;
  this.left = null;
  this.bottom = null;
  this.right = null;
  this.topStyle = null;
  this.leftStyle = null;
  this.bottomStyle = null;
  this.rightStyle = null;
  this.cornerDefaultStyle = {
    width: '5px',
    height: '5px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#FFF'
  };
  this.corner = null;
  this.cornerStyle = null;
  this.createBorders(settings);
  this.registerListeners();
};
($traceurRuntime.createClass)(WalkontableBorder, {
  registerListeners: function() {
    var $__5 = this;
    this.eventManager.addEventListener(document.body, 'mousedown', (function() {
      return $__5.onMouseDown();
    }));
    this.eventManager.addEventListener(document.body, 'mouseup', (function() {
      return $__5.onMouseUp();
    }));
    for (var c = 0,
        len = this.main.childNodes.length; c < len; c++) {
      this.eventManager.addEventListener(this.main.childNodes[c], 'mouseenter', (function(event) {
        return $__5.onMouseEnter(event);
      }));
    }
  },
  onMouseDown: function() {
    this.mouseDown = true;
  },
  onMouseUp: function() {
    this.mouseDown = false;
  },
  onMouseEnter: function(event) {
    if (!this.mouseDown || !this.wot.getSetting('hideBorderOnMouseDownOver')) {
      return;
    }
    event.preventDefault();
    stopImmediatePropagation(event);
    var _this = this;
    var bounds = this.getBoundingClientRect();
    this.style.display = 'none';
    function isOutside(event) {
      if (event.clientY < Math.floor(bounds.top)) {
        return true;
      }
      if (event.clientY > Math.ceil(bounds.top + bounds.height)) {
        return true;
      }
      if (event.clientX < Math.floor(bounds.left)) {
        return true;
      }
      if (event.clientX > Math.ceil(bounds.left + bounds.width)) {
        return true;
      }
    }
    function handler(event) {
      if (isOutside(event)) {
        _this.eventManager.removeEventListener(document.body, 'mousemove', handler);
        _this.style.display = 'block';
      }
    }
    this.eventManager.addEventListener(document.body, 'mousemove', handler);
  },
  createBorders: function(settings) {
    this.main = document.createElement('div');
    var borderDivs = ['top', 'left', 'bottom', 'right', 'corner'];
    var style = this.main.style;
    var _customBorderStyle = settings.customBorderStyle;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    for (var i = 0; i < 5; i++) {
      var position = borderDivs[i];
      var div = document.createElement('div');
      div.className = 'wtBorder ' + (this.settings.className || '');
      if (this.settings[position] && this.settings[position].hide) {
        div.className += ' hidden';
      }
      style = div.style;
      style.height = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
      style.width = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
      if (_customBorderStyle) {
        style.borderStyle = _customBorderStyle.style;
        style.borderColor = _customBorderStyle.color;
        if (['top', 'bottom'].indexOf(position) >= 0) {
          style.height = 0;
          style.borderTopWidth = _customBorderStyle.width + 'px';
        } else if (['left', 'right'].indexOf(position) >= 0) {
          style.width = 0;
          style.borderLeftWidth = _customBorderStyle.width + 'px';
        }
      } else {
        style.backgroundColor = (this.settings[position] && this.settings[position].color) ? this.settings[position].color : settings.border.color;
      }
      this.main.appendChild(div);
    }
    this.top = this.main.childNodes[0];
    this.left = this.main.childNodes[1];
    this.bottom = this.main.childNodes[2];
    this.right = this.main.childNodes[3];
    this.topStyle = this.top.style;
    this.leftStyle = this.left.style;
    this.bottomStyle = this.bottom.style;
    this.rightStyle = this.right.style;
    this.corner = this.main.childNodes[4];
    this.corner.className += ' corner';
    this.cornerStyle = this.corner.style;
    this.cornerStyle.width = this.cornerDefaultStyle.width;
    this.cornerStyle.height = this.cornerDefaultStyle.height;
    this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(' ');
    if (Handsontable.mobileBrowser) {
      this.createMultipleSelectorHandles();
    }
    this.disappear();
    if (!this.wot.wtTable.bordersHolder) {
      this.wot.wtTable.bordersHolder = document.createElement('div');
      this.wot.wtTable.bordersHolder.className = 'htBorders';
      this.wot.wtTable.spreader.appendChild(this.wot.wtTable.bordersHolder);
    }
    this.wot.wtTable.bordersHolder.insertBefore(this.main, this.wot.wtTable.bordersHolder.firstChild);
  },
  createMultipleSelectorHandles: function() {
    this.selectionHandles = {
      topLeft: document.createElement('DIV'),
      topLeftHitArea: document.createElement('DIV'),
      bottomRight: document.createElement('DIV'),
      bottomRightHitArea: document.createElement('DIV')
    };
    var width = 10;
    var hitAreaWidth = 40;
    this.selectionHandles.topLeft.className = 'topLeftSelectionHandle';
    this.selectionHandles.topLeftHitArea.className = 'topLeftSelectionHandle-HitArea';
    this.selectionHandles.bottomRight.className = 'bottomRightSelectionHandle';
    this.selectionHandles.bottomRightHitArea.className = 'bottomRightSelectionHandle-HitArea';
    this.selectionHandles.styles = {
      topLeft: this.selectionHandles.topLeft.style,
      topLeftHitArea: this.selectionHandles.topLeftHitArea.style,
      bottomRight: this.selectionHandles.bottomRight.style,
      bottomRightHitArea: this.selectionHandles.bottomRightHitArea.style
    };
    var hitAreaStyle = {
      position: 'absolute',
      height: hitAreaWidth + 'px',
      width: hitAreaWidth + 'px',
      'border-radius': parseInt(hitAreaWidth / 1.5, 10) + 'px'
    };
    for (var prop in hitAreaStyle) {
      if (hitAreaStyle.hasOwnProperty(prop)) {
        this.selectionHandles.styles.bottomRightHitArea[prop] = hitAreaStyle[prop];
        this.selectionHandles.styles.topLeftHitArea[prop] = hitAreaStyle[prop];
      }
    }
    var handleStyle = {
      position: 'absolute',
      height: width + 'px',
      width: width + 'px',
      'border-radius': parseInt(width / 1.5, 10) + 'px',
      background: '#F5F5FF',
      border: '1px solid #4285c8'
    };
    for (var prop$__7 in handleStyle) {
      if (handleStyle.hasOwnProperty(prop$__7)) {
        this.selectionHandles.styles.bottomRight[prop$__7] = handleStyle[prop$__7];
        this.selectionHandles.styles.topLeft[prop$__7] = handleStyle[prop$__7];
      }
    }
    this.main.appendChild(this.selectionHandles.topLeft);
    this.main.appendChild(this.selectionHandles.bottomRight);
    this.main.appendChild(this.selectionHandles.topLeftHitArea);
    this.main.appendChild(this.selectionHandles.bottomRightHitArea);
  },
  isPartRange: function(row, col) {
    if (this.wot.selections.area.cellRange) {
      if (row != this.wot.selections.area.cellRange.to.row || col != this.wot.selections.area.cellRange.to.col) {
        return true;
      }
    }
    return false;
  },
  updateMultipleSelectionHandlesPosition: function(row, col, top, left, width, height) {
    var handleWidth = parseInt(this.selectionHandles.styles.topLeft.width, 10);
    var hitAreaWidth = parseInt(this.selectionHandles.styles.topLeftHitArea.width, 10);
    this.selectionHandles.styles.topLeft.top = parseInt(top - handleWidth, 10) + 'px';
    this.selectionHandles.styles.topLeft.left = parseInt(left - handleWidth, 10) + 'px';
    this.selectionHandles.styles.topLeftHitArea.top = parseInt(top - (hitAreaWidth / 4) * 3, 10) + 'px';
    this.selectionHandles.styles.topLeftHitArea.left = parseInt(left - (hitAreaWidth / 4) * 3, 10) + 'px';
    this.selectionHandles.styles.bottomRight.top = parseInt(top + height, 10) + 'px';
    this.selectionHandles.styles.bottomRight.left = parseInt(left + width, 10) + 'px';
    this.selectionHandles.styles.bottomRightHitArea.top = parseInt(top + height - hitAreaWidth / 4, 10) + 'px';
    this.selectionHandles.styles.bottomRightHitArea.left = parseInt(left + width - hitAreaWidth / 4, 10) + 'px';
    if (this.settings.border.multipleSelectionHandlesVisible && this.settings.border.multipleSelectionHandlesVisible()) {
      this.selectionHandles.styles.topLeft.display = 'block';
      this.selectionHandles.styles.topLeftHitArea.display = 'block';
      if (this.isPartRange(row, col)) {
        this.selectionHandles.styles.bottomRight.display = 'none';
        this.selectionHandles.styles.bottomRightHitArea.display = 'none';
      } else {
        this.selectionHandles.styles.bottomRight.display = 'block';
        this.selectionHandles.styles.bottomRightHitArea.display = 'block';
      }
    } else {
      this.selectionHandles.styles.topLeft.display = 'none';
      this.selectionHandles.styles.bottomRight.display = 'none';
      this.selectionHandles.styles.topLeftHitArea.display = 'none';
      this.selectionHandles.styles.bottomRightHitArea.display = 'none';
    }
    if (row == this.wot.wtSettings.getSetting('fixedRowsTop') || col == this.wot.wtSettings.getSetting('fixedColumnsLeft')) {
      this.selectionHandles.styles.topLeft.zIndex = '9999';
      this.selectionHandles.styles.topLeftHitArea.zIndex = '9999';
    } else {
      this.selectionHandles.styles.topLeft.zIndex = '';
      this.selectionHandles.styles.topLeftHitArea.zIndex = '';
    }
  },
  appear: function(corners) {
    if (this.disabled) {
      return;
    }
    var isMultiple,
        fromTD,
        toTD,
        fromOffset,
        toOffset,
        containerOffset,
        top,
        minTop,
        left,
        minLeft,
        height,
        width,
        fromRow,
        fromColumn,
        toRow,
        toColumn,
        trimmingContainer,
        cornerOverlappingContainer,
        ilen;
    if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER)) {
      ilen = this.wot.getSetting('fixedRowsTop');
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
      ilen = this.wot.getSetting('fixedRowsBottom');
    } else {
      ilen = this.wot.wtTable.getRenderedRowsCount();
    }
    for (var i = 0; i < ilen; i++) {
      var s = this.wot.wtTable.rowFilter.renderedToSource(i);
      if (s >= corners[0] && s <= corners[2]) {
        fromRow = s;
        break;
      }
    }
    for (var i$__8 = ilen - 1; i$__8 >= 0; i$__8--) {
      var s$__9 = this.wot.wtTable.rowFilter.renderedToSource(i$__8);
      if (s$__9 >= corners[0] && s$__9 <= corners[2]) {
        toRow = s$__9;
        break;
      }
    }
    ilen = this.wot.wtTable.getRenderedColumnsCount();
    for (var i$__10 = 0; i$__10 < ilen; i$__10++) {
      var s$__11 = this.wot.wtTable.columnFilter.renderedToSource(i$__10);
      if (s$__11 >= corners[1] && s$__11 <= corners[3]) {
        fromColumn = s$__11;
        break;
      }
    }
    for (var i$__12 = ilen - 1; i$__12 >= 0; i$__12--) {
      var s$__13 = this.wot.wtTable.columnFilter.renderedToSource(i$__12);
      if (s$__13 >= corners[1] && s$__13 <= corners[3]) {
        toColumn = s$__13;
        break;
      }
    }
    if (fromRow === void 0 || fromColumn === void 0) {
      this.disappear();
      return;
    }
    isMultiple = (fromRow !== toRow || fromColumn !== toColumn);
    fromTD = this.wot.wtTable.getCell(new WalkontableCellCoords(fromRow, fromColumn));
    toTD = isMultiple ? this.wot.wtTable.getCell(new WalkontableCellCoords(toRow, toColumn)) : fromTD;
    fromOffset = offset(fromTD);
    toOffset = isMultiple ? offset(toTD) : fromOffset;
    containerOffset = offset(this.wot.wtTable.TABLE);
    minTop = fromOffset.top;
    height = toOffset.top + outerHeight(toTD) - minTop;
    minLeft = fromOffset.left;
    width = toOffset.left + outerWidth(toTD) - minLeft;
    top = minTop - containerOffset.top - 1;
    left = minLeft - containerOffset.left - 1;
    var style = getComputedStyle(fromTD);
    if (parseInt(style.borderTopWidth, 10) > 0) {
      top += 1;
      height = height > 0 ? height - 1 : 0;
    }
    if (parseInt(style.borderLeftWidth, 10) > 0) {
      left += 1;
      width = width > 0 ? width - 1 : 0;
    }
    this.topStyle.top = top + 'px';
    this.topStyle.left = left + 'px';
    this.topStyle.width = width + 'px';
    this.topStyle.display = 'block';
    this.leftStyle.top = top + 'px';
    this.leftStyle.left = left + 'px';
    this.leftStyle.height = height + 'px';
    this.leftStyle.display = 'block';
    var delta = Math.floor(this.settings.border.width / 2);
    this.bottomStyle.top = top + height - delta + 'px';
    this.bottomStyle.left = left + 'px';
    this.bottomStyle.width = width + 'px';
    this.bottomStyle.display = 'block';
    this.rightStyle.top = top + 'px';
    this.rightStyle.left = left + width - delta + 'px';
    this.rightStyle.height = height + 2 + 'px';
    this.rightStyle.display = 'block';
    if (Handsontable.mobileBrowser || (!this.hasSetting(this.settings.border.cornerVisible) || this.isPartRange(toRow, toColumn))) {
      this.cornerStyle.display = 'none';
    } else {
      this.cornerStyle.top = top + height - 4 + 'px';
      this.cornerStyle.left = left + width - 4 + 'px';
      this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth;
      this.cornerStyle.width = this.cornerDefaultStyle.width;
      this.cornerStyle.display = 'block';
      trimmingContainer = getTrimmingContainer(this.wot.wtTable.TABLE);
      if (toColumn === this.wot.getSetting('totalColumns') - 1) {
        cornerOverlappingContainer = toTD.offsetLeft + outerWidth(toTD) >= innerWidth(trimmingContainer);
        if (cornerOverlappingContainer) {
          this.cornerStyle.left = Math.floor(left + width - 3 - parseInt(this.cornerDefaultStyle.width) / 2) + 'px';
          this.cornerStyle.borderRightWidth = 0;
        }
      }
      if (toRow === this.wot.getSetting('totalRows') - 1) {
        cornerOverlappingContainer = toTD.offsetTop + outerHeight(toTD) >= innerHeight(trimmingContainer);
        if (cornerOverlappingContainer) {
          this.cornerStyle.top = Math.floor(top + height - 3 - parseInt(this.cornerDefaultStyle.height) / 2) + 'px';
          this.cornerStyle.borderBottomWidth = 0;
        }
      }
    }
    if (Handsontable.mobileBrowser) {
      this.updateMultipleSelectionHandlesPosition(fromRow, fromColumn, top, left, width, height);
    }
  },
  disappear: function() {
    this.topStyle.display = 'none';
    this.leftStyle.display = 'none';
    this.bottomStyle.display = 'none';
    this.rightStyle.display = 'none';
    this.cornerStyle.display = 'none';
    if (Handsontable.mobileBrowser) {
      this.selectionHandles.styles.topLeft.display = 'none';
      this.selectionHandles.styles.bottomRight.display = 'none';
    }
  },
  hasSetting: function(setting) {
    if (typeof setting === 'function') {
      return setting();
    }
    return !!setting;
  }
}, {});
;
window.WalkontableBorder = WalkontableBorder;

//# 
},{"cell/coords":4,"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"overlay/_base.js":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableViewportColumnsCalculator: {get: function() {
      return WalkontableViewportColumnsCalculator;
    }},
  __esModule: {value: true}
});
var privatePool = new WeakMap();
var WalkontableViewportColumnsCalculator = function WalkontableViewportColumnsCalculator(viewportWidth, scrollOffset, totalColumns, columnWidthFn, overrideFn, onlyFullyVisible, stretchH) {
  privatePool.set(this, {
    viewportWidth: viewportWidth,
    scrollOffset: scrollOffset,
    totalColumns: totalColumns,
    columnWidthFn: columnWidthFn,
    overrideFn: overrideFn,
    onlyFullyVisible: onlyFullyVisible
  });
  this.count = 0;
  this.startColumn = null;
  this.endColumn = null;
  this.startPosition = null;
  this.stretchAllRatio = 0;
  this.stretchLastWidth = 0;
  this.stretch = stretchH;
  this.totalTargetWidth = 0;
  this.needVerifyLastColumnWidth = true;
  this.stretchAllColumnsWidth = [];
  this.calculate();
};
var $WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;
($traceurRuntime.createClass)(WalkontableViewportColumnsCalculator, {
  calculate: function() {
    var sum = 0;
    var needReverse = true;
    var startPositions = [];
    var columnWidth;
    var priv = privatePool.get(this);
    var onlyFullyVisible = priv.onlyFullyVisible;
    var overrideFn = priv.overrideFn;
    var scrollOffset = priv.scrollOffset;
    var totalColumns = priv.totalColumns;
    var viewportWidth = priv.viewportWidth;
    for (var i = 0; i < totalColumns; i++) {
      columnWidth = this._getColumnWidth(i);
      if (sum <= scrollOffset && !onlyFullyVisible) {
        this.startColumn = i;
      }
      if (sum >= scrollOffset && sum + columnWidth <= scrollOffset + viewportWidth) {
        if (this.startColumn == null) {
          this.startColumn = i;
        }
        this.endColumn = i;
      }
      startPositions.push(sum);
      sum += columnWidth;
      if (!onlyFullyVisible) {
        this.endColumn = i;
      }
      if (sum >= scrollOffset + viewportWidth) {
        needReverse = false;
        break;
      }
    }
    if (this.endColumn === totalColumns - 1 && needReverse) {
      this.startColumn = this.endColumn;
      while (this.startColumn > 0) {
        var viewportSum = startPositions[this.endColumn] + columnWidth - startPositions[this.startColumn - 1];
        if (viewportSum <= viewportWidth || !onlyFullyVisible) {
          this.startColumn--;
        }
        if (viewportSum > viewportWidth) {
          break;
        }
      }
    }
    if (this.startColumn !== null && overrideFn) {
      overrideFn(this);
    }
    this.startPosition = startPositions[this.startColumn];
    if (this.startPosition == void 0) {
      this.startPosition = null;
    }
    if (this.startColumn !== null) {
      this.count = this.endColumn - this.startColumn + 1;
    }
  },
  refreshStretching: function(totalWidth) {
    if (this.stretch === 'none') {
      return;
    }
    var sumAll = 0;
    var columnWidth;
    var remainingSize;
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    for (var i = 0; i < totalColumns; i++) {
      columnWidth = this._getColumnWidth(i);
      sumAll += columnWidth;
    }
    this.totalTargetWidth = totalWidth;
    remainingSize = sumAll - totalWidth;
    if (this.stretch === 'all' && remainingSize < 0) {
      this.stretchAllRatio = totalWidth / sumAll;
      this.stretchAllColumnsWidth = [];
      this.needVerifyLastColumnWidth = true;
    } else if (this.stretch === 'last' && totalWidth !== Infinity) {
      this.stretchLastWidth = -remainingSize + this._getColumnWidth(totalColumns - 1);
    }
  },
  getStretchedColumnWidth: function(column, baseWidth) {
    var result = null;
    if (this.stretch === 'all' && this.stretchAllRatio !== 0) {
      result = this._getStretchedAllColumnWidth(column, baseWidth);
    } else if (this.stretch === 'last' && this.stretchLastWidth !== 0) {
      result = this._getStretchedLastColumnWidth(column);
    }
    return result;
  },
  _getStretchedAllColumnWidth: function(column, baseWidth) {
    var sumRatioWidth = 0;
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    if (!this.stretchAllColumnsWidth[column]) {
      this.stretchAllColumnsWidth[column] = Math.round(baseWidth * this.stretchAllRatio);
    }
    if (this.stretchAllColumnsWidth.length === totalColumns && this.needVerifyLastColumnWidth) {
      this.needVerifyLastColumnWidth = false;
      for (var i = 0; i < this.stretchAllColumnsWidth.length; i++) {
        sumRatioWidth += this.stretchAllColumnsWidth[i];
      }
      if (sumRatioWidth !== this.totalTargetWidth) {
        this.stretchAllColumnsWidth[this.stretchAllColumnsWidth.length - 1] += this.totalTargetWidth - sumRatioWidth;
      }
    }
    return this.stretchAllColumnsWidth[column];
  },
  _getStretchedLastColumnWidth: function(column) {
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    if (column === totalColumns - 1) {
      return this.stretchLastWidth;
    }
    return null;
  },
  _getColumnWidth: function(column) {
    var width = privatePool.get(this).columnWidthFn(column);
    if (width === undefined) {
      width = $WalkontableViewportColumnsCalculator.DEFAULT_WIDTH;
    }
    return width;
  }
}, {get DEFAULT_WIDTH() {
    return 50;
  }});
;
window.WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;

//# 
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableViewportRowsCalculator: {get: function() {
      return WalkontableViewportRowsCalculator;
    }},
  __esModule: {value: true}
});
var privatePool = new WeakMap();
var WalkontableViewportRowsCalculator = function WalkontableViewportRowsCalculator(viewportHeight, scrollOffset, totalRows, rowHeightFn, overrideFn, onlyFullyVisible, horizontalScrollbarHeight) {
  privatePool.set(this, {
    viewportHeight: viewportHeight,
    scrollOffset: scrollOffset,
    totalRows: totalRows,
    rowHeightFn: rowHeightFn,
    overrideFn: overrideFn,
    onlyFullyVisible: onlyFullyVisible,
    horizontalScrollbarHeight: horizontalScrollbarHeight
  });
  this.count = 0;
  this.startRow = null;
  this.endRow = null;
  this.startPosition = null;
  this.calculate();
};
var $WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;
($traceurRuntime.createClass)(WalkontableViewportRowsCalculator, {calculate: function() {
    var sum = 0;
    var needReverse = true;
    var startPositions = [];
    var priv = privatePool.get(this);
    var onlyFullyVisible = priv.onlyFullyVisible;
    var overrideFn = priv.overrideFn;
    var rowHeightFn = priv.rowHeightFn;
    var scrollOffset = priv.scrollOffset;
    var totalRows = priv.totalRows;
    var viewportHeight = priv.viewportHeight;
    var horizontalScrollbarHeight = priv.horizontalScrollbarHeight || 0;
    for (var i = 0; i < totalRows; i++) {
      var rowHeight = rowHeightFn(i);
      if (rowHeight === undefined) {
        rowHeight = $WalkontableViewportRowsCalculator.DEFAULT_HEIGHT;
      }
      if (sum <= scrollOffset && !onlyFullyVisible) {
        this.startRow = i;
      }
      if (sum >= scrollOffset && sum + rowHeight <= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
        if (this.startRow === null) {
          this.startRow = i;
        }
        this.endRow = i;
      }
      startPositions.push(sum);
      sum += rowHeight;
      if (!onlyFullyVisible) {
        this.endRow = i;
      }
      if (sum >= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
        needReverse = false;
        break;
      }
    }
    if (this.endRow === totalRows - 1 && needReverse) {
      this.startRow = this.endRow;
      while (this.startRow > 0) {
        var viewportSum = startPositions[this.endRow] + rowHeight - startPositions[this.startRow - 1];
        if (viewportSum <= viewportHeight - horizontalScrollbarHeight || !onlyFullyVisible) {
          this.startRow--;
        }
        if (viewportSum >= viewportHeight - horizontalScrollbarHeight) {
          break;
        }
      }
    }
    if (this.startRow !== null && overrideFn) {
      overrideFn(this);
    }
    this.startPosition = startPositions[this.startRow];
    if (this.startPosition == void 0) {
      this.startPosition = null;
    }
    if (this.startRow !== null) {
      this.count = this.endRow - this.startRow + 1;
    }
  }}, {get DEFAULT_HEIGHT() {
    return 23;
  }});
;
window.WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;

//# 
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableCellCoords: {get: function() {
      return WalkontableCellCoords;
    }},
  __esModule: {value: true}
});
var WalkontableCellCoords = function WalkontableCellCoords(row, col) {
  if (typeof row !== 'undefined' && typeof col !== 'undefined') {
    this.row = row;
    this.col = col;
  } else {
    this.row = null;
    this.col = null;
  }
};
($traceurRuntime.createClass)(WalkontableCellCoords, {
  isValid: function(wotInstance) {
    if (this.row < 0 || this.col < 0) {
      return false;
    }
    if (this.row >= wotInstance.getSetting('totalRows') || this.col >= wotInstance.getSetting('totalColumns')) {
      return false;
    }
    return true;
  },
  isEqual: function(cellCoords) {
    if (cellCoords === this) {
      return true;
    }
    return this.row === cellCoords.row && this.col === cellCoords.col;
  },
  isSouthEastOf: function(testedCoords) {
    return this.row >= testedCoords.row && this.col >= testedCoords.col;
  },
  isNorthWestOf: function(testedCoords) {
    return this.row <= testedCoords.row && this.col <= testedCoords.col;
  },
  isSouthWestOf: function(testedCoords) {
    return this.row >= testedCoords.row && this.col <= testedCoords.col;
  },
  isNorthEastOf: function(testedCoords) {
    return this.row <= testedCoords.row && this.col >= testedCoords.col;
  }
}, {});
;
window.WalkontableCellCoords = WalkontableCellCoords;

//# 
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableCellRange: {get: function() {
      return WalkontableCellRange;
    }},
  __esModule: {value: true}
});
var $___46__46__47_cell_47_coords__;
var WalkontableCellCoords = ($___46__46__47_cell_47_coords__ = require("cell/coords"), $___46__46__47_cell_47_coords__ && $___46__46__47_cell_47_coords__.__esModule && $___46__46__47_cell_47_coords__ || {default: $___46__46__47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = function WalkontableCellRange(highlight, from, to) {
  this.highlight = highlight;
  this.from = from;
  this.to = to;
};
var $WalkontableCellRange = WalkontableCellRange;
($traceurRuntime.createClass)(WalkontableCellRange, {
  isValid: function(wotInstance) {
    return this.from.isValid(wotInstance) && this.to.isValid(wotInstance);
  },
  isSingle: function() {
    return this.from.row === this.to.row && this.from.col === this.to.col;
  },
  getHeight: function() {
    return Math.max(this.from.row, this.to.row) - Math.min(this.from.row, this.to.row) + 1;
  },
  getWidth: function() {
    return Math.max(this.from.col, this.to.col) - Math.min(this.from.col, this.to.col) + 1;
  },
  includes: function(cellCoords) {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    if (cellCoords.row < 0) {
      cellCoords.row = 0;
    }
    if (cellCoords.col < 0) {
      cellCoords.col = 0;
    }
    return topLeft.row <= cellCoords.row && bottomRight.row >= cellCoords.row && topLeft.col <= cellCoords.col && bottomRight.col >= cellCoords.col;
  },
  includesRange: function(testedRange) {
    return this.includes(testedRange.getTopLeftCorner()) && this.includes(testedRange.getBottomRightCorner());
  },
  isEqual: function(testedRange) {
    return (Math.min(this.from.row, this.to.row) == Math.min(testedRange.from.row, testedRange.to.row)) && (Math.max(this.from.row, this.to.row) == Math.max(testedRange.from.row, testedRange.to.row)) && (Math.min(this.from.col, this.to.col) == Math.min(testedRange.from.col, testedRange.to.col)) && (Math.max(this.from.col, this.to.col) == Math.max(testedRange.from.col, testedRange.to.col));
  },
  overlaps: function(testedRange) {
    return testedRange.isSouthEastOf(this.getTopLeftCorner()) && testedRange.isNorthWestOf(this.getBottomRightCorner());
  },
  isSouthEastOf: function(testedCoords) {
    return this.getTopLeftCorner().isSouthEastOf(testedCoords) || this.getBottomRightCorner().isSouthEastOf(testedCoords);
  },
  isNorthWestOf: function(testedCoords) {
    return this.getTopLeftCorner().isNorthWestOf(testedCoords) || this.getBottomRightCorner().isNorthWestOf(testedCoords);
  },
  expand: function(cellCoords) {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    if (cellCoords.row < topLeft.row || cellCoords.col < topLeft.col || cellCoords.row > bottomRight.row || cellCoords.col > bottomRight.col) {
      this.from = new WalkontableCellCoords(Math.min(topLeft.row, cellCoords.row), Math.min(topLeft.col, cellCoords.col));
      this.to = new WalkontableCellCoords(Math.max(bottomRight.row, cellCoords.row), Math.max(bottomRight.col, cellCoords.col));
      return true;
    }
    return false;
  },
  expandByRange: function(expandingRange) {
    if (this.includesRange(expandingRange) || !this.overlaps(expandingRange)) {
      return false;
    }
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    var topRight = this.getTopRightCorner();
    var bottomLeft = this.getBottomLeftCorner();
    var expandingTopLeft = expandingRange.getTopLeftCorner();
    var expandingBottomRight = expandingRange.getBottomRightCorner();
    var resultTopRow = Math.min(topLeft.row, expandingTopLeft.row);
    var resultTopCol = Math.min(topLeft.col, expandingTopLeft.col);
    var resultBottomRow = Math.max(bottomRight.row, expandingBottomRight.row);
    var resultBottomCol = Math.max(bottomRight.col, expandingBottomRight.col);
    var finalFrom = new WalkontableCellCoords(resultTopRow, resultTopCol),
        finalTo = new WalkontableCellCoords(resultBottomRow, resultBottomCol);
    var isCorner = new $WalkontableCellRange(finalFrom, finalFrom, finalTo).isCorner(this.from, expandingRange),
        onlyMerge = expandingRange.isEqual(new $WalkontableCellRange(finalFrom, finalFrom, finalTo));
    if (isCorner && !onlyMerge) {
      if (this.from.col > finalFrom.col) {
        finalFrom.col = resultBottomCol;
        finalTo.col = resultTopCol;
      }
      if (this.from.row > finalFrom.row) {
        finalFrom.row = resultBottomRow;
        finalTo.row = resultTopRow;
      }
    }
    this.from = finalFrom;
    this.to = finalTo;
    return true;
  },
  getDirection: function() {
    if (this.from.isNorthWestOf(this.to)) {
      return 'NW-SE';
    } else if (this.from.isNorthEastOf(this.to)) {
      return 'NE-SW';
    } else if (this.from.isSouthEastOf(this.to)) {
      return 'SE-NW';
    } else if (this.from.isSouthWestOf(this.to)) {
      return 'SW-NE';
    }
  },
  setDirection: function(direction) {
    switch (direction) {
      case 'NW-SE':
        this.from = this.getTopLeftCorner();
        this.to = this.getBottomRightCorner();
        break;
      case 'NE-SW':
        this.from = this.getTopRightCorner();
        this.to = this.getBottomLeftCorner();
        break;
      case 'SE-NW':
        this.from = this.getBottomRightCorner();
        this.to = this.getTopLeftCorner();
        break;
      case 'SW-NE':
        this.from = this.getBottomLeftCorner();
        this.to = this.getTopRightCorner();
        break;
    }
  },
  getTopLeftCorner: function() {
    return new WalkontableCellCoords(Math.min(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
  },
  getBottomRightCorner: function() {
    return new WalkontableCellCoords(Math.max(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
  },
  getTopRightCorner: function() {
    return new WalkontableCellCoords(Math.min(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
  },
  getBottomLeftCorner: function() {
    return new WalkontableCellCoords(Math.max(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
  },
  isCorner: function(coords, expandedRange) {
    if (expandedRange) {
      if (expandedRange.includes(coords)) {
        if (this.getTopLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.from.col)) || this.getTopRightCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.to.col)) || this.getBottomLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.from.col)) || this.getBottomRightCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.to.col))) {
          return true;
        }
      }
    }
    return coords.isEqual(this.getTopLeftCorner()) || coords.isEqual(this.getTopRightCorner()) || coords.isEqual(this.getBottomLeftCorner()) || coords.isEqual(this.getBottomRightCorner());
  },
  getOppositeCorner: function(coords, expandedRange) {
    if (!(coords instanceof WalkontableCellCoords)) {
      return false;
    }
    if (expandedRange) {
      if (expandedRange.includes(coords)) {
        if (this.getTopLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.from.col))) {
          return this.getBottomRightCorner();
        }
        if (this.getTopRightCorner().isEqual(new WalkontableCellCoords(expandedRange.from.row, expandedRange.to.col))) {
          return this.getBottomLeftCorner();
        }
        if (this.getBottomLeftCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.from.col))) {
          return this.getTopRightCorner();
        }
        if (this.getBottomRightCorner().isEqual(new WalkontableCellCoords(expandedRange.to.row, expandedRange.to.col))) {
          return this.getTopLeftCorner();
        }
      }
    }
    if (coords.isEqual(this.getBottomRightCorner())) {
      return this.getTopLeftCorner();
    } else if (coords.isEqual(this.getTopLeftCorner())) {
      return this.getBottomRightCorner();
    } else if (coords.isEqual(this.getTopRightCorner())) {
      return this.getBottomLeftCorner();
    } else if (coords.isEqual(this.getBottomLeftCorner())) {
      return this.getTopRightCorner();
    }
  },
  getBordersSharedWith: function(range) {
    if (!this.includesRange(range)) {
      return [];
    }
    var thisBorders = {
      top: Math.min(this.from.row, this.to.row),
      bottom: Math.max(this.from.row, this.to.row),
      left: Math.min(this.from.col, this.to.col),
      right: Math.max(this.from.col, this.to.col)
    };
    var rangeBorders = {
      top: Math.min(range.from.row, range.to.row),
      bottom: Math.max(range.from.row, range.to.row),
      left: Math.min(range.from.col, range.to.col),
      right: Math.max(range.from.col, range.to.col)
    };
    var result = [];
    if (thisBorders.top == rangeBorders.top) {
      result.push('top');
    }
    if (thisBorders.right == rangeBorders.right) {
      result.push('right');
    }
    if (thisBorders.bottom == rangeBorders.bottom) {
      result.push('bottom');
    }
    if (thisBorders.left == rangeBorders.left) {
      result.push('left');
    }
    return result;
  },
  getInner: function() {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    var out = [];
    for (var r = topLeft.row; r <= bottomRight.row; r++) {
      for (var c = topLeft.col; c <= bottomRight.col; c++) {
        if (!(this.from.row === r && this.from.col === c) && !(this.to.row === r && this.to.col === c)) {
          out.push(new WalkontableCellCoords(r, c));
        }
      }
    }
    return out;
  },
  getAll: function() {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    var out = [];
    for (var r = topLeft.row; r <= bottomRight.row; r++) {
      for (var c = topLeft.col; c <= bottomRight.col; c++) {
        if (topLeft.row === r && topLeft.col === c) {
          out.push(topLeft);
        } else if (bottomRight.row === r && bottomRight.col === c) {
          out.push(bottomRight);
        } else {
          out.push(new WalkontableCellCoords(r, c));
        }
      }
    }
    return out;
  },
  forAll: function(callback) {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    for (var r = topLeft.row; r <= bottomRight.row; r++) {
      for (var c = topLeft.col; c <= bottomRight.col; c++) {
        var breakIteration = callback(r, c);
        if (breakIteration === false) {
          return;
        }
      }
    }
  }
}, {});
;
window.WalkontableCellRange = WalkontableCellRange;

//# 
},{"cell/coords":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Walkontable: {get: function() {
      return Walkontable;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_helpers_47_object__,
    $___46__46__47__46__46__47__46__46__47_helpers_47_string__,
    $__event__,
    $__overlays__,
    $__scroll__,
    $__settings__,
    $__table__,
    $__viewport__,
    $__overlay_47__95_base_46_js__,
    $__overlay_47_top_46_js__,
    $__overlay_47_left_46_js__,
    $__overlay_47_debug_46_js__,
    $__overlay_47_topLeftCorner_46_js__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    fastInnerText = $__0.fastInnerText,
    isVisible = $__0.isVisible,
    removeClass = $__0.removeClass;
var objectEach = ($___46__46__47__46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_object__}).objectEach;
var $__2 = ($___46__46__47__46__46__47__46__46__47_helpers_47_string__ = require("helpers/string"), $___46__46__47__46__46__47__46__46__47_helpers_47_string__ && $___46__46__47__46__46__47__46__46__47_helpers_47_string__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_string__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_string__}),
    toUpperCaseFirst = $__2.toUpperCaseFirst,
    randomString = $__2.randomString;
var WalkontableEvent = ($__event__ = require("event"), $__event__ && $__event__.__esModule && $__event__ || {default: $__event__}).WalkontableEvent;
var WalkontableOverlays = ($__overlays__ = require("overlays"), $__overlays__ && $__overlays__.__esModule && $__overlays__ || {default: $__overlays__}).WalkontableOverlays;
var WalkontableScroll = ($__scroll__ = require("scroll"), $__scroll__ && $__scroll__.__esModule && $__scroll__ || {default: $__scroll__}).WalkontableScroll;
var WalkontableSettings = ($__settings__ = require("settings"), $__settings__ && $__settings__.__esModule && $__settings__ || {default: $__settings__}).WalkontableSettings;
var WalkontableTable = ($__table__ = require("table"), $__table__ && $__table__.__esModule && $__table__ || {default: $__table__}).WalkontableTable;
var WalkontableViewport = ($__viewport__ = require("viewport"), $__viewport__ && $__viewport__.__esModule && $__viewport__ || {default: $__viewport__}).WalkontableViewport;
var WalkontableOverlay = ($__overlay_47__95_base_46_js__ = require("overlay/_base.js"), $__overlay_47__95_base_46_js__ && $__overlay_47__95_base_46_js__.__esModule && $__overlay_47__95_base_46_js__ || {default: $__overlay_47__95_base_46_js__}).WalkontableOverlay;
var WalkontableTopOverlay = ($__overlay_47_top_46_js__ = require("overlay/top.js"), $__overlay_47_top_46_js__ && $__overlay_47_top_46_js__.__esModule && $__overlay_47_top_46_js__ || {default: $__overlay_47_top_46_js__}).WalkontableTopOverlay;
var WalkontableLeftOverlay = ($__overlay_47_left_46_js__ = require("overlay/left.js"), $__overlay_47_left_46_js__ && $__overlay_47_left_46_js__.__esModule && $__overlay_47_left_46_js__ || {default: $__overlay_47_left_46_js__}).WalkontableLeftOverlay;
var WalkontableDebugOverlay = ($__overlay_47_debug_46_js__ = require("overlay/debug.js"), $__overlay_47_debug_46_js__ && $__overlay_47_debug_46_js__.__esModule && $__overlay_47_debug_46_js__ || {default: $__overlay_47_debug_46_js__}).WalkontableDebugOverlay;
var WalkontableTopLeftCornerOverlay = ($__overlay_47_topLeftCorner_46_js__ = require("overlay/topLeftCorner.js"), $__overlay_47_topLeftCorner_46_js__ && $__overlay_47_topLeftCorner_46_js__.__esModule && $__overlay_47_topLeftCorner_46_js__ || {default: $__overlay_47_topLeftCorner_46_js__}).WalkontableTopLeftCornerOverlay;
var Walkontable = function Walkontable(settings) {
  var originalHeaders = [];
  this.guid = 'wt_' + randomString();
  if (settings.cloneSource) {
    this.cloneSource = settings.cloneSource;
    this.cloneOverlay = settings.cloneOverlay;
    this.wtSettings = settings.cloneSource.wtSettings;
    this.wtTable = new WalkontableTable(this, settings.table, settings.wtRootElement);
    this.wtScroll = new WalkontableScroll(this);
    this.wtViewport = settings.cloneSource.wtViewport;
    this.wtEvent = new WalkontableEvent(this);
    this.selections = this.cloneSource.selections;
  } else {
    this.wtSettings = new WalkontableSettings(this, settings);
    this.wtTable = new WalkontableTable(this, settings.table);
    this.wtScroll = new WalkontableScroll(this);
    this.wtViewport = new WalkontableViewport(this);
    this.wtEvent = new WalkontableEvent(this);
    this.selections = this.getSetting('selections');
    this.wtOverlays = new WalkontableOverlays(this);
    this.exportSettingsAsClassNames();
  }
  if (this.wtTable.THEAD.childNodes.length && this.wtTable.THEAD.childNodes[0].childNodes.length) {
    for (var c = 0,
        clen = this.wtTable.THEAD.childNodes[0].childNodes.length; c < clen; c++) {
      originalHeaders.push(this.wtTable.THEAD.childNodes[0].childNodes[c].innerHTML);
    }
    if (!this.getSetting('columnHeaders').length) {
      this.update('columnHeaders', [function(column, TH) {
        fastInnerText(TH, originalHeaders[column]);
      }]);
    }
  }
  this.drawn = false;
  this.drawInterrupted = false;
};
($traceurRuntime.createClass)(Walkontable, {
  draw: function() {
    var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
    this.drawInterrupted = false;
    if (!fastDraw && !isVisible(this.wtTable.TABLE)) {
      this.drawInterrupted = true;
    } else {
      this.wtTable.draw(fastDraw);
    }
    return this;
  },
  getCell: function(coords) {
    var topmost = arguments[1] !== (void 0) ? arguments[1] : false;
    if (!topmost) {
      return this.wtTable.getCell(coords);
    }
    var totalRows = this.wtSettings.getSetting('totalRows');
    var fixedRowsTop = this.wtSettings.getSetting('fixedRowsTop');
    var fixedRowsBottom = this.wtSettings.getSetting('fixedRowsBottom');
    var fixedColumns = this.wtSettings.getSetting('fixedColumnsLeft');
    if (coords.row < fixedRowsTop && coords.col < fixedColumns) {
      return this.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell(coords);
    } else if (coords.row < fixedRowsTop) {
      return this.wtOverlays.topOverlay.clone.wtTable.getCell(coords);
    } else if (coords.col < fixedColumns && coords.row >= totalRows - fixedRowsBottom) {
      if (this.wtOverlays.bottomLeftCornerOverlay.clone) {
        return this.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell(coords);
      }
    } else if (coords.col < fixedColumns) {
      return this.wtOverlays.leftOverlay.clone.wtTable.getCell(coords);
    } else if (coords.row >= totalRows - fixedRowsBottom) {
      if (this.wtOverlays.bottomOverlay.clone) {
        return this.wtOverlays.bottomOverlay.clone.wtTable.getCell(coords);
      }
    }
    return this.wtTable.getCell(coords);
  },
  update: function(settings, value) {
    return this.wtSettings.update(settings, value);
  },
  scrollVertical: function(row) {
    this.wtOverlays.topOverlay.scrollTo(row);
    this.getSetting('onScrollVertically');
    return this;
  },
  scrollHorizontal: function(column) {
    this.wtOverlays.leftOverlay.scrollTo(column);
    this.getSetting('onScrollHorizontally');
    return this;
  },
  scrollViewport: function(coords) {
    this.wtScroll.scrollViewport(coords);
    return this;
  },
  getViewport: function() {
    return [this.wtTable.getFirstVisibleRow(), this.wtTable.getFirstVisibleColumn(), this.wtTable.getLastVisibleRow(), this.wtTable.getLastVisibleColumn()];
  },
  getOverlayName: function() {
    return this.cloneOverlay ? this.cloneOverlay.type : 'master';
  },
  exportSettingsAsClassNames: function() {
    var $__14 = this;
    var toExport = {
      rowHeaders: ['array'],
      columnHeaders: ['array']
    };
    var allClassNames = [];
    var newClassNames = [];
    objectEach(toExport, (function(optionType, key) {
      if (optionType.indexOf('array') > -1 && $__14.getSetting(key).length) {
        newClassNames.push('ht' + toUpperCaseFirst(key));
      }
      allClassNames.push('ht' + toUpperCaseFirst(key));
    }));
    removeClass(this.wtTable.wtRootElement.parentNode, allClassNames);
    addClass(this.wtTable.wtRootElement.parentNode, newClassNames);
  },
  getSetting: function(key, param1, param2, param3, param4) {
    return this.wtSettings.getSetting(key, param1, param2, param3, param4);
  },
  hasSetting: function(key) {
    return this.wtSettings.has(key);
  },
  destroy: function() {
    this.wtOverlays.destroy();
    this.wtEvent.destroy();
  }
}, {});
;
window.Walkontable = Walkontable;

//# 
},{"event":7,"helpers/dom/element":36,"helpers/object":41,"helpers/string":43,"overlay/_base.js":10,"overlay/debug.js":11,"overlay/left.js":12,"overlay/top.js":13,"overlay/topLeftCorner.js":14,"overlays":15,"scroll":16,"settings":18,"table":19,"viewport":21}],7:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableEvent: {get: function() {
      return WalkontableEvent;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_eventManager__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    closest = $__0.closest,
    hasClass = $__0.hasClass,
    isChildOf = $__0.isChildOf;
var eventManagerObject = ($___46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager__}).eventManager;
function WalkontableEvent(instance) {
  var that = this;
  var eventManager = eventManagerObject(instance);
  this.instance = instance;
  var dblClickOrigin = [null, null];
  this.dblClickTimeout = [null, null];
  var onMouseDown = function(event) {
    var cell = that.parentCell(event.realTarget);
    if (hasClass(event.realTarget, 'corner')) {
      that.instance.getSetting('onCellCornerMouseDown', event, event.realTarget);
    } else if (cell.TD) {
      if (that.instance.hasSetting('onCellMouseDown')) {
        that.instance.getSetting('onCellMouseDown', event, cell.coords, cell.TD, that.instance);
      }
    }
    if (event.button !== 2) {
      if (cell.TD) {
        dblClickOrigin[0] = cell.TD;
        clearTimeout(that.dblClickTimeout[0]);
        that.dblClickTimeout[0] = setTimeout(function() {
          dblClickOrigin[0] = null;
        }, 1000);
      }
    }
  };
  var onTouchMove = function(event) {
    that.instance.touchMoving = true;
  };
  var longTouchTimeout;
  var onTouchStart = function(event) {
    var container = this;
    eventManager.addEventListener(this, 'touchmove', onTouchMove);
    that.checkIfTouchMove = setTimeout(function() {
      if (that.instance.touchMoving === true) {
        that.instance.touchMoving = void 0;
        eventManager.removeEventListener('touchmove', onTouchMove, false);
        return;
      } else {
        onMouseDown(event);
      }
    }, 30);
  };
  var lastMouseOver;
  var onMouseOver = function(event) {
    var table,
        td;
    if (that.instance.hasSetting('onCellMouseOver')) {
      table = that.instance.wtTable.TABLE;
      td = closest(event.realTarget, ['TD', 'TH'], table);
      if (td && td !== lastMouseOver && isChildOf(td, table)) {
        lastMouseOver = td;
        that.instance.getSetting('onCellMouseOver', event, that.instance.wtTable.getCoords(td), td, that.instance);
      }
    }
  };
  var onMouseUp = function(event) {
    if (event.button !== 2) {
      var cell = that.parentCell(event.realTarget);
      if (cell.TD === dblClickOrigin[0] && cell.TD === dblClickOrigin[1]) {
        if (hasClass(event.realTarget, 'corner')) {
          that.instance.getSetting('onCellCornerDblClick', event, cell.coords, cell.TD, that.instance);
        } else {
          that.instance.getSetting('onCellDblClick', event, cell.coords, cell.TD, that.instance);
        }
        dblClickOrigin[0] = null;
        dblClickOrigin[1] = null;
      } else if (cell.TD === dblClickOrigin[0]) {
        dblClickOrigin[1] = cell.TD;
        clearTimeout(that.dblClickTimeout[1]);
        that.dblClickTimeout[1] = setTimeout(function() {
          dblClickOrigin[1] = null;
        }, 500);
      }
    }
  };
  var onTouchEnd = function(event) {
    clearTimeout(longTouchTimeout);
    event.preventDefault();
    onMouseUp(event);
  };
  eventManager.addEventListener(this.instance.wtTable.holder, 'mousedown', onMouseDown);
  eventManager.addEventListener(this.instance.wtTable.TABLE, 'mouseover', onMouseOver);
  eventManager.addEventListener(this.instance.wtTable.holder, 'mouseup', onMouseUp);
  if (this.instance.wtTable.holder.parentNode.parentNode && Handsontable.mobileBrowser && !that.instance.wtTable.isWorkingOnClone()) {
    var classSelector = '.' + this.instance.wtTable.holder.parentNode.className.split(' ').join('.');
    eventManager.addEventListener(this.instance.wtTable.holder, 'touchstart', function(event) {
      that.instance.touchApplied = true;
      if (isChildOf(event.target, classSelector)) {
        onTouchStart.call(event.target, event);
      }
    });
    eventManager.addEventListener(this.instance.wtTable.holder, 'touchend', function(event) {
      that.instance.touchApplied = false;
      if (isChildOf(event.target, classSelector)) {
        onTouchEnd.call(event.target, event);
      }
    });
    if (!that.instance.momentumScrolling) {
      that.instance.momentumScrolling = {};
    }
    eventManager.addEventListener(this.instance.wtTable.holder, 'scroll', function(event) {
      clearTimeout(that.instance.momentumScrolling._timeout);
      if (!that.instance.momentumScrolling.ongoing) {
        that.instance.getSetting('onBeforeTouchScroll');
      }
      that.instance.momentumScrolling.ongoing = true;
      that.instance.momentumScrolling._timeout = setTimeout(function() {
        if (!that.instance.touchApplied) {
          that.instance.momentumScrolling.ongoing = false;
          that.instance.getSetting('onAfterMomentumScroll');
        }
      }, 200);
    });
  }
  eventManager.addEventListener(window, 'resize', function() {
    if (that.instance.getSetting('stretchH') !== 'none') {
      that.instance.draw();
    }
  });
  this.destroy = function() {
    clearTimeout(this.dblClickTimeout[0]);
    clearTimeout(this.dblClickTimeout[1]);
    eventManager.destroy();
  };
}
WalkontableEvent.prototype.parentCell = function(elem) {
  var cell = {};
  var TABLE = this.instance.wtTable.TABLE;
  var TD = closest(elem, ['TD', 'TH'], TABLE);
  if (TD && isChildOf(TD, TABLE)) {
    cell.coords = this.instance.wtTable.getCoords(TD);
    cell.TD = TD;
  } else if (hasClass(elem, 'wtBorder') && hasClass(elem, 'current')) {
    cell.coords = this.instance.selections.current.cellRange.highlight;
    cell.TD = this.instance.wtTable.getCell(cell.coords);
  } else if (hasClass(elem, 'wtBorder') && hasClass(elem, 'area')) {
    if (this.instance.selections.area.cellRange) {
      cell.coords = this.instance.selections.area.cellRange.to;
      cell.TD = this.instance.wtTable.getCell(cell.coords);
    }
  }
  return cell;
};
;
window.WalkontableEvent = WalkontableEvent;

//# 
},{"eventManager":32,"helpers/dom/element":36}],8:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableColumnFilter: {get: function() {
      return WalkontableColumnFilter;
    }},
  __esModule: {value: true}
});
var WalkontableColumnFilter = function WalkontableColumnFilter(offset, total, countTH) {
  this.offset = offset;
  this.total = total;
  this.countTH = countTH;
};
($traceurRuntime.createClass)(WalkontableColumnFilter, {
  offsetted: function(index) {
    return index + this.offset;
  },
  unOffsetted: function(index) {
    return index - this.offset;
  },
  renderedToSource: function(index) {
    return this.offsetted(index);
  },
  sourceToRendered: function(index) {
    return this.unOffsetted(index);
  },
  offsettedTH: function(index) {
    return index - this.countTH;
  },
  unOffsettedTH: function(index) {
    return index + this.countTH;
  },
  visibleRowHeadedColumnToSourceColumn: function(index) {
    return this.renderedToSource(this.offsettedTH(index));
  },
  sourceColumnToVisibleRowHeadedColumn: function(index) {
    return this.unOffsettedTH(this.sourceToRendered(index));
  }
}, {});
;
window.WalkontableColumnFilter = WalkontableColumnFilter;

//# 
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableRowFilter: {get: function() {
      return WalkontableRowFilter;
    }},
  __esModule: {value: true}
});
var WalkontableRowFilter = function WalkontableRowFilter(offset, total, countTH) {
  this.offset = offset;
  this.total = total;
  this.countTH = countTH;
};
($traceurRuntime.createClass)(WalkontableRowFilter, {
  offsetted: function(index) {
    return index + this.offset;
  },
  unOffsetted: function(index) {
    return index - this.offset;
  },
  renderedToSource: function(index) {
    return this.offsetted(index);
  },
  sourceToRendered: function(index) {
    return this.unOffsetted(index);
  },
  offsettedTH: function(index) {
    return index - this.countTH;
  },
  unOffsettedTH: function(index) {
    return index + this.countTH;
  },
  visibleColHeadedRowToSourceRow: function(index) {
    return this.renderedToSource(this.offsettedTH(index));
  },
  sourceRowToVisibleColHeadedRow: function(index) {
    return this.unOffsettedTH(this.sourceToRendered(index));
  }
}, {});
;
window.WalkontableRowFilter = WalkontableRowFilter;

//# 
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableOverlay: {get: function() {
      return WalkontableOverlay;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__,
    $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__;
var $__0 = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getScrollableElement = $__0.getScrollableElement,
    getTrimmingContainer = $__0.getTrimmingContainer;
var defineGetter = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_object__}).defineGetter;
var eventManagerObject = ($___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_eventManager__}).eventManager;
var registeredOverlays = {};
var WalkontableOverlay = function WalkontableOverlay(wotInstance) {
  defineGetter(this, 'wot', wotInstance, {writable: false});
  this.instance = this.wot;
  this.type = '';
  this.TABLE = this.wot.wtTable.TABLE;
  this.hider = this.wot.wtTable.hider;
  this.spreader = this.wot.wtTable.spreader;
  this.holder = this.wot.wtTable.holder;
  this.wtRootElement = this.wot.wtTable.wtRootElement;
  this.trimmingContainer = getTrimmingContainer(this.hider.parentNode.parentNode);
  this.mainTableScrollableElement = getScrollableElement(this.wot.wtTable.TABLE);
  this.needFullRender = this.shouldBeRendered();
  this.areElementSizesAdjusted = false;
};
var $WalkontableOverlay = WalkontableOverlay;
($traceurRuntime.createClass)(WalkontableOverlay, {
  shouldBeRendered: function() {
    return true;
  },
  makeClone: function(direction) {
    if ($WalkontableOverlay.CLONE_TYPES.indexOf(direction) === -1) {
      throw new Error('Clone type "' + direction + '" is not supported.');
    }
    var clone = document.createElement('DIV');
    var clonedTable = document.createElement('TABLE');
    clone.className = 'ht_clone_' + direction + ' handsontable';
    clone.style.position = 'absolute';
    clone.style.top = 0;
    clone.style.left = 0;
    clone.style.overflow = 'hidden';
    clonedTable.className = this.wot.wtTable.TABLE.className;
    clone.appendChild(clonedTable);
    this.type = direction;
    this.wot.wtTable.wtRootElement.parentNode.appendChild(clone);
    return new Walkontable({
      cloneSource: this.wot,
      cloneOverlay: this,
      table: clonedTable
    });
  },
  refresh: function() {
    var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
    var nextCycleRenderFlag = this.shouldBeRendered();
    if (this.clone && (this.needFullRender || nextCycleRenderFlag)) {
      this.clone.draw(fastDraw);
    }
    this.needFullRender = nextCycleRenderFlag;
  },
  destroy: function() {
    eventManagerObject(this.clone).destroy();
  }
}, {
  get CLONE_TOP() {
    return 'top';
  },
  get CLONE_BOTTOM() {
    return 'bottom';
  },
  get CLONE_LEFT() {
    return 'left';
  },
  get CLONE_TOP_LEFT_CORNER() {
    return 'top_left_corner';
  },
  get CLONE_BOTTOM_LEFT_CORNER() {
    return 'bottom_left_corner';
  },
  get CLONE_DEBUG() {
    return 'debug';
  },
  get CLONE_TYPES() {
    return [$WalkontableOverlay.CLONE_TOP, $WalkontableOverlay.CLONE_BOTTOM, $WalkontableOverlay.CLONE_LEFT, $WalkontableOverlay.CLONE_TOP_LEFT_CORNER, $WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER, $WalkontableOverlay.CLONE_DEBUG];
  },
  registerOverlay: function(type, overlayClass) {
    if ($WalkontableOverlay.CLONE_TYPES.indexOf(type) === -1) {
      throw new Error(("Unsupported overlay (" + type + ")."));
    }
    registeredOverlays[type] = overlayClass;
  },
  createOverlay: function(type, wot) {
    return new registeredOverlays[type](wot);
  },
  isOverlayTypeOf: function(overlay, type) {
    if (!overlay || !registeredOverlays[type]) {
      return false;
    }
    return overlay instanceof registeredOverlays[type];
  }
});
;
window.WalkontableOverlay = WalkontableOverlay;

//# 
},{"eventManager":32,"helpers/dom/element":36,"helpers/object":41}],11:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableDebugOverlay: {get: function() {
      return WalkontableDebugOverlay;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___95_base__;
var addClass = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}).addClass;
var WalkontableOverlay = ($___95_base__ = require("_base"), $___95_base__ && $___95_base__.__esModule && $___95_base__ || {default: $___95_base__}).WalkontableOverlay;
var WalkontableDebugOverlay = function WalkontableDebugOverlay(wotInstance) {
  $traceurRuntime.superConstructor($WalkontableDebugOverlay).call(this, wotInstance);
  this.clone = this.makeClone(WalkontableOverlay.CLONE_DEBUG);
  this.clone.wtTable.holder.style.opacity = 0.4;
  this.clone.wtTable.holder.style.textShadow = '0 0 2px #ff0000';
  addClass(this.clone.wtTable.holder.parentNode, 'wtDebugVisible');
};
var $WalkontableDebugOverlay = WalkontableDebugOverlay;
($traceurRuntime.createClass)(WalkontableDebugOverlay, {}, {}, WalkontableOverlay);
;
window.WalkontableDebugOverlay = WalkontableDebugOverlay;
WalkontableOverlay.registerOverlay(WalkontableOverlay.CLONE_DEBUG, WalkontableDebugOverlay);

//# 
},{"_base":10,"helpers/dom/element":36}],12:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableLeftOverlay: {get: function() {
      return WalkontableLeftOverlay;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___95_base__;
var $__0 = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    getScrollbarWidth = $__0.getScrollbarWidth,
    getScrollLeft = $__0.getScrollLeft,
    getWindowScrollTop = $__0.getWindowScrollTop,
    hasClass = $__0.hasClass,
    outerWidth = $__0.outerWidth,
    removeClass = $__0.removeClass,
    setOverlayPosition = $__0.setOverlayPosition;
var WalkontableOverlay = ($___95_base__ = require("_base"), $___95_base__ && $___95_base__.__esModule && $___95_base__ || {default: $___95_base__}).WalkontableOverlay;
var WalkontableLeftOverlay = function WalkontableLeftOverlay(wotInstance) {
  $traceurRuntime.superConstructor($WalkontableLeftOverlay).call(this, wotInstance);
  this.clone = this.makeClone(WalkontableOverlay.CLONE_LEFT);
};
var $WalkontableLeftOverlay = WalkontableLeftOverlay;
($traceurRuntime.createClass)(WalkontableLeftOverlay, {
  shouldBeRendered: function() {
    return this.wot.getSetting('fixedColumnsLeft') || this.wot.getSetting('rowHeaders').length ? true : false;
  },
  resetFixedPosition: function() {
    if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
      return;
    }
    var overlayRoot = this.clone.wtTable.holder.parentNode;
    var headerPosition = 0;
    if (this.trimmingContainer === window) {
      var box = this.wot.wtTable.hider.getBoundingClientRect();
      var left = Math.ceil(box.left);
      var right = Math.ceil(box.right);
      var finalLeft;
      var finalTop;
      finalTop = this.wot.wtTable.hider.style.top;
      finalTop = finalTop === '' ? 0 : finalTop;
      if (left < 0 && (right - overlayRoot.offsetWidth) > 0) {
        finalLeft = -left;
      } else {
        finalLeft = 0;
      }
      headerPosition = finalLeft;
      finalLeft = finalLeft + 'px';
      setOverlayPosition(overlayRoot, finalLeft, finalTop);
    } else {
      headerPosition = this.getScrollPosition();
    }
    this.adjustHeaderBordersPosition(headerPosition);
    this.adjustElementsSize();
  },
  setScrollPosition: function(pos) {
    if (this.mainTableScrollableElement === window) {
      window.scrollTo(pos, getWindowScrollTop());
    } else {
      this.mainTableScrollableElement.scrollLeft = pos;
    }
  },
  onScroll: function() {
    this.wot.getSetting('onScrollHorizontally');
  },
  sumCellSizes: function(from, to) {
    var sum = 0;
    var defaultColumnWidth = this.wot.wtSettings.defaultColumnWidth;
    while (from < to) {
      sum += this.wot.wtTable.getStretchedColumnWidth(from) || defaultColumnWidth;
      from++;
    }
    return sum;
  },
  adjustElementsSize: function() {
    var force = arguments[0] !== (void 0) ? arguments[0] : false;
    if (this.needFullRender || force) {
      this.adjustRootElementSize();
      this.adjustRootChildrenSize();
      if (!force) {
        this.areElementSizesAdjusted = true;
      }
    }
  },
  adjustRootElementSize: function() {
    var masterHolder = this.wot.wtTable.holder;
    var scrollbarHeight = masterHolder.clientHeight === masterHolder.offsetHeight ? 0 : getScrollbarWidth();
    var overlayRoot = this.clone.wtTable.holder.parentNode;
    var overlayRootStyle = overlayRoot.style;
    var tableWidth;
    if (this.trimmingContainer !== window) {
      overlayRootStyle.height = this.wot.wtViewport.getWorkspaceHeight() - scrollbarHeight + 'px';
    }
    this.clone.wtTable.holder.style.height = overlayRootStyle.height;
    tableWidth = outerWidth(this.clone.wtTable.TABLE);
    overlayRootStyle.width = (tableWidth === 0 ? tableWidth : tableWidth + 4) + 'px';
  },
  adjustRootChildrenSize: function() {
    var scrollbarWidth = getScrollbarWidth();
    this.clone.wtTable.hider.style.height = this.hider.style.height;
    this.clone.wtTable.holder.style.height = this.clone.wtTable.holder.parentNode.style.height;
    if (scrollbarWidth === 0) {
      scrollbarWidth = 30;
    }
    this.clone.wtTable.holder.style.width = parseInt(this.clone.wtTable.holder.parentNode.style.width, 10) + scrollbarWidth + 'px';
  },
  applyToDOM: function() {
    var total = this.wot.getSetting('totalColumns');
    if (!this.areElementSizesAdjusted) {
      this.adjustElementsSize();
    }
    if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
      this.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + 'px';
    } else if (total === 0) {
      this.spreader.style.left = '0';
    } else {
      throw new Error('Incorrect value of the columnsRenderCalculator');
    }
    this.spreader.style.right = '';
    if (this.needFullRender) {
      this.syncOverlayOffset();
    }
  },
  syncOverlayOffset: function() {
    if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
      this.clone.wtTable.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + 'px';
    } else {
      this.clone.wtTable.spreader.style.top = '';
    }
  },
  scrollTo: function(sourceCol, beyondRendered) {
    var newX = this.getTableParentOffset();
    var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
    var mainHolder = sourceInstance.wtTable.holder;
    var scrollbarCompensation = 0;
    if (beyondRendered && mainHolder.offsetWidth !== mainHolder.clientWidth) {
      scrollbarCompensation = getScrollbarWidth();
    }
    if (beyondRendered) {
      newX += this.sumCellSizes(0, sourceCol + 1);
      newX -= this.wot.wtViewport.getViewportWidth();
    } else {
      newX += this.sumCellSizes(this.wot.getSetting('fixedColumnsLeft'), sourceCol);
    }
    newX += scrollbarCompensation;
    this.setScrollPosition(newX);
  },
  getTableParentOffset: function() {
    if (this.trimmingContainer === window) {
      return this.wot.wtTable.holderOffset.left;
    } else {
      return 0;
    }
  },
  getScrollPosition: function() {
    return getScrollLeft(this.mainTableScrollableElement);
  },
  adjustHeaderBordersPosition: function(position) {
    var masterParent = this.wot.wtTable.holder.parentNode;
    var rowHeaders = this.wot.getSetting('rowHeaders');
    var fixedColumnsLeft = this.wot.getSetting('fixedColumnsLeft');
    if (fixedColumnsLeft && !rowHeaders.length) {
      addClass(masterParent, 'innerBorderLeft');
    } else if (!fixedColumnsLeft && rowHeaders.length) {
      var previousState = hasClass(masterParent, 'innerBorderLeft');
      if (position) {
        addClass(masterParent, 'innerBorderLeft');
      } else {
        removeClass(masterParent, 'innerBorderLeft');
      }
      if (!previousState && position || previousState && !position) {
        this.wot.wtOverlays.adjustElementsSize();
      }
    }
  }
}, {}, WalkontableOverlay);
;
window.WalkontableLeftOverlay = WalkontableLeftOverlay;
WalkontableOverlay.registerOverlay(WalkontableOverlay.CLONE_LEFT, WalkontableLeftOverlay);

//# 
},{"_base":10,"helpers/dom/element":36}],13:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableTopOverlay: {get: function() {
      return WalkontableTopOverlay;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___95_base__;
var $__0 = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    getScrollbarWidth = $__0.getScrollbarWidth,
    getScrollTop = $__0.getScrollTop,
    getWindowScrollLeft = $__0.getWindowScrollLeft,
    hasClass = $__0.hasClass,
    outerHeight = $__0.outerHeight,
    removeClass = $__0.removeClass,
    setOverlayPosition = $__0.setOverlayPosition;
var WalkontableOverlay = ($___95_base__ = require("_base"), $___95_base__ && $___95_base__.__esModule && $___95_base__ || {default: $___95_base__}).WalkontableOverlay;
var WalkontableTopOverlay = function WalkontableTopOverlay(wotInstance) {
  $traceurRuntime.superConstructor($WalkontableTopOverlay).call(this, wotInstance);
  this.clone = this.makeClone(WalkontableOverlay.CLONE_TOP);
};
var $WalkontableTopOverlay = WalkontableTopOverlay;
($traceurRuntime.createClass)(WalkontableTopOverlay, {
  shouldBeRendered: function() {
    return this.wot.getSetting('fixedRowsTop') || this.wot.getSetting('columnHeaders').length ? true : false;
  },
  resetFixedPosition: function() {
    if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
      return;
    }
    var overlayRoot = this.clone.wtTable.holder.parentNode;
    var headerPosition = 0;
    if (this.wot.wtOverlays.leftOverlay.trimmingContainer === window) {
      var box = this.wot.wtTable.hider.getBoundingClientRect();
      var top = Math.ceil(box.top);
      var bottom = Math.ceil(box.bottom);
      var finalLeft;
      var finalTop;
      finalLeft = this.wot.wtTable.hider.style.left;
      finalLeft = finalLeft === '' ? 0 : finalLeft;
      if (top < 0 && (bottom - overlayRoot.offsetHeight) > 0) {
        finalTop = -top;
      } else {
        finalTop = 0;
      }
      headerPosition = finalTop;
      finalTop = finalTop + 'px';
      setOverlayPosition(overlayRoot, finalLeft, finalTop);
    } else {
      headerPosition = this.getScrollPosition();
    }
    this.adjustHeaderBordersPosition(headerPosition);
    this.adjustElementsSize();
  },
  setScrollPosition: function(pos) {
    if (this.mainTableScrollableElement === window) {
      window.scrollTo(getWindowScrollLeft(), pos);
    } else {
      this.mainTableScrollableElement.scrollTop = pos;
    }
  },
  onScroll: function() {
    this.wot.getSetting('onScrollVertically');
  },
  sumCellSizes: function(from, to) {
    var sum = 0;
    var defaultRowHeight = this.wot.wtSettings.settings.defaultRowHeight;
    while (from < to) {
      sum += this.wot.wtTable.getRowHeight(from) || defaultRowHeight;
      from++;
    }
    return sum;
  },
  adjustElementsSize: function() {
    var force = arguments[0] !== (void 0) ? arguments[0] : false;
    if (this.needFullRender || force) {
      this.adjustRootElementSize();
      this.adjustRootChildrenSize();
      if (!force) {
        this.areElementSizesAdjusted = true;
      }
    }
  },
  adjustRootElementSize: function() {
    var masterHolder = this.wot.wtTable.holder;
    var scrollbarWidth = masterHolder.clientWidth === masterHolder.offsetWidth ? 0 : getScrollbarWidth();
    var overlayRoot = this.clone.wtTable.holder.parentNode;
    var overlayRootStyle = overlayRoot.style;
    var tableHeight;
    if (this.trimmingContainer !== window) {
      overlayRootStyle.width = this.wot.wtViewport.getWorkspaceWidth() - scrollbarWidth + 'px';
    }
    this.clone.wtTable.holder.style.width = overlayRootStyle.width;
    tableHeight = outerHeight(this.clone.wtTable.TABLE);
    overlayRootStyle.height = (tableHeight === 0 ? tableHeight : tableHeight + 4) + 'px';
  },
  adjustRootChildrenSize: function() {
    var scrollbarWidth = getScrollbarWidth();
    this.clone.wtTable.hider.style.width = this.hider.style.width;
    this.clone.wtTable.holder.style.width = this.clone.wtTable.holder.parentNode.style.width;
    if (scrollbarWidth === 0) {
      scrollbarWidth = 30;
    }
    this.clone.wtTable.holder.style.height = parseInt(this.clone.wtTable.holder.parentNode.style.height, 10) + scrollbarWidth + 'px';
  },
  applyToDOM: function() {
    var total = this.wot.getSetting('totalRows');
    if (!this.areElementSizesAdjusted) {
      this.adjustElementsSize();
    }
    if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
      this.spreader.style.top = this.wot.wtViewport.rowsRenderCalculator.startPosition + 'px';
    } else if (total === 0) {
      this.spreader.style.top = '0';
    } else {
      throw new Error('Incorrect value of the rowsRenderCalculator');
    }
    this.spreader.style.bottom = '';
    if (this.needFullRender) {
      this.syncOverlayOffset();
    }
  },
  syncOverlayOffset: function() {
    if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
      this.clone.wtTable.spreader.style.left = this.wot.wtViewport.columnsRenderCalculator.startPosition + 'px';
    } else {
      this.clone.wtTable.spreader.style.left = '';
    }
  },
  scrollTo: function(sourceRow, bottomEdge) {
    var newY = this.getTableParentOffset();
    var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
    var mainHolder = sourceInstance.wtTable.holder;
    var scrollbarCompensation = 0;
    if (bottomEdge && mainHolder.offsetHeight !== mainHolder.clientHeight) {
      scrollbarCompensation = getScrollbarWidth();
    }
    if (bottomEdge) {
      var fixedRowsBottom = this.wot.getSetting('fixedRowsBottom');
      var fixedRowsTop = this.wot.getSetting('fixedRowsTop');
      var totalRows = this.wot.getSetting('totalRows');
      newY += this.sumCellSizes(0, sourceRow + 1);
      newY -= this.wot.wtViewport.getViewportHeight() - this.sumCellSizes(totalRows - fixedRowsBottom, totalRows);
      newY += 1;
    } else {
      newY += this.sumCellSizes(this.wot.getSetting('fixedRowsTop'), sourceRow);
    }
    newY += scrollbarCompensation;
    this.setScrollPosition(newY);
  },
  getTableParentOffset: function() {
    if (this.mainTableScrollableElement === window) {
      return this.wot.wtTable.holderOffset.top;
    } else {
      return 0;
    }
  },
  getScrollPosition: function() {
    return getScrollTop(this.mainTableScrollableElement);
  },
  adjustHeaderBordersPosition: function(position) {
    if (this.wot.getSetting('fixedRowsTop') === 0 && this.wot.getSetting('columnHeaders').length > 0) {
      var masterParent = this.wot.wtTable.holder.parentNode;
      var previousState = hasClass(masterParent, 'innerBorderTop');
      if (position) {
        addClass(masterParent, 'innerBorderTop');
      } else {
        removeClass(masterParent, 'innerBorderTop');
      }
      if (!previousState && position || previousState && !position) {
        this.wot.wtOverlays.adjustElementsSize();
      }
    }
    if (this.wot.getSetting('rowHeaders').length === 0) {
      var secondHeaderCell = this.clone.wtTable.THEAD.querySelectorAll('th:nth-of-type(2)');
      if (secondHeaderCell) {
        for (var i = 0; i < secondHeaderCell.length; i++) {
          secondHeaderCell[i].style['border-left-width'] = 0;
        }
      }
    }
  }
}, {}, WalkontableOverlay);
;
window.WalkontableTopOverlay = WalkontableTopOverlay;
WalkontableOverlay.registerOverlay(WalkontableOverlay.CLONE_TOP, WalkontableTopOverlay);

//# 
},{"_base":10,"helpers/dom/element":36}],14:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableTopLeftCornerOverlay: {get: function() {
      return WalkontableTopLeftCornerOverlay;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___95_base__;
var $__0 = ($___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    outerHeight = $__0.outerHeight,
    outerWidth = $__0.outerWidth,
    setOverlayPosition = $__0.setOverlayPosition;
var WalkontableOverlay = ($___95_base__ = require("_base"), $___95_base__ && $___95_base__.__esModule && $___95_base__ || {default: $___95_base__}).WalkontableOverlay;
var WalkontableTopLeftCornerOverlay = function WalkontableTopLeftCornerOverlay(wotInstance) {
  $traceurRuntime.superConstructor($WalkontableTopLeftCornerOverlay).call(this, wotInstance);
  this.clone = this.makeClone(WalkontableOverlay.CLONE_TOP_LEFT_CORNER);
};
var $WalkontableTopLeftCornerOverlay = WalkontableTopLeftCornerOverlay;
($traceurRuntime.createClass)(WalkontableTopLeftCornerOverlay, {
  shouldBeRendered: function() {
    return (this.wot.getSetting('fixedRowsTop') || this.wot.getSetting('columnHeaders').length) && (this.wot.getSetting('fixedColumnsLeft') || this.wot.getSetting('rowHeaders').length) ? true : false;
  },
  resetFixedPosition: function() {
    if (!this.wot.wtTable.holder.parentNode) {
      return;
    }
    var overlayRoot = this.clone.wtTable.holder.parentNode;
    var tableHeight = outerHeight(this.clone.wtTable.TABLE);
    var tableWidth = outerWidth(this.clone.wtTable.TABLE);
    if (this.trimmingContainer === window) {
      var box = this.wot.wtTable.hider.getBoundingClientRect();
      var top = Math.ceil(box.top);
      var left = Math.ceil(box.left);
      var bottom = Math.ceil(box.bottom);
      var right = Math.ceil(box.right);
      var finalLeft;
      var finalTop;
      if (left < 0 && (right - overlayRoot.offsetWidth) > 0) {
        finalLeft = -left + 'px';
      } else {
        finalLeft = '0';
      }
      if (top < 0 && (bottom - overlayRoot.offsetHeight) > 0) {
        finalTop = -top + 'px';
      } else {
        finalTop = '0';
      }
      setOverlayPosition(overlayRoot, finalLeft, finalTop);
    }
    overlayRoot.style.height = (tableHeight === 0 ? tableHeight : tableHeight + 4) + 'px';
    overlayRoot.style.width = (tableWidth === 0 ? tableWidth : tableWidth + 4) + 'px';
  }
}, {}, WalkontableOverlay);
;
window.WalkontableTopLeftCornerOverlay = WalkontableTopLeftCornerOverlay;
WalkontableOverlay.registerOverlay(WalkontableOverlay.CLONE_TOP_LEFT_CORNER, WalkontableTopLeftCornerOverlay);

//# 
},{"_base":10,"helpers/dom/element":36}],15:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableOverlays: {get: function() {
      return WalkontableOverlays;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_helpers_47_unicode__,
    $___46__46__47__46__46__47__46__46__47_eventManager__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getScrollableElement = $__0.getScrollableElement,
    getScrollbarWidth = $__0.getScrollbarWidth,
    getScrollLeft = $__0.getScrollLeft,
    getScrollTop = $__0.getScrollTop;
var isKey = ($___46__46__47__46__46__47__46__46__47_helpers_47_unicode__ = require("helpers/unicode"), $___46__46__47__46__46__47__46__46__47_helpers_47_unicode__ && $___46__46__47__46__46__47__46__46__47_helpers_47_unicode__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_unicode__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_unicode__}).isKey;
var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager__}).EventManager;
var WalkontableOverlays = function WalkontableOverlays(wotInstance) {
  this.wot = wotInstance;
  this.instance = this.wot;
  this.eventManager = new EventManager(this.wot);
  this.wot.update('scrollbarWidth', getScrollbarWidth());
  this.wot.update('scrollbarHeight', getScrollbarWidth());
  this.mainTableScrollableElement = getScrollableElement(this.wot.wtTable.TABLE);
  this.topOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_TOP, this.wot);
  if (typeof WalkontableBottomOverlay === 'undefined') {
    this.bottomOverlay = {needFullRender: false};
  } else {
    this.bottomOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_BOTTOM, this.wot);
  }
  this.leftOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_LEFT, this.wot);
  if (this.topOverlay.needFullRender && this.leftOverlay.needFullRender) {
    this.topLeftCornerOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_TOP_LEFT_CORNER, this.wot);
  }
  if (this.bottomOverlay.needFullRender && this.leftOverlay.needFullRender && typeof WalkontableBottomLeftCornerOverlay !== 'undefined') {
    this.bottomLeftCornerOverlay = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER, this.wot);
  } else {
    this.bottomLeftCornerOverlay = {needFullRender: false};
  }
  if (this.wot.getSetting('debug')) {
    this.debug = WalkontableOverlay.createOverlay(WalkontableOverlay.CLONE_DEBUG, this.wot);
  }
  this.destroyed = false;
  this.keyPressed = false;
  this.spreaderLastSize = {
    width: null,
    height: null
  };
  this.overlayScrollPositions = {
    master: {
      top: 0,
      left: 0
    },
    top: {
      top: null,
      left: 0
    },
    bottom: {
      top: null,
      left: 0
    },
    left: {
      top: 0,
      left: null
    }
  };
  this.registerListeners();
};
($traceurRuntime.createClass)(WalkontableOverlays, {
  refreshAll: function() {
    if (!this.wot.drawn) {
      return;
    }
    if (!this.wot.wtTable.holder.parentNode) {
      this.destroy();
      return;
    }
    this.wot.draw(true);
    this.topOverlay.onScroll();
    this.leftOverlay.onScroll();
  },
  registerListeners: function() {
    var $__3 = this;
    this.eventManager.addEventListener(document.documentElement, 'keydown', (function(event) {
      return $__3.onKeyDown(event);
    }));
    this.eventManager.addEventListener(document.documentElement, 'keyup', (function() {
      return $__3.onKeyUp();
    }));
    this.eventManager.addEventListener(document, 'visibilitychange', (function() {
      return $__3.onKeyUp();
    }));
    this.eventManager.addEventListener(this.mainTableScrollableElement, 'scroll', (function(event) {
      return $__3.onTableScroll(event);
    }));
    if (this.topOverlay.needFullRender) {
      this.eventManager.addEventListener(this.topOverlay.clone.wtTable.holder, 'scroll', (function(event) {
        return $__3.onTableScroll(event);
      }));
      this.eventManager.addEventListener(this.topOverlay.clone.wtTable.holder, 'wheel', (function(event) {
        return $__3.onTableScroll(event);
      }));
    }
    if (this.bottomOverlay.needFullRender) {
      this.eventManager.addEventListener(this.bottomOverlay.clone.wtTable.holder, 'scroll', (function(event) {
        return $__3.onTableScroll(event);
      }));
      this.eventManager.addEventListener(this.bottomOverlay.clone.wtTable.holder, 'wheel', (function(event) {
        return $__3.onTableScroll(event);
      }));
    }
    if (this.leftOverlay.needFullRender) {
      this.eventManager.addEventListener(this.leftOverlay.clone.wtTable.holder, 'scroll', (function(event) {
        return $__3.onTableScroll(event);
      }));
      this.eventManager.addEventListener(this.leftOverlay.clone.wtTable.holder, 'wheel', (function(event) {
        return $__3.onTableScroll(event);
      }));
    }
    if (this.topOverlay.trimmingContainer !== window && this.leftOverlay.trimmingContainer !== window) {
      this.eventManager.addEventListener(window, 'wheel', (function(event) {
        var overlay;
        var deltaY = event.wheelDeltaY || event.deltaY;
        var deltaX = event.wheelDeltaX || event.deltaX;
        if ($__3.topOverlay.clone.wtTable.holder.contains(event.realTarget)) {
          overlay = 'top';
        } else if ($__3.bottomOverlay.clone && $__3.bottomOverlay.clone.wtTable.holder.contains(event.realTarget)) {
          overlay = 'bottom';
        } else if ($__3.leftOverlay.clone.wtTable.holder.contains(event.realTarget)) {
          overlay = 'left';
        }
        if (overlay == 'top' && deltaY !== 0) {
          event.preventDefault();
        } else if (overlay == 'left' && deltaX !== 0) {
          event.preventDefault();
        } else if (overlay == 'bottom' && deltaY !== 0) {
          event.preventDefault();
        }
      }));
    }
  },
  onTableScroll: function(event) {
    if (Handsontable.mobileBrowser) {
      return;
    }
    if (this.keyPressed && this.mainTableScrollableElement !== window && !event.target.contains(this.mainTableScrollableElement)) {
      return;
    }
    if (event.type === 'scroll') {
      this.syncScrollPositions(event);
      var wtRenderer = new WalkontableTableRenderer(this.instance.wtTable);
      wtRenderer.refreshRowHeaders();
    } else {
      this.translateMouseWheelToScroll(event);
    }
  },
  onKeyDown: function(event) {
    this.keyPressed = isKey(event.keyCode, 'ARROW_UP|ARROW_RIGHT|ARROW_DOWN|ARROW_LEFT');
  },
  onKeyUp: function() {
    this.keyPressed = false;
  },
  translateMouseWheelToScroll: function(event) {
    var topOverlay = this.topOverlay.clone.wtTable.holder;
    var bottomOverlay = this.bottomOverlay.clone ? this.bottomOverlay.clone.wtTable.holder : null;
    var leftOverlay = this.leftOverlay.clone.wtTable.holder;
    var eventMockup = {type: 'wheel'};
    var tempElem = event.target;
    var deltaY = event.wheelDeltaY || (-1) * event.deltaY;
    var deltaX = event.wheelDeltaX || (-1) * event.deltaX;
    var parentHolder;
    while (tempElem != document && tempElem != null) {
      if (tempElem.className.indexOf('wtHolder') > -1) {
        parentHolder = tempElem;
        break;
      }
      tempElem = tempElem.parentNode;
    }
    eventMockup.target = parentHolder;
    if (parentHolder == topOverlay) {
      this.syncScrollPositions(eventMockup, (-0.2) * deltaY);
    } else if (parentHolder == bottomOverlay) {
      this.syncScrollPositions(eventMockup, (-0.2) * deltaY);
    } else if (parentHolder == leftOverlay) {
      this.syncScrollPositions(eventMockup, (-0.2) * deltaX);
    }
    return false;
  },
  syncScrollPositions: function(event) {
    var fakeScrollValue = arguments[1] !== (void 0) ? arguments[1] : null;
    if (this.destroyed) {
      return;
    }
    if (arguments.length === 0) {
      this.syncScrollWithMaster();
      return;
    }
    var master = this.mainTableScrollableElement;
    var target = event.target;
    var tempScrollValue = 0;
    var scrollValueChanged = false;
    var topOverlay;
    var leftOverlay;
    var bottomOverlay;
    if (this.topOverlay.needFullRender) {
      topOverlay = this.topOverlay.clone.wtTable.holder;
    }
    if (this.bottomOverlay.needFullRender) {
      bottomOverlay = this.bottomOverlay.clone.wtTable.holder;
    }
    if (this.leftOverlay.needFullRender) {
      leftOverlay = this.leftOverlay.clone.wtTable.holder;
    }
    if (target === document) {
      target = window;
    }
    if (target === master) {
      tempScrollValue = getScrollLeft(target);
      if (this.overlayScrollPositions.master.left !== tempScrollValue) {
        this.overlayScrollPositions.master.left = tempScrollValue;
        scrollValueChanged = true;
        if (topOverlay) {
          topOverlay.scrollLeft = tempScrollValue;
        }
        if (bottomOverlay) {
          bottomOverlay.scrollLeft = tempScrollValue;
        }
      }
      tempScrollValue = getScrollTop(target);
      if (this.overlayScrollPositions.master.top !== tempScrollValue) {
        this.overlayScrollPositions.master.top = tempScrollValue;
        scrollValueChanged = true;
        if (leftOverlay) {
          leftOverlay.scrollTop = tempScrollValue;
        }
      }
    } else if (target === bottomOverlay) {
      tempScrollValue = getScrollLeft(target);
      if (this.overlayScrollPositions.bottom.left !== tempScrollValue) {
        this.overlayScrollPositions.bottom.left = tempScrollValue;
        scrollValueChanged = true;
        master.scrollLeft = tempScrollValue;
      }
      if (fakeScrollValue !== null) {
        scrollValueChanged = true;
        master.scrollTop += fakeScrollValue;
      }
    } else if (target === topOverlay) {
      tempScrollValue = getScrollLeft(target);
      if (this.overlayScrollPositions.top.left !== tempScrollValue) {
        this.overlayScrollPositions.top.left = tempScrollValue;
        scrollValueChanged = true;
        master.scrollLeft = tempScrollValue;
      }
      if (fakeScrollValue !== null) {
        scrollValueChanged = true;
        master.scrollTop += fakeScrollValue;
      }
    } else if (target === leftOverlay) {
      tempScrollValue = getScrollTop(target);
      if (this.overlayScrollPositions.left.top !== tempScrollValue) {
        this.overlayScrollPositions.left.top = tempScrollValue;
        scrollValueChanged = true;
        master.scrollTop = tempScrollValue;
      }
      if (fakeScrollValue !== null) {
        scrollValueChanged = true;
        master.scrollLeft += fakeScrollValue;
      }
    }
    if (!this.keyPressed && scrollValueChanged && event.type === 'scroll') {
      this.refreshAll();
    }
  },
  syncScrollWithMaster: function() {
    var master = this.topOverlay.mainTableScrollableElement;
    if (this.topOverlay.needFullRender) {
      this.topOverlay.clone.wtTable.holder.scrollLeft = master.scrollLeft;
    }
    if (this.leftOverlay.needFullRender) {
      this.leftOverlay.clone.wtTable.holder.scrollTop = master.scrollTop;
    }
  },
  destroy: function() {
    this.eventManager.destroy();
    this.topOverlay.destroy();
    if (this.bottomOverlay.clone) {
      this.bottomOverlay.destroy();
    }
    this.leftOverlay.destroy();
    if (this.topLeftCornerOverlay) {
      this.topLeftCornerOverlay.destroy();
    }
    if (this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone) {
      this.bottomLeftCornerOverlay.destroy();
    }
    if (this.debug) {
      this.debug.destroy();
    }
    this.destroyed = true;
  },
  refresh: function() {
    var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
    if (this.topOverlay.areElementSizesAdjusted && this.leftOverlay.areElementSizesAdjusted) {
      var container = this.wot.wtTable.wtRootElement.parentNode || this.wot.wtTable.wtRootElement;
      var width = container.clientWidth;
      var height = container.clientHeight;
      if (width !== this.spreaderLastSize.width || height !== this.spreaderLastSize.height) {
        this.spreaderLastSize.width = width;
        this.spreaderLastSize.height = height;
        this.adjustElementsSize();
      }
    }
    if (this.bottomOverlay.clone) {
      this.bottomOverlay.refresh(fastDraw);
    }
    this.leftOverlay.refresh(fastDraw);
    this.topOverlay.refresh(fastDraw);
    if (this.topLeftCornerOverlay) {
      this.topLeftCornerOverlay.refresh(fastDraw);
    }
    if (this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone) {
      this.bottomLeftCornerOverlay.refresh(fastDraw);
    }
    if (this.debug) {
      this.debug.refresh(fastDraw);
    }
  },
  adjustElementsSize: function() {
    var force = arguments[0] !== (void 0) ? arguments[0] : false;
    var totalColumns = this.wot.getSetting('totalColumns');
    var totalRows = this.wot.getSetting('totalRows');
    var headerRowSize = this.wot.wtViewport.getRowHeaderWidth();
    var headerColumnSize = this.wot.wtViewport.getColumnHeaderHeight();
    var hiderStyle = this.wot.wtTable.hider.style;
    hiderStyle.width = (headerRowSize + this.leftOverlay.sumCellSizes(0, totalColumns)) + 'px';
    hiderStyle.height = (headerColumnSize + this.topOverlay.sumCellSizes(0, totalRows) + 1) + 'px';
    this.topOverlay.adjustElementsSize(force);
    this.leftOverlay.adjustElementsSize(force);
    if (this.bottomOverlay.clone) {
      this.bottomOverlay.adjustElementsSize(force);
    }
  },
  applyToDOM: function() {
    if (!this.topOverlay.areElementSizesAdjusted || !this.leftOverlay.areElementSizesAdjusted) {
      this.adjustElementsSize();
    }
    this.topOverlay.applyToDOM();
    if (this.bottomOverlay.clone) {
      this.bottomOverlay.applyToDOM();
    }
    this.leftOverlay.applyToDOM();
  }
}, {});
;
window.WalkontableOverlays = WalkontableOverlays;

//# 
},{"eventManager":32,"helpers/dom/element":36,"helpers/unicode":44}],16:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableScroll: {get: function() {
      return WalkontableScroll;
    }},
  __esModule: {value: true}
});
var WalkontableScroll = function WalkontableScroll(wotInstance) {
  this.wot = wotInstance;
  this.instance = wotInstance;
};
($traceurRuntime.createClass)(WalkontableScroll, {scrollViewport: function(coords) {
    if (!this.wot.drawn) {
      return;
    }
    var totalRows = this.wot.getSetting('totalRows');
    var totalColumns = this.wot.getSetting('totalColumns');
    var fixedRowsTop = this.instance.getSetting('fixedRowsTop');
    var fixedRowsBottom = this.instance.getSetting('fixedRowsBottom');
    var fixedColumnsLeft = this.instance.getSetting('fixedColumnsLeft');
    if (coords.row < 0 || coords.row > totalRows - 1) {
      throw new Error('row ' + coords.row + ' does not exist');
    }
    if (coords.col < 0 || coords.col > totalColumns - 1) {
      throw new Error('column ' + coords.col + ' does not exist');
    }
    if (coords.row > this.instance.wtTable.getLastVisibleRow() && coords.row < totalRows - fixedRowsBottom) {
      this.wot.wtOverlays.topOverlay.scrollTo(coords.row, true);
    } else if (coords.row >= fixedRowsTop && coords.row < this.instance.wtTable.getFirstVisibleRow()) {
      this.wot.wtOverlays.topOverlay.scrollTo(coords.row);
    }
    if (coords.col > this.instance.wtTable.getLastVisibleColumn()) {
      this.wot.wtOverlays.leftOverlay.scrollTo(coords.col, true);
    } else if (coords.col >= fixedColumnsLeft && coords.col < this.instance.wtTable.getFirstVisibleColumn()) {
      this.wot.wtOverlays.leftOverlay.scrollTo(coords.col);
    }
  }}, {});
;
window.WalkontableScroll = WalkontableScroll;

//# 
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableSelection: {get: function() {
      return WalkontableSelection;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $__border__,
    $__cell_47_coords__,
    $__cell_47_range__;
var addClass = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}).addClass;
var WalkontableBorder = ($__border__ = require("border"), $__border__ && $__border__.__esModule && $__border__ || {default: $__border__}).WalkontableBorder;
var WalkontableCellCoords = ($__cell_47_coords__ = require("cell/coords"), $__cell_47_coords__ && $__cell_47_coords__.__esModule && $__cell_47_coords__ || {default: $__cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = ($__cell_47_range__ = require("cell/range"), $__cell_47_range__ && $__cell_47_range__.__esModule && $__cell_47_range__ || {default: $__cell_47_range__}).WalkontableCellRange;
var WalkontableSelection = function WalkontableSelection(settings, cellRange) {
  this.settings = settings;
  this.cellRange = cellRange || null;
  this.instanceBorders = {};
};
($traceurRuntime.createClass)(WalkontableSelection, {
  getBorder: function(wotInstance) {
    if (this.instanceBorders[wotInstance.guid]) {
      return this.instanceBorders[wotInstance.guid];
    }
    this.instanceBorders[wotInstance.guid] = new WalkontableBorder(wotInstance, this.settings);
  },
  isEmpty: function() {
    return this.cellRange === null;
  },
  add: function(coords) {
    if (this.isEmpty()) {
      this.cellRange = new WalkontableCellRange(coords, coords, coords);
    } else {
      this.cellRange.expand(coords);
    }
  },
  replace: function(oldCoords, newCoords) {
    if (!this.isEmpty()) {
      if (this.cellRange.from.isEqual(oldCoords)) {
        this.cellRange.from = newCoords;
        return true;
      }
      if (this.cellRange.to.isEqual(oldCoords)) {
        this.cellRange.to = newCoords;
        return true;
      }
    }
    return false;
  },
  clear: function() {
    this.cellRange = null;
  },
  getCorners: function() {
    var topLeft = this.cellRange.getTopLeftCorner();
    var bottomRight = this.cellRange.getBottomRightCorner();
    return [topLeft.row, topLeft.col, bottomRight.row, bottomRight.col];
  },
  addClassAtCoords: function(wotInstance, sourceRow, sourceColumn, className) {
    var TD = wotInstance.wtTable.getCell(new WalkontableCellCoords(sourceRow, sourceColumn));
    if (typeof TD === 'object') {
      addClass(TD, className);
    }
  },
  draw: function(wotInstance) {
    if (this.isEmpty()) {
      if (this.settings.border) {
        var border = this.getBorder(wotInstance);
        if (border) {
          border.disappear();
        }
      }
      return;
    }
    var renderedRows = wotInstance.wtTable.getRenderedRowsCount();
    var renderedColumns = wotInstance.wtTable.getRenderedColumnsCount();
    var corners = this.getCorners();
    var sourceRow,
        sourceCol,
        TH;
    for (var column = 0; column < renderedColumns; column++) {
      sourceCol = wotInstance.wtTable.columnFilter.renderedToSource(column);
      if (sourceCol >= corners[1] && sourceCol <= corners[3]) {
        TH = wotInstance.wtTable.getColumnHeader(sourceCol);
        if (TH && this.settings.highlightColumnClassName) {
          addClass(TH, this.settings.highlightColumnClassName);
        }
      }
    }
    for (var row = 0; row < renderedRows; row++) {
      sourceRow = wotInstance.wtTable.rowFilter.renderedToSource(row);
      if (sourceRow >= corners[0] && sourceRow <= corners[2]) {
        TH = wotInstance.wtTable.getRowHeader(sourceRow);
        if (TH && this.settings.highlightRowClassName) {
          addClass(TH, this.settings.highlightRowClassName);
        }
      }
      for (var column$__5 = 0; column$__5 < renderedColumns; column$__5++) {
        sourceCol = wotInstance.wtTable.columnFilter.renderedToSource(column$__5);
        if (sourceRow >= corners[0] && sourceRow <= corners[2] && sourceCol >= corners[1] && sourceCol <= corners[3]) {
          if (this.settings.className) {
            this.addClassAtCoords(wotInstance, sourceRow, sourceCol, this.settings.className);
          }
        } else if (sourceRow >= corners[0] && sourceRow <= corners[2]) {
          if (this.settings.highlightRowClassName) {
            this.addClassAtCoords(wotInstance, sourceRow, sourceCol, this.settings.highlightRowClassName);
          }
        } else if (sourceCol >= corners[1] && sourceCol <= corners[3]) {
          if (this.settings.highlightColumnClassName) {
            this.addClassAtCoords(wotInstance, sourceRow, sourceCol, this.settings.highlightColumnClassName);
          }
        }
      }
    }
    wotInstance.getSetting('onBeforeDrawBorders', corners, this.settings.className);
    if (this.settings.border) {
      var border$__6 = this.getBorder(wotInstance);
      if (border$__6) {
        border$__6.appear(corners);
      }
    }
  }
}, {});
;
window.WalkontableSelection = WalkontableSelection;

//# 
},{"border":1,"cell/coords":4,"cell/range":5,"helpers/dom/element":36}],18:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableSettings: {get: function() {
      return WalkontableSettings;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__;
var fastInnerText = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}).fastInnerText;
var WalkontableSettings = function WalkontableSettings(wotInstance, settings) {
  var $__1 = this;
  this.wot = wotInstance;
  this.instance = wotInstance;
  this.defaults = {
    table: void 0,
    debug: false,
    externalRowCalculator: false,
    stretchH: 'none',
    currentRowClassName: null,
    currentColumnClassName: null,
    data: void 0,
    fixedColumnsLeft: 0,
    fixedRowsTop: 0,
    fixedRowsBottom: 0,
    minSpareRows: 0,
    rowHeaders: function() {
      return [];
    },
    columnHeaders: function() {
      return [];
    },
    totalRows: void 0,
    totalColumns: void 0,
    cellRenderer: (function(row, column, TD) {
      var cellData = $__1.getSetting('data', row, column);
      fastInnerText(TD, cellData === void 0 || cellData === null ? '' : cellData);
    }),
    columnWidth: function(col) {
      return;
    },
    rowHeight: function(row) {
      return;
    },
    defaultRowHeight: 23,
    defaultColumnWidth: 50,
    selections: null,
    hideBorderOnMouseDownOver: false,
    viewportRowCalculatorOverride: null,
    viewportColumnCalculatorOverride: null,
    onCellMouseDown: null,
    onCellMouseOver: null,
    onCellDblClick: null,
    onCellCornerMouseDown: null,
    onCellCornerDblClick: null,
    beforeDraw: null,
    onDraw: null,
    onBeforeDrawBorders: null,
    onScrollVertically: null,
    onScrollHorizontally: null,
    onBeforeTouchScroll: null,
    onAfterMomentumScroll: null,
    scrollbarWidth: 10,
    scrollbarHeight: 10,
    renderAllRows: false,
    groups: false
  };
  this.settings = {};
  for (var i in this.defaults) {
    if (this.defaults.hasOwnProperty(i)) {
      if (settings[i] !== void 0) {
        this.settings[i] = settings[i];
      } else if (this.defaults[i] === void 0) {
        throw new Error('A required setting "' + i + '" was not provided');
      } else {
        this.settings[i] = this.defaults[i];
      }
    }
  }
};
($traceurRuntime.createClass)(WalkontableSettings, {
  update: function(settings, value) {
    if (value === void 0) {
      for (var i in settings) {
        if (settings.hasOwnProperty(i)) {
          this.settings[i] = settings[i];
        }
      }
    } else {
      this.settings[settings] = value;
    }
    return this.wot;
  },
  getSetting: function(key, param1, param2, param3, param4) {
    if (typeof this.settings[key] === 'function') {
      return this.settings[key](param1, param2, param3, param4);
    } else if (param1 !== void 0 && Array.isArray(this.settings[key])) {
      return this.settings[key][param1];
    } else {
      return this.settings[key];
    }
  },
  has: function(key) {
    return !!this.settings[key];
  }
}, {});
;
window.WalkontableSettings = WalkontableSettings;

//# 
},{"helpers/dom/element":36}],19:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableTable: {get: function() {
      return WalkontableTable;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $__cell_47_coords__,
    $__cell_47_range__,
    $__filter_47_column__,
    $__filter_47_row__,
    $__tableRenderer__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getStyle = $__0.getStyle,
    getTrimmingContainer = $__0.getTrimmingContainer,
    hasClass = $__0.hasClass,
    index = $__0.index,
    offset = $__0.offset,
    removeClass = $__0.removeClass,
    removeTextNodes = $__0.removeTextNodes,
    overlayContainsElement = $__0.overlayContainsElement;
var WalkontableCellCoords = ($__cell_47_coords__ = require("cell/coords"), $__cell_47_coords__ && $__cell_47_coords__.__esModule && $__cell_47_coords__ || {default: $__cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = ($__cell_47_range__ = require("cell/range"), $__cell_47_range__ && $__cell_47_range__.__esModule && $__cell_47_range__ || {default: $__cell_47_range__}).WalkontableCellRange;
var WalkontableColumnFilter = ($__filter_47_column__ = require("filter/column"), $__filter_47_column__ && $__filter_47_column__.__esModule && $__filter_47_column__ || {default: $__filter_47_column__}).WalkontableColumnFilter;
var WalkontableRowFilter = ($__filter_47_row__ = require("filter/row"), $__filter_47_row__ && $__filter_47_row__.__esModule && $__filter_47_row__ || {default: $__filter_47_row__}).WalkontableRowFilter;
var WalkontableTableRenderer = ($__tableRenderer__ = require("tableRenderer"), $__tableRenderer__ && $__tableRenderer__.__esModule && $__tableRenderer__ || {default: $__tableRenderer__}).WalkontableTableRenderer;
var WalkontableTable = function WalkontableTable(wotInstance, table) {
  this.wot = wotInstance;
  this.instance = this.wot;
  this.TABLE = table;
  this.TBODY = null;
  this.THEAD = null;
  this.COLGROUP = null;
  this.tableOffset = 0;
  this.holderOffset = 0;
  removeTextNodes(this.TABLE);
  this.spreader = this.createSpreader(this.TABLE);
  this.hider = this.createHider(this.spreader);
  this.holder = this.createHolder(this.hider);
  this.wtRootElement = this.holder.parentNode;
  this.alignOverlaysWithTrimmingContainer();
  this.fixTableDomTree();
  this.colgroupChildrenLength = this.COLGROUP.childNodes.length;
  this.theadChildrenLength = this.THEAD.firstChild ? this.THEAD.firstChild.childNodes.length : 0;
  this.tbodyChildrenLength = this.TBODY.childNodes.length;
  this.rowFilter = null;
  this.columnFilter = null;
};
($traceurRuntime.createClass)(WalkontableTable, {
  fixTableDomTree: function() {
    this.TBODY = this.TABLE.querySelector('tbody');
    if (!this.TBODY) {
      this.TBODY = document.createElement('tbody');
      this.TABLE.appendChild(this.TBODY);
    }
    this.THEAD = this.TABLE.querySelector('thead');
    if (!this.THEAD) {
      this.THEAD = document.createElement('thead');
      this.TABLE.insertBefore(this.THEAD, this.TBODY);
    }
    this.COLGROUP = this.TABLE.querySelector('colgroup');
    if (!this.COLGROUP) {
      this.COLGROUP = document.createElement('colgroup');
      this.TABLE.insertBefore(this.COLGROUP, this.THEAD);
    }
    if (this.wot.getSetting('columnHeaders').length && !this.THEAD.childNodes.length) {
      this.THEAD.appendChild(document.createElement('TR'));
    }
  },
  createSpreader: function(table) {
    var parent = table.parentNode;
    var spreader;
    if (!parent || parent.nodeType !== 1 || !hasClass(parent, 'wtHolder')) {
      spreader = document.createElement('div');
      spreader.className = 'wtSpreader';
      if (parent) {
        parent.insertBefore(spreader, table);
      }
      spreader.appendChild(table);
    }
    spreader.style.position = 'relative';
    return spreader;
  },
  createHider: function(spreader) {
    var parent = spreader.parentNode;
    var hider;
    if (!parent || parent.nodeType !== 1 || !hasClass(parent, 'wtHolder')) {
      hider = document.createElement('div');
      hider.className = 'wtHider';
      if (parent) {
        parent.insertBefore(hider, spreader);
      }
      hider.appendChild(spreader);
    }
    return hider;
  },
  createHolder: function(hider) {
    var parent = hider.parentNode;
    var holder;
    if (!parent || parent.nodeType !== 1 || !hasClass(parent, 'wtHolder')) {
      holder = document.createElement('div');
      holder.style.position = 'relative';
      holder.className = 'wtHolder';
      if (parent) {
        parent.insertBefore(holder, hider);
      }
      if (!this.isWorkingOnClone()) {
        holder.parentNode.className += 'ht_master handsontable';
      }
      holder.appendChild(hider);
    }
    return holder;
  },
  alignOverlaysWithTrimmingContainer: function() {
    var trimmingElement = getTrimmingContainer(this.wtRootElement);
    if (!this.isWorkingOnClone()) {
      this.holder.parentNode.style.position = 'relative';
      if (trimmingElement === window) {
        this.holder.style.overflow = 'visible';
        this.wtRootElement.style.overflow = 'visible';
      } else {
        this.holder.style.width = getStyle(trimmingElement, 'width');
        this.holder.style.height = getStyle(trimmingElement, 'height');
        this.holder.style.overflow = '';
      }
    }
  },
  isWorkingOnClone: function() {
    return !!this.wot.cloneSource;
  },
  draw: function(fastDraw) {
    var totalRows = this.instance.getSetting('totalRows');
    if (!this.isWorkingOnClone()) {
      this.holderOffset = offset(this.holder);
      fastDraw = this.wot.wtViewport.createRenderCalculators(fastDraw);
    }
    if (fastDraw) {
      if (!this.isWorkingOnClone()) {
        this.wot.wtViewport.createVisibleCalculators();
      }
      if (this.wot.wtOverlays) {
        this.wot.wtOverlays.refresh(true);
      }
    } else {
      if (this.isWorkingOnClone()) {
        this.tableOffset = this.wot.cloneSource.wtTable.tableOffset;
      } else {
        this.tableOffset = offset(this.TABLE);
      }
      var startRow;
      if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER)) {
        startRow = 0;
      } else if (WalkontableOverlay.isOverlayTypeOf(this.instance.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.instance.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
        startRow = totalRows - this.wot.getSetting('fixedRowsBottom');
      } else {
        startRow = this.wot.wtViewport.rowsRenderCalculator.startRow;
      }
      var startColumn;
      if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_LEFT) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
        startColumn = 0;
      } else {
        startColumn = this.wot.wtViewport.columnsRenderCalculator.startColumn;
      }
      this.rowFilter = new WalkontableRowFilter(startRow, totalRows, this.wot.getSetting('columnHeaders').length);
      this.columnFilter = new WalkontableColumnFilter(startColumn, this.wot.getSetting('totalColumns'), this.wot.getSetting('rowHeaders').length);
      this._doDraw();
      this.alignOverlaysWithTrimmingContainer();
    }
    this.refreshSelections(fastDraw);
    if (!this.isWorkingOnClone()) {
      this.wot.wtOverlays.topOverlay.resetFixedPosition();
      if (this.wot.wtOverlays.bottomOverlay.clone) {
        this.wot.wtOverlays.bottomOverlay.resetFixedPosition();
      }
      this.wot.wtOverlays.leftOverlay.resetFixedPosition();
      if (this.wot.wtOverlays.topLeftCornerOverlay) {
        this.wot.wtOverlays.topLeftCornerOverlay.resetFixedPosition();
      }
      if (this.instance.wtOverlays.bottomLeftCornerOverlay && this.instance.wtOverlays.bottomLeftCornerOverlay.clone) {
        this.wot.wtOverlays.bottomLeftCornerOverlay.resetFixedPosition();
      }
    }
    this.wot.drawn = true;
    return this;
  },
  _doDraw: function() {
    var wtRenderer = new WalkontableTableRenderer(this);
    wtRenderer.render();
  },
  removeClassFromCells: function(className) {
    var nodes = this.TABLE.querySelectorAll('.' + className);
    for (var i = 0,
        len = nodes.length; i < len; i++) {
      removeClass(nodes[i], className);
    }
  },
  refreshSelections: function(fastDraw) {
    if (!this.wot.selections) {
      return;
    }
    var len = this.wot.selections.length;
    if (fastDraw) {
      for (var i = 0; i < len; i++) {
        if (this.wot.selections[i].settings.className) {
          this.removeClassFromCells(this.wot.selections[i].settings.className);
        }
        if (this.wot.selections[i].settings.highlightRowClassName) {
          this.removeClassFromCells(this.wot.selections[i].settings.highlightRowClassName);
        }
        if (this.wot.selections[i].settings.highlightColumnClassName) {
          this.removeClassFromCells(this.wot.selections[i].settings.highlightColumnClassName);
        }
      }
    }
    for (var i$__7 = 0; i$__7 < len; i$__7++) {
      this.wot.selections[i$__7].draw(this.wot, fastDraw);
    }
  },
  getCell: function(coords) {
    if (this.isRowBeforeRenderedRows(coords.row)) {
      return -1;
    } else if (this.isRowAfterRenderedRows(coords.row)) {
      return -2;
    }
    var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(coords.row)];
    if (TR) {
      return TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(coords.col)];
    }
  },
  getColumnHeader: function(col) {
    var level = arguments[1] !== (void 0) ? arguments[1] : 0;
    var TR = this.THEAD.childNodes[level];
    if (TR) {
      return TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(col)];
    }
  },
  getRowHeader: function(row) {
    if (this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0) === 0) {
      return null;
    }
    var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
    if (TR) {
      return TR.childNodes[0];
    }
  },
  getCoords: function(TD) {
    var TR = TD.parentNode;
    var row = index(TR);
    if (TR.parentNode === this.THEAD) {
      row = this.rowFilter.visibleColHeadedRowToSourceRow(row);
    } else {
      row = this.rowFilter.renderedToSource(row);
    }
    var col = this.columnFilter.visibleRowHeadedColumnToSourceColumn(TD.cellIndex);
    return new WalkontableCellCoords(row, col);
  },
  getTrForRow: function(row) {
    return this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
  },
  getFirstRenderedRow: function() {
    return this.wot.wtViewport.rowsRenderCalculator.startRow;
  },
  getFirstVisibleRow: function() {
    return this.wot.wtViewport.rowsVisibleCalculator.startRow;
  },
  getFirstRenderedColumn: function() {
    return this.wot.wtViewport.columnsRenderCalculator.startColumn;
  },
  getFirstVisibleColumn: function() {
    return this.wot.wtViewport.columnsVisibleCalculator.startColumn;
  },
  getLastRenderedRow: function() {
    return this.wot.wtViewport.rowsRenderCalculator.endRow;
  },
  getLastVisibleRow: function() {
    return this.wot.wtViewport.rowsVisibleCalculator.endRow;
  },
  getLastRenderedColumn: function() {
    return this.wot.wtViewport.columnsRenderCalculator.endColumn;
  },
  getLastVisibleColumn: function() {
    return this.wot.wtViewport.columnsVisibleCalculator.endColumn;
  },
  isRowBeforeRenderedRows: function(row) {
    return (this.rowFilter.sourceToRendered(row) < 0 && row >= 0);
  },
  isRowAfterViewport: function(row) {
    return (this.rowFilter.sourceToRendered(row) > this.getLastVisibleRow());
  },
  isRowAfterRenderedRows: function(row) {
    return (this.rowFilter.sourceToRendered(row) > this.getLastRenderedRow());
  },
  isColumnBeforeViewport: function(column) {
    return this.columnFilter.sourceToRendered(column) < 0 && column >= 0;
  },
  isColumnAfterViewport: function(column) {
    return (this.columnFilter.sourceToRendered(column) > this.getLastVisibleColumn());
  },
  isLastRowFullyVisible: function() {
    return this.getLastVisibleRow() === this.getLastRenderedRow();
  },
  isLastColumnFullyVisible: function() {
    return this.getLastVisibleColumn() === this.getLastRenderedColumn();
  },
  getRenderedColumnsCount: function() {
    if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG)) {
      return this.wot.getSetting('totalColumns');
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_LEFT) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
      return this.wot.getSetting('fixedColumnsLeft');
    } else {
      return this.wot.wtViewport.columnsRenderCalculator.count;
    }
  },
  getRenderedRowsCount: function() {
    if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_DEBUG)) {
      return this.wot.getSetting('totalRows');
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER)) {
      return this.wot.getSetting('fixedRowsTop');
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
      return this.instance.getSetting('fixedRowsBottom');
    }
    return this.wot.wtViewport.rowsRenderCalculator.count;
  },
  getVisibleRowsCount: function() {
    return this.wot.wtViewport.rowsVisibleCalculator.count;
  },
  allRowsInViewport: function() {
    return this.wot.getSetting('totalRows') == this.getVisibleRowsCount();
  },
  getRowHeight: function(sourceRow) {
    var height = this.wot.wtSettings.settings.rowHeight(sourceRow);
    var oversizedHeight = this.wot.wtViewport.oversizedRows[sourceRow];
    if (oversizedHeight !== void 0) {
      height = height ? Math.max(height, oversizedHeight) : oversizedHeight;
    }
    return height;
  },
  getColumnHeaderHeight: function(level) {
    var height = this.wot.wtSettings.settings.defaultRowHeight;
    var oversizedHeight = this.wot.wtViewport.oversizedColumnHeaders[level];
    if (oversizedHeight !== void 0) {
      height = height ? Math.max(height, oversizedHeight) : oversizedHeight;
    }
    return height;
  },
  getVisibleColumnsCount: function() {
    return this.wot.wtViewport.columnsVisibleCalculator.count;
  },
  allColumnsInViewport: function() {
    return this.wot.getSetting('totalColumns') == this.getVisibleColumnsCount();
  },
  getColumnWidth: function(sourceColumn) {
    var width = this.wot.wtSettings.settings.columnWidth;
    if (typeof width === 'function') {
      width = width(sourceColumn);
    } else if (typeof width === 'object') {
      width = width[sourceColumn];
    }
    return width || this.wot.wtSettings.settings.defaultColumnWidth;
  },
  getStretchedColumnWidth: function(sourceColumn) {
    var columnWidth = this.getColumnWidth(sourceColumn);
    var width = [void 0, null].indexOf(columnWidth) === -1 ? columnWidth : this.instance.wtSettings.settings.defaultColumnWidth;
    var calculator = this.wot.wtViewport.columnsRenderCalculator;
    if (calculator) {
      var stretchedWidth = calculator.getStretchedColumnWidth(sourceColumn, width);
      if (stretchedWidth) {
        width = stretchedWidth;
      }
    }
    return width;
  }
}, {});
;
window.WalkontableTable = WalkontableTable;

//# 
},{"cell/coords":4,"cell/range":5,"filter/column":8,"filter/row":9,"helpers/dom/element":36,"tableRenderer":20}],20:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableTableRenderer: {get: function() {
      return WalkontableTableRenderer;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    empty = $__0.empty,
    getScrollbarWidth = $__0.getScrollbarWidth,
    hasClass = $__0.hasClass,
    innerHeight = $__0.innerHeight;
var WalkontableTableRenderer = function WalkontableTableRenderer(wtTable) {
  this.wtTable = wtTable;
  this.wot = wtTable.instance;
  this.instance = wtTable.instance;
  this.rowFilter = wtTable.rowFilter;
  this.columnFilter = wtTable.columnFilter;
  this.TABLE = wtTable.TABLE;
  this.THEAD = wtTable.THEAD;
  this.TBODY = wtTable.TBODY;
  this.COLGROUP = wtTable.COLGROUP;
  this.rowHeaders = [];
  this.rowHeaderCount = 0;
  this.columnHeaders = [];
  this.columnHeaderCount = 0;
  this.fixedRowsTop = 0;
  this.fixedRowsBottom = 0;
};
($traceurRuntime.createClass)(WalkontableTableRenderer, {
  render: function() {
    if (!this.wtTable.isWorkingOnClone()) {
      this.wot.getSetting('beforeDraw', true);
    }
    this.rowHeaders = this.wot.getSetting('rowHeaders');
    this.rowHeaderCount = this.rowHeaders.length;
    this.fixedRowsTop = this.wot.getSetting('fixedRowsTop');
    this.fixedRowsBottom = this.wot.getSetting('fixedRowsBottom');
    this.columnHeaders = this.wot.getSetting('columnHeaders');
    this.columnHeaderCount = this.columnHeaders.length;
    var columnsToRender = this.wtTable.getRenderedColumnsCount();
    var rowsToRender = this.wtTable.getRenderedRowsCount();
    var totalColumns = this.wot.getSetting('totalColumns');
    var totalRows = this.wot.getSetting('totalRows');
    var workspaceWidth;
    var adjusted = false;
    if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
      this.columnHeaders = [];
      this.columnHeaderCount = 0;
    }
    if (totalColumns > 0) {
      this.adjustAvailableNodes();
      adjusted = true;
      if (!Handsontable.noRefresh) {
        this.renderColumnHeaders();
        this.renderRows(totalRows, rowsToRender, columnsToRender);
      }
      if (!this.wtTable.isWorkingOnClone()) {
        workspaceWidth = this.wot.wtViewport.getWorkspaceWidth();
        this.wot.wtViewport.containerWidth = null;
      }
      this.adjustColumnHeaderHeights();
      this.adjustColumnWidths(columnsToRender);
      this.markOversizedColumns();
    }
    if (!adjusted) {
      this.adjustAvailableNodes();
    }
    this.removeRedundantRows(rowsToRender);
    if (!this.wtTable.isWorkingOnClone()) {
      this.markOversizedRows();
      this.wot.wtViewport.createVisibleCalculators();
      this.wot.wtOverlays.refresh(false);
      this.wot.wtOverlays.applyToDOM();
      if (workspaceWidth !== this.wot.wtViewport.getWorkspaceWidth()) {
        this.wot.wtViewport.containerWidth = null;
        var firstRendered = this.wtTable.getFirstRenderedColumn();
        var lastRendered = this.wtTable.getLastRenderedColumn();
        for (var i = firstRendered; i < lastRendered; i++) {
          var width = this.wtTable.getStretchedColumnWidth(i);
          var renderedIndex = this.columnFilter.sourceToRendered(i);
          this.COLGROUP.childNodes[renderedIndex + this.rowHeaderCount].style.width = width + 'px';
        }
      }
      this.wot.getSetting('onDraw', true);
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM)) {
      var masterOverlay = this.wot.cloneOverlay.instance;
      this.wot.cloneOverlay.markOversizedFixedBottomRows();
      masterOverlay.wtOverlays.adjustElementsSize();
    }
  },
  removeRedundantRows: function(renderedRowsCount) {
    while (this.wtTable.tbodyChildrenLength > renderedRowsCount) {
      this.TBODY.removeChild(this.TBODY.lastChild);
      this.wtTable.tbodyChildrenLength--;
    }
  },
  refreshRowHeaders: function() {
    var totalRows = this.wot.getSetting('totalRows');
    var TR;
    var visibleRowIndex = 1;
    var $leftTr = $('.ht_clone_left tr');
    while (visibleRowIndex < totalRows) {
      TR = $leftTr[visibleRowIndex];
      if (TR && TR.firstChild) {
        var height = $(this.wot.wtTable.TBODY.childNodes[visibleRowIndex - 1].firstChild).outerHeight();
        if (height) {
          TR.firstChild.style.height = height + 'px';
        } else {
          TR.firstChild.style.height = '';
        }
      }
      visibleRowIndex++;
    }
  },
  renderRows: function(totalRows, rowsToRender, columnsToRender) {
    var lastTD,
        TR;
    var visibleRowIndex = 0;
    var sourceRowIndex = this.rowFilter.renderedToSource(visibleRowIndex);
    var isWorkingOnClone = this.wtTable.isWorkingOnClone();
    while (sourceRowIndex < totalRows && sourceRowIndex >= 0) {
      if (visibleRowIndex > 1000) {
        throw new Error('Security brake: Too much TRs. Please define height for your table, which will enforce scrollbars.');
      }
      if (rowsToRender !== void 0 && visibleRowIndex === rowsToRender) {
        break;
      }
      TR = this.getOrCreateTrForRow(visibleRowIndex, TR);
      this.renderRowHeaders(sourceRowIndex, TR);
      this.adjustColumns(TR, columnsToRender + this.rowHeaderCount);
      lastTD = this.renderCells(sourceRowIndex, TR, columnsToRender);
      if (!isWorkingOnClone || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM)) {
        this.resetOversizedRow(sourceRowIndex);
      }
      if (TR.firstChild) {
        var height = this.wot.wtTable.getRowHeight(sourceRowIndex);
        if (height) {
          height--;
          TR.firstChild.style.height = height + 'px';
        } else {
          TR.firstChild.style.height = '';
        }
      }
      visibleRowIndex++;
      sourceRowIndex = this.rowFilter.renderedToSource(visibleRowIndex);
    }
  },
  resetOversizedRow: function(sourceRow) {
    if (this.wot.getSetting('externalRowCalculator')) {
      return;
    }
    if (this.wot.wtViewport.oversizedRows && this.wot.wtViewport.oversizedRows[sourceRow]) {
      this.wot.wtViewport.oversizedRows[sourceRow] = void 0;
    }
  },
  markOversizedRows: function() {
    if (this.wot.getSetting('externalRowCalculator')) {
      return;
    }
    var rowCount = this.instance.wtTable.TBODY.childNodes.length;
    var expectedTableHeight = rowCount * this.instance.wtSettings.settings.defaultRowHeight;
    var actualTableHeight = innerHeight(this.instance.wtTable.TBODY) - 1;
    var previousRowHeight;
    var rowInnerHeight;
    var sourceRowIndex;
    var currentTr;
    var rowHeader;
    var totalRows = this.instance.getSetting('totalRows');
    if (expectedTableHeight === actualTableHeight && !this.instance.getSetting('fixedRowsBottom')) {
      return;
    }
    while (rowCount) {
      rowCount--;
      sourceRowIndex = this.instance.wtTable.rowFilter.renderedToSource(rowCount);
      previousRowHeight = this.instance.wtTable.getRowHeight(sourceRowIndex);
      currentTr = this.instance.wtTable.getTrForRow(sourceRowIndex);
      rowHeader = currentTr.querySelector('th');
      if (rowHeader) {
        rowInnerHeight = innerHeight(rowHeader);
      } else {
        rowInnerHeight = innerHeight(currentTr) - 1;
      }
      if ((!previousRowHeight && this.instance.wtSettings.settings.defaultRowHeight < rowInnerHeight || previousRowHeight < rowInnerHeight)) {
        this.instance.wtViewport.oversizedRows[sourceRowIndex] = ++rowInnerHeight;
      }
    }
  },
  markOversizedColumns: function() {
    var overlayName = this.wot.getOverlayName();
    if (!this.columnHeaderCount || this.wot.wtViewport.isMarkedOversizedColumn[overlayName] || this.wtTable.isWorkingOnClone()) {
      return;
    }
    var columnCount = this.wtTable.getRenderedColumnsCount();
    for (var i = 0; i < this.columnHeaderCount; i++) {
      for (var renderedColumnIndex = (-1) * this.rowHeaderCount; renderedColumnIndex < columnCount; renderedColumnIndex++) {
        this.markIfOversizedColumnHeader(renderedColumnIndex);
      }
    }
    this.wot.wtViewport.isMarkedOversizedColumn[overlayName] = true;
  },
  adjustColumnHeaderHeights: function() {
    var columnHeaders = this.wot.getSetting('columnHeaders');
    var childs = this.wot.wtTable.THEAD.childNodes;
    var oversizedCols = this.wot.wtViewport.oversizedColumnHeaders;
    for (var i = 0,
        len = columnHeaders.length; i < len; i++) {
      if (oversizedCols[i]) {
        if (childs[i].childNodes.length === 0) {
          return;
        }
        childs[i].childNodes[0].style.height = oversizedCols[i] + 'px';
      }
    }
  },
  markIfOversizedColumnHeader: function(col) {
    var sourceColIndex = this.wot.wtTable.columnFilter.renderedToSource(col);
    var level = this.columnHeaderCount;
    var defaultRowHeight = this.wot.wtSettings.settings.defaultRowHeight;
    var previousColHeaderHeight;
    var currentHeader;
    var currentHeaderHeight;
    while (level) {
      level--;
      previousColHeaderHeight = this.wot.wtTable.getColumnHeaderHeight(level);
      currentHeader = this.wot.wtTable.getColumnHeader(sourceColIndex, level);
      if (!currentHeader) {
        continue;
      }
      currentHeaderHeight = innerHeight(currentHeader);
      if (!previousColHeaderHeight && defaultRowHeight < currentHeaderHeight || previousColHeaderHeight < currentHeaderHeight) {
        this.wot.wtViewport.oversizedColumnHeaders[level] = currentHeaderHeight;
      }
    }
  },
  renderCells: function(sourceRowIndex, TR, columnsToRender) {
    var TD;
    var sourceColIndex;
    for (var visibleColIndex = 0; visibleColIndex < columnsToRender; visibleColIndex++) {
      sourceColIndex = this.columnFilter.renderedToSource(visibleColIndex);
      if (visibleColIndex === 0) {
        TD = TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(sourceColIndex)];
      } else {
        TD = TD.nextSibling;
      }
      if (TD.nodeName == 'TH') {
        TD = replaceThWithTd(TD, TR);
      }
      if (!hasClass(TD, 'hide')) {
        TD.className = '';
      }
      TD.removeAttribute('style');
      this.wot.wtSettings.settings.cellRenderer(sourceRowIndex, sourceColIndex, TD);
    }
    return TD;
  },
  adjustColumnWidths: function(columnsToRender) {
    var scrollbarCompensation = 0;
    var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
    var mainHolder = sourceInstance.wtTable.holder;
    if (mainHolder.offsetHeight < mainHolder.scrollHeight) {
      scrollbarCompensation = getScrollbarWidth();
    }
    this.wot.wtViewport.columnsRenderCalculator.refreshStretching(this.wot.wtViewport.getViewportWidth() - scrollbarCompensation);
    for (var renderedColIndex = 0; renderedColIndex < columnsToRender; renderedColIndex++) {
      var width = this.wtTable.getStretchedColumnWidth(this.columnFilter.renderedToSource(renderedColIndex));
      this.COLGROUP.childNodes[renderedColIndex + this.rowHeaderCount].style.width = width + 'px';
    }
  },
  appendToTbody: function(TR) {
    this.TBODY.appendChild(TR);
    this.wtTable.tbodyChildrenLength++;
  },
  getOrCreateTrForRow: function(rowIndex, currentTr) {
    var TR;
    if (rowIndex >= this.wtTable.tbodyChildrenLength) {
      TR = this.createRow();
      this.appendToTbody(TR);
    } else if (rowIndex === 0) {
      TR = this.TBODY.firstChild;
    } else {
      TR = currentTr.nextSibling;
    }
    if (TR.className) {
      TR.removeAttribute('class');
    }
    return TR;
  },
  createRow: function() {
    var TR = document.createElement('TR');
    for (var visibleColIndex = 0; visibleColIndex < this.rowHeaderCount; visibleColIndex++) {
      TR.appendChild(document.createElement('TH'));
    }
    return TR;
  },
  renderRowHeader: function(row, col, TH) {
    TH.className = '';
    TH.removeAttribute('style');
    this.rowHeaders[col](row, TH, col);
  },
  renderRowHeaders: function(row, TR) {
    for (var TH = TR.firstChild,
        visibleColIndex = 0; visibleColIndex < this.rowHeaderCount; visibleColIndex++) {
      if (!TH) {
        TH = document.createElement('TH');
        TR.appendChild(TH);
      } else if (TH.nodeName == 'TD') {
        TH = replaceTdWithTh(TH, TR);
      }
      this.renderRowHeader(row, visibleColIndex, TH);
      TH = TH.nextSibling;
    }
  },
  adjustAvailableNodes: function() {
    this.adjustColGroups();
    this.adjustThead();
  },
  renderColumnHeaders: function() {
    var overlayName = this.wot.getOverlayName();
    if (!this.columnHeaderCount) {
      return;
    }
    var columnCount = this.wtTable.getRenderedColumnsCount();
    for (var i = 0; i < this.columnHeaderCount; i++) {
      var TR = this.getTrForColumnHeaders(i);
      for (var renderedColumnIndex = (-1) * this.rowHeaderCount; renderedColumnIndex < columnCount; renderedColumnIndex++) {
        var sourceCol = this.columnFilter.renderedToSource(renderedColumnIndex);
        this.renderColumnHeader(i, sourceCol, TR.childNodes[renderedColumnIndex + this.rowHeaderCount]);
      }
    }
  },
  adjustColGroups: function() {
    var columnCount = this.wtTable.getRenderedColumnsCount();
    while (this.wtTable.colgroupChildrenLength < columnCount + this.rowHeaderCount) {
      this.COLGROUP.appendChild(document.createElement('COL'));
      this.wtTable.colgroupChildrenLength++;
    }
    while (this.wtTable.colgroupChildrenLength > columnCount + this.rowHeaderCount) {
      this.COLGROUP.removeChild(this.COLGROUP.lastChild);
      this.wtTable.colgroupChildrenLength--;
    }
    if (this.rowHeaderCount) {
      addClass(this.COLGROUP.childNodes[0], 'rowHeader');
    }
  },
  adjustThead: function() {
    var columnCount = this.wtTable.getRenderedColumnsCount();
    var TR = this.THEAD.firstChild;
    if (this.columnHeaders.length) {
      for (var i = 0,
          len = this.columnHeaders.length; i < len; i++) {
        TR = this.THEAD.childNodes[i];
        if (!TR) {
          TR = document.createElement('TR');
          this.THEAD.appendChild(TR);
        }
        this.theadChildrenLength = TR.childNodes.length;
        while (this.theadChildrenLength < columnCount + this.rowHeaderCount) {
          TR.appendChild(document.createElement('TH'));
          this.theadChildrenLength++;
        }
        while (this.theadChildrenLength > columnCount + this.rowHeaderCount) {
          TR.removeChild(TR.lastChild);
          this.theadChildrenLength--;
        }
      }
      var theadChildrenLength = this.THEAD.childNodes.length;
      if (theadChildrenLength > this.columnHeaders.length) {
        for (var i$__2 = this.columnHeaders.length; i$__2 < theadChildrenLength; i$__2++) {
          this.THEAD.removeChild(this.THEAD.lastChild);
        }
      }
    } else if (TR) {
      empty(TR);
    }
  },
  getTrForColumnHeaders: function(index) {
    return this.THEAD.childNodes[index];
  },
  renderColumnHeader: function(row, col, TH) {
    TH.className = '';
    TH.removeAttribute('style');
    return this.columnHeaders[row](col, TH, row);
  },
  adjustColumns: function(TR, desiredCount) {
    var count = TR.childNodes.length;
    while (count < desiredCount) {
      var TD = document.createElement('TD');
      TR.appendChild(TD);
      count++;
    }
    while (count > desiredCount) {
      TR.removeChild(TR.lastChild);
      count--;
    }
  },
  removeRedundantColumns: function(columnsToRender) {
    while (this.wtTable.tbodyChildrenLength > columnsToRender) {
      this.TBODY.removeChild(this.TBODY.lastChild);
      this.wtTable.tbodyChildrenLength--;
    }
  }
}, {});
function replaceTdWithTh(TD, TR) {
  var TH = document.createElement('TH');
  TR.insertBefore(TH, TD);
  TR.removeChild(TD);
  return TH;
}
function replaceThWithTd(TH, TR) {
  var TD = document.createElement('TD');
  TR.insertBefore(TD, TH);
  TR.removeChild(TH);
  return TD;
}
;
window.WalkontableTableRenderer = WalkontableTableRenderer;

//# 
},{"helpers/dom/element":36}],21:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableViewport: {get: function() {
      return WalkontableViewport;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_eventManager__,
    $__calculator_47_viewportColumns__,
    $__calculator_47_viewportRows__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getScrollbarWidth = $__0.getScrollbarWidth,
    getScrollTop = $__0.getScrollTop,
    getStyle = $__0.getStyle,
    offset = $__0.offset,
    outerHeight = $__0.outerHeight,
    outerWidth = $__0.outerWidth;
var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager__}).EventManager;
var WalkontableViewportColumnsCalculator = ($__calculator_47_viewportColumns__ = require("calculator/viewportColumns"), $__calculator_47_viewportColumns__ && $__calculator_47_viewportColumns__.__esModule && $__calculator_47_viewportColumns__ || {default: $__calculator_47_viewportColumns__}).WalkontableViewportColumnsCalculator;
var WalkontableViewportRowsCalculator = ($__calculator_47_viewportRows__ = require("calculator/viewportRows"), $__calculator_47_viewportRows__ && $__calculator_47_viewportRows__.__esModule && $__calculator_47_viewportRows__ || {default: $__calculator_47_viewportRows__}).WalkontableViewportRowsCalculator;
var WalkontableViewport = function WalkontableViewport(wotInstance) {
  var $__4 = this;
  this.wot = wotInstance;
  this.instance = this.wot;
  this.oversizedRows = [];
  this.oversizedColumnHeaders = [];
  this.isMarkedOversizedColumn = {};
  this.clientHeight = 0;
  this.containerWidth = NaN;
  this.rowHeaderWidth = NaN;
  this.rowsVisibleCalculator = null;
  this.columnsVisibleCalculator = null;
  this.eventManager = new EventManager(this.wot);
  this.eventManager.addEventListener(window, 'resize', (function() {
    $__4.clientHeight = $__4.getWorkspaceHeight();
  }));
};
($traceurRuntime.createClass)(WalkontableViewport, {
  getWorkspaceHeight: function() {
    var trimmingContainer = this.instance.wtOverlays.topOverlay.trimmingContainer;
    var elemHeight;
    var height = 0;
    if (trimmingContainer === window) {
      height = document.documentElement.clientHeight;
    } else {
      elemHeight = outerHeight(trimmingContainer);
      height = (elemHeight > 0 && trimmingContainer.clientHeight > 0) ? trimmingContainer.clientHeight : Infinity;
    }
    return height;
  },
  getWorkspaceWidth: function() {
    var width;
    var totalColumns = this.instance.getSetting('totalColumns');
    var trimmingContainer = this.instance.wtOverlays.leftOverlay.trimmingContainer;
    var overflow;
    var stretchSetting = this.instance.getSetting('stretchH');
    var docOffsetWidth = document.documentElement.offsetWidth;
    if (Handsontable.freezeOverlays) {
      width = Math.min(docOffsetWidth - this.getWorkspaceOffset().left, docOffsetWidth);
    } else {
      width = Math.min(this.getContainerFillWidth(), docOffsetWidth - this.getWorkspaceOffset().left, docOffsetWidth);
    }
    if (trimmingContainer === window && totalColumns > 0 && this.sumColumnWidths(0, totalColumns - 1) > width) {
      return document.documentElement.clientWidth;
    }
    if (trimmingContainer !== window) {
      overflow = getStyle(this.instance.wtOverlays.leftOverlay.trimmingContainer, 'overflow');
      if (overflow == 'scroll' || overflow == 'hidden' || overflow == 'auto') {
        return Math.max(width, trimmingContainer.clientWidth);
      }
    }
    if (stretchSetting === 'none' || !stretchSetting) {
      return Math.max(width, outerWidth(this.instance.wtTable.TABLE));
    } else {
      return width;
    }
  },
  hasVerticalScroll: function() {
    return this.getWorkspaceActualHeight() > this.getWorkspaceHeight();
  },
  hasHorizontalScroll: function() {
    return this.getWorkspaceActualWidth() > this.getWorkspaceWidth();
  },
  sumColumnWidths: function(from, length) {
    var sum = 0;
    while (from < length) {
      sum += this.wot.wtTable.getColumnWidth(from);
      from++;
    }
    return sum;
  },
  getContainerFillWidth: function() {
    if (this.containerWidth) {
      return this.containerWidth;
    }
    var mainContainer = this.instance.wtTable.holder;
    var fillWidth;
    var dummyElement;
    dummyElement = document.createElement('div');
    dummyElement.style.width = '100%';
    dummyElement.style.height = '1px';
    mainContainer.appendChild(dummyElement);
    fillWidth = dummyElement.offsetWidth;
    this.containerWidth = fillWidth;
    mainContainer.removeChild(dummyElement);
    return fillWidth;
  },
  getWorkspaceOffset: function() {
    return offset(this.wot.wtTable.TABLE);
  },
  getWorkspaceActualHeight: function() {
    return outerHeight(this.wot.wtTable.TABLE);
  },
  getWorkspaceActualWidth: function() {
    return outerWidth(this.wot.wtTable.TABLE) || outerWidth(this.wot.wtTable.TBODY) || outerWidth(this.wot.wtTable.THEAD);
  },
  getColumnHeaderHeight: function() {
    if (isNaN(this.columnHeaderHeight)) {
      this.columnHeaderHeight = outerHeight(this.wot.wtTable.THEAD);
    }
    return this.columnHeaderHeight;
  },
  getViewportHeight: function() {
    var containerHeight = this.getWorkspaceHeight();
    var columnHeaderHeight;
    if (containerHeight === Infinity) {
      return containerHeight;
    }
    columnHeaderHeight = this.getColumnHeaderHeight();
    if (columnHeaderHeight > 0) {
      containerHeight -= columnHeaderHeight;
    }
    return containerHeight;
  },
  getRowHeaderWidth: function() {
    if (this.wot.cloneSource) {
      return this.wot.cloneSource.wtViewport.getRowHeaderWidth();
    }
    if (isNaN(this.rowHeaderWidth)) {
      var rowHeaders = this.instance.getSetting('rowHeaders');
      if (rowHeaders.length) {
        var TH = this.instance.wtTable.TABLE.querySelector('TH');
        this.rowHeaderWidth = 0;
        for (var i = 0,
            len = rowHeaders.length; i < len; i++) {
          if (TH) {
            this.rowHeaderWidth += outerWidth(TH);
            TH = TH.nextSibling;
          } else {
            this.rowHeaderWidth += 50;
          }
        }
      } else {
        this.rowHeaderWidth = 0;
      }
    }
    return this.rowHeaderWidth;
  },
  getViewportWidth: function() {
    var containerWidth = this.getWorkspaceWidth();
    var rowHeaderWidth;
    if (containerWidth === Infinity) {
      return containerWidth;
    }
    rowHeaderWidth = this.getRowHeaderWidth();
    if (rowHeaderWidth > 0) {
      return containerWidth - rowHeaderWidth;
    }
    return containerWidth;
  },
  createRowsCalculator: function() {
    var visible = arguments[0] !== (void 0) ? arguments[0] : false;
    var $__4 = this;
    var height;
    var pos;
    var fixedRowsTop;
    var scrollbarHeight;
    var fixedRowsBottom;
    var fixedRowsHeight;
    var totalRows;
    this.rowHeaderWidth = NaN;
    if (this.wot.wtSettings.settings.renderAllRows) {
      height = Infinity;
    } else {
      height = this.getViewportHeight();
    }
    pos = getScrollTop(this.wot.wtOverlays.mainTableScrollableElement) - this.wot.wtOverlays.topOverlay.getTableParentOffset();
    if (pos < 0) {
      pos = 0;
    }
    fixedRowsTop = this.wot.getSetting('fixedRowsTop');
    fixedRowsBottom = this.wot.getSetting('fixedRowsBottom');
    totalRows = this.wot.getSetting('totalRows');
    if (fixedRowsTop) {
      fixedRowsHeight = this.wot.wtOverlays.topOverlay.sumCellSizes(0, fixedRowsTop);
      pos += fixedRowsHeight;
      height -= fixedRowsHeight;
    }
    if (fixedRowsBottom && this.wot.wtOverlays.bottomOverlay.clone) {
      fixedRowsHeight = this.wot.wtOverlays.bottomOverlay.sumCellSizes(totalRows - fixedRowsBottom, totalRows);
      height -= fixedRowsHeight;
    }
    if (this.wot.wtTable.holder.clientHeight === this.wot.wtTable.holder.offsetHeight) {
      scrollbarHeight = 0;
    } else {
      scrollbarHeight = getScrollbarWidth();
    }
    return new WalkontableViewportRowsCalculator(height, pos, this.wot.getSetting('totalRows'), (function(sourceRow) {
      return $__4.wot.wtTable.getRowHeight(sourceRow);
    }), visible ? null : this.wot.wtSettings.settings.viewportRowCalculatorOverride, visible, scrollbarHeight);
  },
  createColumnsCalculator: function() {
    var visible = arguments[0] !== (void 0) ? arguments[0] : false;
    var $__4 = this;
    var width = this.getViewportWidth();
    var pos;
    var fixedColumnsLeft;
    this.columnHeaderHeight = NaN;
    pos = this.wot.wtOverlays.leftOverlay.getScrollPosition() - this.wot.wtOverlays.leftOverlay.getTableParentOffset();
    if (pos < 0) {
      pos = 0;
    }
    fixedColumnsLeft = this.wot.getSetting('fixedColumnsLeft');
    if (fixedColumnsLeft) {
      var fixedColumnsWidth = this.wot.wtOverlays.leftOverlay.sumCellSizes(0, fixedColumnsLeft);
      pos += fixedColumnsWidth;
      width -= fixedColumnsWidth;
    }
    if (this.wot.wtTable.holder.clientWidth !== this.wot.wtTable.holder.offsetWidth) {
      width -= getScrollbarWidth();
    }
    return new WalkontableViewportColumnsCalculator(width, pos, this.wot.getSetting('totalColumns'), (function(sourceCol) {
      return $__4.wot.wtTable.getColumnWidth(sourceCol);
    }), visible ? null : this.wot.wtSettings.settings.viewportColumnCalculatorOverride, visible, this.wot.getSetting('stretchH'));
  },
  createRenderCalculators: function() {
    var fastDraw = arguments[0] !== (void 0) ? arguments[0] : false;
    if (fastDraw) {
      var proposedRowsVisibleCalculator = this.createRowsCalculator(true);
      var proposedColumnsVisibleCalculator = this.createColumnsCalculator(true);
      if (!(this.areAllProposedVisibleRowsAlreadyRendered(proposedRowsVisibleCalculator) && this.areAllProposedVisibleColumnsAlreadyRendered(proposedColumnsVisibleCalculator))) {
        fastDraw = false;
      }
    }
    if (!fastDraw) {
      this.rowsRenderCalculator = this.createRowsCalculator();
      this.columnsRenderCalculator = this.createColumnsCalculator();
    }
    this.rowsVisibleCalculator = null;
    this.columnsVisibleCalculator = null;
    return fastDraw;
  },
  createVisibleCalculators: function() {
    this.rowsVisibleCalculator = this.createRowsCalculator(true);
    this.columnsVisibleCalculator = this.createColumnsCalculator(true);
  },
  areAllProposedVisibleRowsAlreadyRendered: function(proposedRowsVisibleCalculator) {
    if (this.rowsVisibleCalculator) {
      if (proposedRowsVisibleCalculator.startRow < this.rowsRenderCalculator.startRow || (proposedRowsVisibleCalculator.startRow === this.rowsRenderCalculator.startRow && proposedRowsVisibleCalculator.startRow > 0)) {
        return false;
      } else if (proposedRowsVisibleCalculator.endRow > this.rowsRenderCalculator.endRow || (proposedRowsVisibleCalculator.endRow === this.rowsRenderCalculator.endRow && proposedRowsVisibleCalculator.endRow < this.wot.getSetting('totalRows') - 1)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  },
  areAllProposedVisibleColumnsAlreadyRendered: function(proposedColumnsVisibleCalculator) {
    if (this.columnsVisibleCalculator) {
      if (proposedColumnsVisibleCalculator.startColumn < this.columnsRenderCalculator.startColumn || (proposedColumnsVisibleCalculator.startColumn === this.columnsRenderCalculator.startColumn && proposedColumnsVisibleCalculator.startColumn > 0)) {
        return false;
      } else if (proposedColumnsVisibleCalculator.endColumn > this.columnsRenderCalculator.endColumn || (proposedColumnsVisibleCalculator.endColumn === this.columnsRenderCalculator.endColumn && proposedColumnsVisibleCalculator.endColumn < this.wot.getSetting('totalColumns') - 1)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}, {});
;
window.WalkontableViewport = WalkontableViewport;

//# 
},{"calculator/viewportColumns":2,"calculator/viewportRows":3,"eventManager":32,"helpers/dom/element":36}],22:[function(require,module,exports){
"use strict";
var $__helpers_47_browser__,
    $__editors__,
    $__renderers__,
    $__editors_47_textEditor__,
    $__renderers_47_textRenderer__;
var isMobileBrowser = ($__helpers_47_browser__ = require("helpers/browser"), $__helpers_47_browser__ && $__helpers_47_browser__.__esModule && $__helpers_47_browser__ || {default: $__helpers_47_browser__}).isMobileBrowser;
var getEditorConstructor = ($__editors__ = require("editors"), $__editors__ && $__editors__.__esModule && $__editors__ || {default: $__editors__}).getEditorConstructor;
var getRenderer = ($__renderers__ = require("renderers"), $__renderers__ && $__renderers__.__esModule && $__renderers__ || {default: $__renderers__}).getRenderer;
var TextEditor = ($__editors_47_textEditor__ = require("editors/textEditor"), $__editors_47_textEditor__ && $__editors_47_textEditor__.__esModule && $__editors_47_textEditor__ || {default: $__editors_47_textEditor__}).TextEditor;
var TextRenderer = ($__renderers_47_textRenderer__ = require("renderers/textRenderer"), $__renderers_47_textRenderer__ && $__renderers_47_textRenderer__.__esModule && $__renderers_47_textRenderer__ || {default: $__renderers_47_textRenderer__}).TextRenderer;
Handsontable.mobileBrowser = isMobileBrowser();
Handsontable.TextCell = {
  editor: Handsontable.mobileBrowser ? getEditorConstructor('mobile') : getEditorConstructor('text'),
  renderer: getRenderer('text')
};
Handsontable.cellTypes = {text: Handsontable.TextCell};
Handsontable.cellLookup = {validator: {}};

//# 
},{"editors":27,"editors/textEditor":31,"helpers/browser":34,"renderers":70,"renderers/textRenderer":72}],23:[function(require,module,exports){
"use strict";
var $__shims_47_classes__,
    $__es6collections__,
    $__pluginHooks__,
    $__core__,
    $__renderers_47__95_cellDecorator__,
    $___95_cellTypes__,
    $__helpers_47_array__,
    $__helpers_47_browser__,
    $__helpers_47_data__,
    $__helpers_47_function__,
    $__helpers_47_mixed__,
    $__helpers_47_number__,
    $__helpers_47_object__,
    $__helpers_47_setting__,
    $__helpers_47_string__,
    $__helpers_47_unicode__,
    $__helpers_47_dom_47_element__,
    $__helpers_47_dom_47_event__;
var version = Handsontable.version;
var buildDate = Handsontable.buildDate;
window.Handsontable = function Handsontable(rootElement, userSettings) {
  var instance = new Handsontable.Core(rootElement, userSettings || {});
  instance.init();
  return instance;
};
Handsontable.version = version;
Handsontable.buildDate = buildDate;
($__shims_47_classes__ = require("shims/classes"), $__shims_47_classes__ && $__shims_47_classes__.__esModule && $__shims_47_classes__ || {default: $__shims_47_classes__});
($__es6collections__ = require("es6collections"), $__es6collections__ && $__es6collections__.__esModule && $__es6collections__ || {default: $__es6collections__});
Handsontable.plugins = {};
var Hooks = ($__pluginHooks__ = require("pluginHooks"), $__pluginHooks__ && $__pluginHooks__.__esModule && $__pluginHooks__ || {default: $__pluginHooks__}).Hooks;
if (!Handsontable.hooks) {
  Handsontable.hooks = new Hooks();
}
($__core__ = require("core"), $__core__ && $__core__.__esModule && $__core__ || {default: $__core__});
($__renderers_47__95_cellDecorator__ = require("renderers/_cellDecorator"), $__renderers_47__95_cellDecorator__ && $__renderers_47__95_cellDecorator__.__esModule && $__renderers_47__95_cellDecorator__ || {default: $__renderers_47__95_cellDecorator__});
($___95_cellTypes__ = require("_cellTypes"), $___95_cellTypes__ && $___95_cellTypes__.__esModule && $___95_cellTypes__ || {default: $___95_cellTypes__});
var arrayHelpers = ($__helpers_47_array__ = require("helpers/array"), $__helpers_47_array__ && $__helpers_47_array__.__esModule && $__helpers_47_array__ || {default: $__helpers_47_array__});
var browserHelpers = ($__helpers_47_browser__ = require("helpers/browser"), $__helpers_47_browser__ && $__helpers_47_browser__.__esModule && $__helpers_47_browser__ || {default: $__helpers_47_browser__});
var dataHelpers = ($__helpers_47_data__ = require("helpers/data"), $__helpers_47_data__ && $__helpers_47_data__.__esModule && $__helpers_47_data__ || {default: $__helpers_47_data__});
var functionHelpers = ($__helpers_47_function__ = require("helpers/function"), $__helpers_47_function__ && $__helpers_47_function__.__esModule && $__helpers_47_function__ || {default: $__helpers_47_function__});
var mixedHelpers = ($__helpers_47_mixed__ = require("helpers/mixed"), $__helpers_47_mixed__ && $__helpers_47_mixed__.__esModule && $__helpers_47_mixed__ || {default: $__helpers_47_mixed__});
var numberHelpers = ($__helpers_47_number__ = require("helpers/number"), $__helpers_47_number__ && $__helpers_47_number__.__esModule && $__helpers_47_number__ || {default: $__helpers_47_number__});
var objectHelpers = ($__helpers_47_object__ = require("helpers/object"), $__helpers_47_object__ && $__helpers_47_object__.__esModule && $__helpers_47_object__ || {default: $__helpers_47_object__});
var settingHelpers = ($__helpers_47_setting__ = require("helpers/setting"), $__helpers_47_setting__ && $__helpers_47_setting__.__esModule && $__helpers_47_setting__ || {default: $__helpers_47_setting__});
var stringHelpers = ($__helpers_47_string__ = require("helpers/string"), $__helpers_47_string__ && $__helpers_47_string__.__esModule && $__helpers_47_string__ || {default: $__helpers_47_string__});
var unicodeHelpers = ($__helpers_47_unicode__ = require("helpers/unicode"), $__helpers_47_unicode__ && $__helpers_47_unicode__.__esModule && $__helpers_47_unicode__ || {default: $__helpers_47_unicode__});
var helpers = [arrayHelpers, browserHelpers, dataHelpers, functionHelpers, mixedHelpers, numberHelpers, objectHelpers, settingHelpers, stringHelpers, unicodeHelpers];
Handsontable.helper = {};
arrayHelpers.arrayEach(helpers, (function(helper) {
  arrayHelpers.arrayEach(Object.getOwnPropertyNames(helper), (function(key) {
    if (key.charAt(0) !== '_') {
      Handsontable.helper[key] = helper[key];
    }
  }));
}));
var domHelpers = ($__helpers_47_dom_47_element__ = require("helpers/dom/element"), $__helpers_47_dom_47_element__ && $__helpers_47_dom_47_element__.__esModule && $__helpers_47_dom_47_element__ || {default: $__helpers_47_dom_47_element__});
var domEventHelpers = ($__helpers_47_dom_47_event__ = require("helpers/dom/event"), $__helpers_47_dom_47_event__ && $__helpers_47_dom_47_event__.__esModule && $__helpers_47_dom_47_event__ || {default: $__helpers_47_dom_47_event__});
Handsontable.dom = {};
Handsontable.Dom = Handsontable.dom;
arrayHelpers.arrayEach([domHelpers, domEventHelpers], (function(helper) {
  arrayHelpers.arrayEach(Object.getOwnPropertyNames(helper), (function(key) {
    if (key.charAt(0) !== '_') {
      Handsontable.dom[key] = helper[key];
    }
  }));
}));

//# 
},{"_cellTypes":22,"core":24,"es6collections":"es6collections","helpers/array":33,"helpers/browser":34,"helpers/data":35,"helpers/dom/element":36,"helpers/dom/event":37,"helpers/function":38,"helpers/mixed":39,"helpers/number":40,"helpers/object":41,"helpers/setting":42,"helpers/string":43,"helpers/unicode":44,"pluginHooks":46,"renderers/_cellDecorator":71,"shims/classes":73}],24:[function(require,module,exports){
"use strict";
var $__numeral__,
    $__helpers_47_dom_47_element__,
    $__helpers_47_setting__,
    $__dataMap__,
    $__editorManager__,
    $__eventManager__,
    $__helpers_47_object__,
    $__helpers_47_array__,
    $__plugins__,
    $__renderers__,
    $__helpers_47_string__,
    $__helpers_47_number__,
    $__tableView__,
    $__helpers_47_data__,
    $__3rdparty_47_walkontable_47_src_47_cell_47_coords__,
    $__3rdparty_47_walkontable_47_src_47_cell_47_range__,
    $__3rdparty_47_walkontable_47_src_47_selection__,
    $__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__;
var numeral = ($__numeral__ = require("numeral"), $__numeral__ && $__numeral__.__esModule && $__numeral__ || {default: $__numeral__}).default;
var $__1 = ($__helpers_47_dom_47_element__ = require("helpers/dom/element"), $__helpers_47_dom_47_element__ && $__helpers_47_dom_47_element__.__esModule && $__helpers_47_dom_47_element__ || {default: $__helpers_47_dom_47_element__}),
    addClass = $__1.addClass,
    empty = $__1.empty,
    isChildOfWebComponentTable = $__1.isChildOfWebComponentTable,
    removeClass = $__1.removeClass;
var columnFactory = ($__helpers_47_setting__ = require("helpers/setting"), $__helpers_47_setting__ && $__helpers_47_setting__.__esModule && $__helpers_47_setting__ || {default: $__helpers_47_setting__}).columnFactory;
var DataMap = ($__dataMap__ = require("dataMap"), $__dataMap__ && $__dataMap__.__esModule && $__dataMap__ || {default: $__dataMap__}).DataMap;
var EditorManager = ($__editorManager__ = require("editorManager"), $__editorManager__ && $__editorManager__.__esModule && $__editorManager__ || {default: $__editorManager__}).EditorManager;
var eventManagerObject = ($__eventManager__ = require("eventManager"), $__eventManager__ && $__eventManager__.__esModule && $__eventManager__ || {default: $__eventManager__}).eventManager;
var $__6 = ($__helpers_47_object__ = require("helpers/object"), $__helpers_47_object__ && $__helpers_47_object__.__esModule && $__helpers_47_object__ || {default: $__helpers_47_object__}),
    extend = $__6.extend,
    duckSchema = $__6.duckSchema,
    isObjectEquals = $__6.isObjectEquals,
    deepClone = $__6.deepClone;
var arrayFlatten = ($__helpers_47_array__ = require("helpers/array"), $__helpers_47_array__ && $__helpers_47_array__.__esModule && $__helpers_47_array__ || {default: $__helpers_47_array__}).arrayFlatten;
var getPlugin = ($__plugins__ = require("plugins"), $__plugins__ && $__plugins__.__esModule && $__plugins__ || {default: $__plugins__}).getPlugin;
var getRenderer = ($__renderers__ = require("renderers"), $__renderers__ && $__renderers__.__esModule && $__renderers__ || {default: $__renderers__}).getRenderer;
var randomString = ($__helpers_47_string__ = require("helpers/string"), $__helpers_47_string__ && $__helpers_47_string__.__esModule && $__helpers_47_string__ || {default: $__helpers_47_string__}).randomString;
var rangeEach = ($__helpers_47_number__ = require("helpers/number"), $__helpers_47_number__ && $__helpers_47_number__.__esModule && $__helpers_47_number__ || {default: $__helpers_47_number__}).rangeEach;
var TableView = ($__tableView__ = require("tableView"), $__tableView__ && $__tableView__.__esModule && $__tableView__ || {default: $__tableView__}).TableView;
var $__13 = ($__helpers_47_data__ = require("helpers/data"), $__helpers_47_data__ && $__helpers_47_data__.__esModule && $__helpers_47_data__ || {default: $__helpers_47_data__}),
    translateRowsToColumns = $__13.translateRowsToColumns,
    cellMethodLookupFactory = $__13.cellMethodLookupFactory,
    spreadsheetColumnLabel = $__13.spreadsheetColumnLabel;
var WalkontableCellCoords = ($__3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $__3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = ($__3rdparty_47_walkontable_47_src_47_cell_47_range__ = require("3rdparty/walkontable/src/cell/range"), $__3rdparty_47_walkontable_47_src_47_cell_47_range__ && $__3rdparty_47_walkontable_47_src_47_cell_47_range__.__esModule && $__3rdparty_47_walkontable_47_src_47_cell_47_range__ || {default: $__3rdparty_47_walkontable_47_src_47_cell_47_range__}).WalkontableCellRange;
var WalkontableSelection = ($__3rdparty_47_walkontable_47_src_47_selection__ = require("3rdparty/walkontable/src/selection"), $__3rdparty_47_walkontable_47_src_47_selection__ && $__3rdparty_47_walkontable_47_src_47_selection__.__esModule && $__3rdparty_47_walkontable_47_src_47_selection__ || {default: $__3rdparty_47_walkontable_47_src_47_selection__}).WalkontableSelection;
var WalkontableViewportColumnsCalculator = ($__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__ = require("3rdparty/walkontable/src/calculator/viewportColumns"), $__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__ && $__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__.__esModule && $__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__ || {default: $__3rdparty_47_walkontable_47_src_47_calculator_47_viewportColumns__}).WalkontableViewportColumnsCalculator;
Handsontable.activeGuid = null;
Handsontable.Core = function Core(rootElement, userSettings) {
  var priv,
      datamap,
      grid,
      selection,
      editorManager,
      instance = this,
      GridSettings = function() {},
      eventManager = eventManagerObject(instance);
  extend(GridSettings.prototype, DefaultSettings.prototype);
  extend(GridSettings.prototype, userSettings);
  extend(GridSettings.prototype, expandType(userSettings));
  this.rootElement = rootElement;
  this.isHotTableEnv = isChildOfWebComponentTable(this.rootElement);
  Handsontable.eventManager.isHotTableEnv = this.isHotTableEnv;
  this.container = document.createElement('DIV');
  this.renderCall = false;
  rootElement.insertBefore(this.container, rootElement.firstChild);
  this.guid = 'ht_' + randomString();
  if (!this.rootElement.id || this.rootElement.id.substring(0, 3) === 'ht_') {
    this.rootElement.id = this.guid;
  }
  priv = {
    cellSettings: [],
    columnSettings: [],
    columnsSettingConflicts: ['data', 'width'],
    settings: new GridSettings(),
    selRange: null,
    isPopulated: null,
    scrollable: null,
    firstRun: true
  };
  grid = {
    alter: function(action, index, amount, source, keepEmptyRows) {
      var delta;
      amount = amount || 1;
      updateCellPropoties(action, index, amount);
      updateColWidthAndRowHeight(action, index, amount);
      switch (action) {
        case 'insert_row':
          if (instance.getSettings().maxRows === instance.countRows()) {
            return;
          }
          delta = datamap.createRow(index, amount);
          if (delta) {
            if (selection.isSelected() && priv.selRange.from.row >= index) {
              priv.selRange.from.row = priv.selRange.from.row + delta;
              selection.transformEnd(delta, 0);
            }
            instance.forceFullRender = true;
            selection.refreshBorders();
          }
          break;
        case 'insert_col':
          delta = datamap.createCol(index, amount);
          if (delta) {
            if (Array.isArray(instance.getSettings().colHeaders)) {
              var spliceArray = [index, 0];
              spliceArray.length += delta;
              Array.prototype.splice.apply(instance.getSettings().colHeaders, spliceArray);
            }
            if (selection.isSelected() && priv.selRange.from.col >= index) {
              priv.selRange.from.col = priv.selRange.from.col + delta;
              selection.transformEnd(0, delta);
            }
            instance.forceFullRender = true;
            selection.refreshBorders();
          }
          break;
        case 'remove_row':
          index = instance.runHooks('modifyCol', index);
          datamap.removeRow(index, amount);
          priv.cellSettings.splice(index, amount);
          var totalRows = instance.countRows();
          var fixedRowsTop = instance.getSettings().fixedRowsTop;
          if (fixedRowsTop >= index + 1) {
            instance.getSettings().fixedRowsTop -= Math.min(amount, fixedRowsTop - index);
          }
          var fixedRowsBottom = instance.getSettings().fixedRowsBottom;
          if (fixedRowsBottom && totalRows - fixedRowsBottom <= index + 1) {
            instance.getSettings().fixedRowsBottom -= Math.min(amount, fixedRowsBottom - index);
          }
          grid.adjustRowsAndCols();
          selection.refreshBorders();
          break;
        case 'remove_col':
          datamap.removeCol(index, amount);
          for (var row = 0,
              len = datamap.getAll().length; row < len; row++) {
            if (row in priv.cellSettings) {
              priv.cellSettings[row].splice(index, amount);
            }
          }
          var fixedColumnsLeft = instance.getSettings().fixedColumnsLeft;
          if (fixedColumnsLeft >= index + 1) {
            instance.getSettings().fixedColumnsLeft -= Math.min(amount, fixedColumnsLeft - index);
          }
          if (Array.isArray(instance.getSettings().colHeaders)) {
            if (typeof index == 'undefined') {
              index = -1;
            }
            instance.getSettings().colHeaders.splice(index, amount);
          }
          grid.adjustRowsAndCols();
          selection.refreshBorders();
          break;
        default:
          throw new Error('There is no such action "' + action + '"');
          break;
      }
      if (!keepEmptyRows) {
        grid.adjustRowsAndCols();
      }
    },
    adjustRowsAndCols: function() {
      if (priv.settings.minRows) {
        var rows = instance.countRows();
        if (rows < priv.settings.minRows) {
          for (var r = 0,
              minRows = priv.settings.minRows; r < minRows - rows; r++) {
            datamap.createRow(instance.countRows(), 1, true);
          }
        }
      }
      if (priv.settings.minSpareRows) {
        var emptyRows = instance.countEmptyRows(true);
        if (emptyRows < priv.settings.minSpareRows) {
          for (; emptyRows < priv.settings.minSpareRows && instance.countRows() < priv.settings.maxRows; emptyRows++) {
            datamap.createRow(instance.countRows(), 1, true);
          }
        }
      }
      {
        var emptyCols;
        if (priv.settings.minCols || priv.settings.minSpareCols) {
          emptyCols = instance.countEmptyCols(true);
        }
        if (priv.settings.minCols && !priv.settings.columns && instance.countCols() < priv.settings.minCols) {
          for (; instance.countCols() < priv.settings.minCols; emptyCols++) {
            datamap.createCol(instance.countCols(), 1, true);
          }
        }
        if (priv.settings.minSpareCols && !priv.settings.columns && instance.dataType === 'array' && emptyCols < priv.settings.minSpareCols) {
          for (; emptyCols < priv.settings.minSpareCols && instance.countCols() < priv.settings.maxCols; emptyCols++) {
            datamap.createCol(instance.countCols(), 1, true);
          }
        }
      }
      var rowCount = instance.countRows();
      var colCount = instance.countCols();
      if (rowCount === 0 || colCount === 0) {
        selection.deselect();
      }
      if (selection.isSelected()) {
        var selectionChanged = false;
        var fromRow = priv.selRange.from.row;
        var fromCol = priv.selRange.from.col;
        var toRow = priv.selRange.to.row;
        var toCol = priv.selRange.to.col;
        if (fromRow > rowCount - 1) {
          fromRow = rowCount - 1;
          selectionChanged = true;
          if (toRow > fromRow) {
            toRow = fromRow;
          }
        } else if (toRow > rowCount - 1) {
          toRow = rowCount - 1;
          selectionChanged = true;
          if (fromRow > toRow) {
            fromRow = toRow;
          }
        }
        if (fromCol > colCount - 1) {
          fromCol = colCount - 1;
          selectionChanged = true;
          if (toCol > fromCol) {
            toCol = fromCol;
          }
        } else if (toCol > colCount - 1) {
          toCol = colCount - 1;
          selectionChanged = true;
          if (fromCol > toCol) {
            fromCol = toCol;
          }
        }
        if (selectionChanged) {
          instance.selectCell(fromRow, fromCol, toRow, toCol);
        }
      }
      if (instance.view) {
        instance.view.wt.wtOverlays.adjustElementsSize();
      }
    },
    populateFromArray: function(start, input, end, source, method, direction, deltas) {
      var r,
          rlen,
          c,
          clen,
          setData = [],
          current = {};
      rlen = input.length;
      if (rlen === 0) {
        return false;
      }
      var repeatCol,
          repeatRow,
          cmax,
          rmax,
          baseEnd = {
            row: end === null ? null : end.row,
            col: end === null ? null : end.col
          };
      switch (method) {
        case 'shift_down':
          repeatCol = end ? end.col - start.col + 1 : 0;
          repeatRow = end ? end.row - start.row + 1 : 0;
          input = translateRowsToColumns(input);
          for (c = 0, clen = input.length, cmax = Math.max(clen, repeatCol); c < cmax; c++) {
            if (c < clen) {
              for (r = 0, rlen = input[c].length; r < repeatRow - rlen; r++) {
                input[c].push(input[c][r % rlen]);
              }
              input[c].unshift(start.col + c, start.row, 0);
              instance.spliceCol.apply(instance, input[c]);
            } else {
              input[c % clen][0] = start.col + c;
              instance.spliceCol.apply(instance, input[c % clen]);
            }
          }
          break;
        case 'shift_right':
          repeatCol = end ? end.col - start.col + 1 : 0;
          repeatRow = end ? end.row - start.row + 1 : 0;
          for (r = 0, rlen = input.length, rmax = Math.max(rlen, repeatRow); r < rmax; r++) {
            if (r < rlen) {
              for (c = 0, clen = input[r].length; c < repeatCol - clen; c++) {
                input[r].push(input[r][c % clen]);
              }
              input[r].unshift(start.row + r, start.col, 0);
              instance.spliceRow.apply(instance, input[r]);
            } else {
              input[r % rlen][0] = start.row + r;
              instance.spliceRow.apply(instance, input[r % rlen]);
            }
          }
          break;
        case 'overwrite':
        default:
          current.row = start.row;
          current.col = start.col;
          var selected = {
            row: (end && start) ? (end.row - start.row + 1) : 1,
            col: (end && start) ? (end.col - start.col + 1) : 1
          };
          var skippedRow = 0;
          var skippedColumn = 0;
          var pushData = true;
          var cellMeta;
          var iterators = {
            row: 1,
            col: 1
          };
          var getInputValue = function getInputValue(row) {
            var col = arguments[1] !== (void 0) ? arguments[1] : null;
            var rowValue = input[row % input.length];
            if (col !== null) {
              return rowValue[col % rowValue.length];
            }
            return rowValue;
          };
          var rowInputLength = input.length;
          var rowSelectionLength = end ? end.row - start.row + 1 : 0;
          if (end) {
            rlen = rowSelectionLength;
          } else {
            rlen = Math.max(rowInputLength, rowSelectionLength);
          }
          for (r = 0; r < rlen; r++) {
            if ((end && current.row > end.row && rowSelectionLength > rowInputLength) || (!priv.settings.allowInsertRow && current.row > instance.countRows() - 1) || (current.row >= priv.settings.maxRows)) {
              break;
            }
            var logicalRow = r - skippedRow;
            var colInputLength = getInputValue(logicalRow).length;
            var colSelectionLength = end ? end.col - start.col + 1 : 0;
            if (end) {
              clen = colSelectionLength;
            } else {
              clen = Math.max(colInputLength, colSelectionLength);
            }
            current.col = start.col;
            cellMeta = instance.getCellMeta(current.row, current.col);
            if ((source === 'paste' || source === 'autofill') && cellMeta.skipRowOnPaste) {
              skippedRow++;
              current.row++;
              rlen++;
              continue;
            }
            skippedColumn = 0;
            for (c = 0; c < clen; c++) {
              if ((end && current.col > end.col && colSelectionLength > colInputLength) || (!priv.settings.allowInsertColumn && current.col > instance.countCols() - 1) || (current.col >= priv.settings.maxCols)) {
                break;
              }
              cellMeta = instance.getCellMeta(current.row, current.col);
              if ((source === 'paste' || source === 'autofill') && cellMeta.skipColumnOnPaste) {
                skippedColumn++;
                current.col++;
                clen++;
                continue;
              }
              if (cellMeta.readOnly) {
                current.col++;
                continue;
              }
              var logicalColumn = c - skippedColumn;
              var value = getInputValue(logicalRow, logicalColumn);
              var orgValue = instance.getDataAtCell(current.row, current.col);
              var index = {
                row: logicalRow,
                col: logicalColumn
              };
              if (source === 'autofill') {
                index.row = index.row % input.length;
                index.col = index.col % input[0].length;
                var result = instance.runHooks('beforeAutofillInsidePopulate', index, direction, input, deltas, iterators, selected);
                iterators = result.iterators;
                if (result) {
                  value = typeof(result.value) === 'undefined' ? value : result.value;
                }
              }
              if (value !== null && typeof value === 'object') {
                if (orgValue === null || typeof orgValue !== 'object') {
                  pushData = false;
                } else {
                  var orgValueSchema = duckSchema(orgValue[0] || orgValue);
                  var valueSchema = duckSchema(value[0] || value);
                  if (isObjectEquals(orgValueSchema, valueSchema)) {
                    value = deepClone(value);
                  } else {
                    pushData = false;
                  }
                }
              } else if (orgValue !== null && typeof orgValue === 'object') {
                pushData = false;
              }
              if (pushData) {
                setData.push([current.row, current.col, value]);
              }
              pushData = true;
              current.col++;
            }
            current.row++;
          }
          instance.setDataAtCell(setData, null, null, source || 'populateFromArray');
          break;
      }
    }
  };
  this.selection = selection = {
    inProgress: false,
    selectedHeader: {
      cols: false,
      rows: false
    },
    setSelectedHeaders: function(rows, cols) {
      instance.selection.selectedHeader.rows = rows;
      instance.selection.selectedHeader.cols = cols;
    },
    begin: function() {
      instance.selection.inProgress = true;
    },
    finish: function() {
      var sel = instance.getSelected();
      Handsontable.hooks.run(instance, 'afterSelectionEnd', sel[0], sel[1], sel[2], sel[3]);
      Handsontable.hooks.run(instance, 'afterSelectionEndByProp', sel[0], instance.colToProp(sel[1]), sel[2], instance.colToProp(sel[3]));
      instance.selection.inProgress = false;
    },
    isInProgress: function() {
      return instance.selection.inProgress;
    },
    setRangeStart: function(coords, keepEditorOpened) {
      Handsontable.hooks.run(instance, 'beforeSetRangeStart', coords);
      priv.selRange = new WalkontableCellRange(coords, coords, coords);
      selection.setRangeEnd(coords, null, keepEditorOpened);
    },
    setRangeEnd: function(coords, scrollToCell, keepEditorOpened) {
      if (priv.selRange === null) {
        return;
      }
      var disableVisualSelection,
          isHeaderSelected = false,
          areCoordsPositive = true;
      var firstVisibleRow = instance.view.wt.wtTable.getFirstVisibleRow();
      var firstVisibleColumn = instance.view.wt.wtTable.getFirstVisibleColumn();
      var newRangeCoords = {
        row: null,
        col: null
      };
      Handsontable.hooks.run(instance, 'beforeSetRangeEnd', coords);
      instance.selection.begin();
      newRangeCoords.row = coords.row < 0 ? firstVisibleRow : coords.row;
      newRangeCoords.col = coords.col < 0 ? firstVisibleColumn : coords.col;
      priv.selRange.to = new WalkontableCellCoords(newRangeCoords.row, newRangeCoords.col);
      if (!priv.settings.multiSelect) {
        priv.selRange.from = coords;
      }
      instance.view.wt.selections.current.clear();
      disableVisualSelection = instance.getCellMeta(priv.selRange.highlight.row, priv.selRange.highlight.col).disableVisualSelection;
      if (typeof disableVisualSelection === 'string') {
        disableVisualSelection = [disableVisualSelection];
      }
      if (disableVisualSelection === false || Array.isArray(disableVisualSelection) && disableVisualSelection.indexOf('current') === -1) {
        instance.view.wt.selections.current.add(priv.selRange.highlight);
      }
      instance.view.wt.selections.area.clear();
      if ((disableVisualSelection === false || Array.isArray(disableVisualSelection) && disableVisualSelection.indexOf('area') === -1) && selection.isMultiple()) {
        instance.view.wt.selections.area.add(priv.selRange.from);
        instance.view.wt.selections.area.add(priv.selRange.to);
      }
      if (priv.settings.currentRowClassName || priv.settings.currentColClassName) {
        instance.view.wt.selections.highlight.clear();
        instance.view.wt.selections.highlight.add(priv.selRange.from);
        instance.view.wt.selections.highlight.add(priv.selRange.to);
      }
      Handsontable.hooks.run(instance, 'afterSelection', priv.selRange.from.row, priv.selRange.from.col, priv.selRange.to.row, priv.selRange.to.col);
      Handsontable.hooks.run(instance, 'afterSelectionByProp', priv.selRange.from.row, datamap.colToProp(priv.selRange.from.col), priv.selRange.to.row, datamap.colToProp(priv.selRange.to.col));
      if ((priv.selRange.from.row === 0 && priv.selRange.to.row === instance.countRows() - 1 && instance.countRows() > 1) || (priv.selRange.from.col === 0 && priv.selRange.to.col === instance.countCols() - 1 && instance.countCols() > 1)) {
        isHeaderSelected = true;
      }
      if (coords.row < 0 || coords.col < 0) {
        areCoordsPositive = false;
      }
      if (scrollToCell !== false && !isHeaderSelected && areCoordsPositive) {
        if (priv.selRange.from && !selection.isMultiple()) {
          instance.view.scrollViewport(priv.selRange.from);
        } else {
          instance.view.scrollViewport(coords);
        }
      }
      selection.refreshBorders(null, keepEditorOpened, true);
    },
    refreshBorders: function(revertOriginal, keepEditor, noRerender) {
      if (!keepEditor) {
        editorManager.destroyEditor(revertOriginal);
      }
      if (noRerender) {
        instance.forceFullRender = false;
        instance.runHooks('menuRowChange');
      }
      instance.view.render();
      if (selection.isSelected() && !keepEditor) {
        editorManager.prepareEditor();
      }
    },
    isMultiple: function() {
      var isMultiple = !(priv.selRange.to.col === priv.selRange.from.col && priv.selRange.to.row === priv.selRange.from.row),
          modifier = Handsontable.hooks.run(instance, 'afterIsMultipleSelection', isMultiple);
      if (isMultiple) {
        return modifier;
      }
    },
    transformStart: function(rowDelta, colDelta, force, keepEditorOpened) {
      var delta = new WalkontableCellCoords(rowDelta, colDelta),
          rowTransformDir = 0,
          colTransformDir = 0,
          totalRows,
          totalCols,
          coords,
          fixedRowsBottom;
      instance.runHooks('modifyTransformStart', delta);
      totalRows = instance.countRows();
      totalCols = instance.countCols();
      fixedRowsBottom = instance.getSettings().fixedRowsBottom;
      if (priv.selRange.highlight.row + rowDelta > totalRows - 1) {
        if (force && priv.settings.minSpareRows > 0 && !(fixedRowsBottom && priv.selRange.highlight.row >= totalRows - fixedRowsBottom - 1)) {
          instance.alter('insert_row', totalRows);
          totalRows = instance.countRows();
        } else if (priv.settings.autoWrapCol) {
          delta.row = 1 - totalRows;
          delta.col = priv.selRange.highlight.col + delta.col == totalCols - 1 ? 1 - totalCols : 1;
        }
      } else if (priv.settings.autoWrapCol && priv.selRange.highlight.row + delta.row < 0 && priv.selRange.highlight.col + delta.col >= 0) {
        delta.row = totalRows - 1;
        delta.col = priv.selRange.highlight.col + delta.col == 0 ? totalCols - 1 : -1;
      }
      if (priv.selRange.highlight.col + delta.col > totalCols - 1) {
        if (force && priv.settings.minSpareCols > 0) {
          instance.alter('insert_col', totalCols);
          totalCols = instance.countCols();
        } else if (priv.settings.autoWrapRow) {
          delta.row = priv.selRange.highlight.row + delta.row == totalRows - 1 ? 1 - totalRows : 1;
          delta.col = 1 - totalCols;
        }
      } else if (priv.settings.autoWrapRow && priv.selRange.highlight.col + delta.col < 0 && priv.selRange.highlight.row + delta.row >= 0) {
        delta.row = priv.selRange.highlight.row + delta.row == 0 ? totalRows - 1 : -1;
        delta.col = totalCols - 1;
      }
      coords = new WalkontableCellCoords(priv.selRange.highlight.row + delta.row, priv.selRange.highlight.col + delta.col);
      if (coords.row < 0) {
        rowTransformDir = -1;
        coords.row = 0;
      } else if (coords.row > 0 && coords.row >= totalRows) {
        rowTransformDir = 1;
        coords.row = totalRows - 1;
      }
      if (coords.col < 0) {
        colTransformDir = -1;
        coords.col = 0;
      } else if (coords.col > 0 && coords.col >= totalCols) {
        colTransformDir = 1;
        coords.col = totalCols - 1;
      }
      instance.runHooks('afterModifyTransformStart', coords, rowTransformDir, colTransformDir);
      selection.setRangeStart(coords, keepEditorOpened);
    },
    transformEnd: function(rowDelta, colDelta) {
      var delta = new WalkontableCellCoords(rowDelta, colDelta),
          rowTransformDir = 0,
          colTransformDir = 0,
          totalRows,
          totalCols,
          coords;
      instance.runHooks('modifyTransformEnd', delta);
      totalRows = instance.countRows();
      totalCols = instance.countCols();
      coords = new WalkontableCellCoords(priv.selRange.to.row + delta.row, priv.selRange.to.col + delta.col);
      if (coords.row < 0) {
        rowTransformDir = -1;
        coords.row = 0;
      } else if (coords.row > 0 && coords.row >= totalRows) {
        rowTransformDir = 1;
        coords.row = totalRows - 1;
      }
      if (coords.col < 0) {
        colTransformDir = -1;
        coords.col = 0;
      } else if (coords.col > 0 && coords.col >= totalCols) {
        colTransformDir = 1;
        coords.col = totalCols - 1;
      }
      instance.runHooks('afterModifyTransformEnd', coords, rowTransformDir, colTransformDir);
      selection.setRangeEnd(coords, true);
    },
    isSelected: function() {
      return (priv.selRange !== null);
    },
    inInSelection: function(coords) {
      if (!selection.isSelected()) {
        return false;
      }
      return priv.selRange.includes(coords);
    },
    deselect: function() {
      if (!selection.isSelected()) {
        return;
      }
      instance.selection.inProgress = false;
      priv.selRange = null;
      instance.view.wt.selections.current.clear();
      instance.view.wt.selections.area.clear();
      if (priv.settings.currentRowClassName || priv.settings.currentColClassName) {
        instance.view.wt.selections.highlight.clear();
      }
      editorManager.destroyEditor();
      selection.refreshBorders();
      Handsontable.hooks.run(instance, 'afterDeselect');
    },
    selectAll: function() {
      if (!priv.settings.multiSelect) {
        return;
      }
      selection.setRangeStart(new WalkontableCellCoords(0, 0));
      selection.setRangeEnd(new WalkontableCellCoords(instance.countRows() - 1, instance.countCols() - 1), false);
    },
    empty: function() {
      if (!selection.isSelected()) {
        return;
      }
      var topLeft = priv.selRange.getTopLeftCorner();
      var bottomRight = priv.selRange.getBottomRightCorner();
      var r,
          c,
          changes = [];
      for (r = topLeft.row; r <= bottomRight.row; r++) {
        for (c = topLeft.col; c <= bottomRight.col; c++) {
          if (!instance.getCellMeta(r, c).readOnly) {
            changes.push([r, c, '']);
          }
        }
      }
      instance.setDataAtCell(changes);
    }
  };
  this.init = function() {
    Handsontable.hooks.run(instance, 'beforeInit');
    if (Handsontable.mobileBrowser) {
      addClass(instance.rootElement, 'mobile');
    }
    this.updateSettings(priv.settings, true);
    this.view = new TableView(this);
    editorManager = new EditorManager(instance, priv, selection, datamap);
    this.forceFullRender = true;
    Handsontable.hooks.run(instance, 'init');
    this.view.render();
    if (typeof priv.firstRun === 'object') {
      Handsontable.hooks.run(instance, 'afterChange', priv.firstRun[0], priv.firstRun[1]);
      priv.firstRun = false;
    }
    Handsontable.hooks.run(instance, 'afterInit');
  };
  function updateCellPropoties(action, index, amount) {
    var settingList = priv.cellSettings;
    var rowItem,
        cellItem;
    if (action === 'remove_row' || action === 'remove_col') {
      return;
    }
    for (var i = 0; i < settingList.length; i++) {
      rowItem = settingList[i];
      for (var k = 0; k < rowItem.length; k++) {
        cellItem = rowItem[k];
        if (action === 'insert_row' && index < i) {
          cellItem.row += amount;
        }
        if (action === 'insert_col' && index < k) {
          cellItem.col += amount;
        }
      }
      if (action === 'insert_col') {
        for (var n = 0; n < amount; n++) {
          rowItem.splice(index, 0, new priv.columnSettings[index + n + 1]());
        }
      }
    }
    if (action === 'insert_row') {
      for (var m = 0; m < amount; m++) {
        settingList.splice(index, 0, []);
      }
    }
  }
  ;
  function updateColWidthAndRowHeight(action, index, amount) {
    var commonCell = priv.cellSettings[0][0],
        colWidths = commonCell.colWidths,
        rowHeights = commonCell.rowHeights,
        defaultHeight = undefined,
        defaultWidth = instance.getSettings().defaultColWidth || 100;
    if (typeof rowHeights !== 'object' || typeof colWidths !== 'object') {
      return;
    }
    switch (action) {
      case 'remove_row':
        rowHeights.splice(index, amount);
        Handsontable.hooks.run(instance, 'updateRowHeightAfterRemoveRow', index, amount);
        break;
      case 'remove_col':
        colWidths.splice(index, amount);
        Handsontable.hooks.run(instance, 'updateColWidthAfterRemoveCol', index, amount);
        break;
      case 'insert_row':
        for (var i = 0; i < amount; i++) {
          rowHeights.splice(index, 0, defaultHeight);
        }
        Handsontable.hooks.run(instance, 'updateRowHeightAfterAddRow', index, amount);
        break;
      case 'insert_col':
        for (var i = 0; i < amount; i++) {
          colWidths.splice(index, 0, defaultWidth);
        }
        Handsontable.hooks.run(instance, 'updateColWidthAfterAddCol', index, amount);
        break;
    }
  }
  ;
  function ValidatorsQueue() {
    var resolved = false;
    return {
      validatorsInQueue: 0,
      valid: true,
      addValidatorToQueue: function() {
        this.validatorsInQueue++;
        resolved = false;
      },
      removeValidatorFormQueue: function() {
        this.validatorsInQueue = this.validatorsInQueue - 1 < 0 ? 0 : this.validatorsInQueue - 1;
        this.checkIfQueueIsEmpty();
      },
      onQueueEmpty: function(valid) {},
      checkIfQueueIsEmpty: function() {
        if (this.validatorsInQueue == 0 && resolved == false) {
          resolved = true;
          this.onQueueEmpty(this.valid);
        }
      }
    };
  }
  function validateChanges(changes, source, callback) {
    var waitingForValidator = new ValidatorsQueue();
    waitingForValidator.onQueueEmpty = resolve;
    for (var i = changes.length - 1; i >= 0; i--) {
      if (changes[i] === null) {
        changes.splice(i, 1);
      } else {
        var row = changes[i][0];
        var col = datamap.propToCol(changes[i][1]);
        var logicalCol = instance.runHooks('modifyCol', col);
        var cellProperties = instance.getCellMeta(row, logicalCol);
        if (cellProperties.type === 'numeric' && typeof changes[i][3] === 'string') {
          if (changes[i][3].length > 0 && (/^-?[\d\s]*(\.|\,)?\d*$/.test(changes[i][3]) || cellProperties.format)) {
            var len = changes[i][3].length;
            if (typeof cellProperties.language == 'undefined') {
              numeral.language('en');
            } else if (changes[i][3].indexOf('.') === len - 3 && changes[i][3].indexOf(',') === -1) {
              numeral.language('en');
            } else {
              numeral.language(cellProperties.language);
            }
            if (numeral.validate(changes[i][3])) {
              changes[i][3] = numeral().unformat(changes[i][3]);
            }
          }
        }
        if (instance.getCellValidator(cellProperties)) {
          waitingForValidator.addValidatorToQueue();
          instance.validateCell(changes[i][3], cellProperties, (function(i, cellProperties) {
            return function(result) {
              if (typeof result !== 'boolean') {
                throw new Error('Validation error: result is not boolean');
              }
              if (result === false && cellProperties.allowInvalid === false) {
                changes.splice(i, 1);
                cellProperties.valid = true;
                --i;
              }
              waitingForValidator.removeValidatorFormQueue();
            };
          })(i, cellProperties), source);
        }
      }
    }
    waitingForValidator.checkIfQueueIsEmpty();
    function resolve() {
      var beforeChangeResult;
      if (changes.length) {
        beforeChangeResult = Handsontable.hooks.run(instance, 'beforeChange', changes, source);
        if (typeof beforeChangeResult === 'function') {
          console.warn('Your beforeChange callback returns a function. It\'s not supported since Handsontable 0.12.1 (and the returned function will not be executed).');
        } else if (beforeChangeResult === false) {
          changes.splice(0, changes.length);
        }
      }
      callback();
    }
  }
  function applyChanges(changes, source) {
    var i = changes.length - 1;
    if (i < 0) {
      return;
    }
    for (; 0 <= i; i--) {
      if (changes[i] === null) {
        changes.splice(i, 1);
        continue;
      }
      if (changes[i][2] == null && changes[i][3] == null) {
        continue;
      }
      if (priv.settings.allowInsertRow) {
        while (changes[i][0] > instance.countRows() - 1) {
          datamap.createRow();
        }
      }
      if (instance.dataType === 'array' && priv.settings.allowInsertColumn) {
        while (datamap.propToCol(changes[i][1]) > instance.countCols() - 1) {
          datamap.createCol();
        }
      }
      datamap.set(changes[i][0], changes[i][1], changes[i][3]);
    }
    instance.forceFullRender = true;
    grid.adjustRowsAndCols();
    Handsontable.hooks.run(instance, 'beforeChangeRender', changes, source);
    if ((source == 'edit' || source == 'from_server') && changes.length == 1) {
      var _change = changes[0],
          _row = _change[0],
          _col = _change[1],
          td;
      td = instance.getCell(_row, _col, true);
      instance.view.wt.wtSettings.settings.cellRenderer(_row, _col, td);
    } else {
      selection.refreshBorders(null, true);
    }
    instance.view.wt.wtOverlays.adjustElementsSize();
    Handsontable.hooks.run(instance, 'afterChange', changes, source || 'edit');
  }
  this.validateCell = function(value, cellProperties, callback, source) {
    var validator = instance.getCellValidator(cellProperties);
    function done(valid) {
      var col = cellProperties.col,
          row = cellProperties.row,
          td = instance.getCell(row, col, true);
      if (td) {
        instance.view.wt.wtSettings.settings.cellRenderer(row, col, td);
      }
      callback(valid);
    }
    if (Object.prototype.toString.call(validator) === '[object RegExp]') {
      validator = (function(validator) {
        return function(value, callback) {
          callback(validator.test(value));
        };
      })(validator);
    }
    if (typeof validator == 'function') {
      value = Handsontable.hooks.run(instance, 'beforeValidate', value, cellProperties.row, cellProperties.prop, source);
      instance._registerTimeout(setTimeout(function() {
        validator.call(cellProperties, value, function(valid) {
          valid = Handsontable.hooks.run(instance, 'afterValidate', valid, value, cellProperties.row, cellProperties.prop, source);
          cellProperties.valid = valid;
          done(valid);
          Handsontable.hooks.run(instance, 'postAfterValidate', valid, value, cellProperties.row, cellProperties.prop, source);
        });
      }, 0));
    } else {
      cellProperties.valid = true;
      done(cellProperties.valid);
    }
  };
  function setDataInputToArray(row, propOrCol, value) {
    if (typeof row === 'object') {
      return row;
    } else {
      return [[row, propOrCol, value]];
    }
  }
  this.setDataAtCell = function(row, col, value, source) {
    var input = setDataInputToArray(row, col, value),
        i,
        ilen,
        changes = [],
        prop;
    for (i = 0, ilen = input.length; i < ilen; i++) {
      if (typeof input[i] !== 'object') {
        throw new Error('Method `setDataAtCell` accepts row number or changes array of arrays as its first parameter');
      }
      if (typeof input[i][1] !== 'number') {
        throw new Error('Method `setDataAtCell` accepts row and column number as its parameters. If you want to use object property name, use method `setDataAtRowProp`');
      }
      prop = datamap.colToProp(input[i][1]);
      changes.push([input[i][0], prop, datamap.get(input[i][0], prop), input[i][2]]);
    }
    if (!source && typeof row === 'object') {
      source = col;
    }
    validateChanges(changes, source, function() {
      applyChanges(changes, source);
    });
  };
  this.setDataAtRowProp = function(row, prop, value, source) {
    var input = setDataInputToArray(row, prop, value),
        i,
        ilen,
        changes = [];
    for (i = 0, ilen = input.length; i < ilen; i++) {
      changes.push([input[i][0], input[i][1], datamap.get(input[i][0], input[i][1]), input[i][2]]);
    }
    if (!source && typeof row === 'object') {
      source = prop;
    }
    validateChanges(changes, source, function() {
      applyChanges(changes, source);
    });
  };
  this.listen = function() {
    Handsontable.activeGuid = instance.guid;
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    } else if (!document.activeElement) {
      document.body.focus();
    }
  };
  this.unlisten = function() {
    Handsontable.activeGuid = null;
  };
  this.isListening = function() {
    return Handsontable.activeGuid === instance.guid;
  };
  this.destroyEditor = function(revertOriginal) {
    selection.refreshBorders(revertOriginal);
  };
  this.populateFromArray = function(row, col, input, endRow, endCol, source, method, direction, deltas) {
    var c;
    if (!(typeof input === 'object' && typeof input[0] === 'object')) {
      throw new Error('populateFromArray parameter `input` must be an array of arrays');
    }
    c = typeof endRow === 'number' ? new WalkontableCellCoords(endRow, endCol) : null;
    return grid.populateFromArray(new WalkontableCellCoords(row, col), input, c, source, method, direction, deltas);
  };
  this.spliceCol = function(col, index, amount) {
    return datamap.spliceCol.apply(datamap, arguments);
  };
  this.spliceRow = function(row, index, amount) {
    return datamap.spliceRow.apply(datamap, arguments);
  };
  this.getSelected = function() {
    if (selection.isSelected()) {
      return [priv.selRange.from.row, priv.selRange.from.col, priv.selRange.to.row, priv.selRange.to.col];
    }
  };
  this.getSelectedRange = function() {
    if (selection.isSelected()) {
      return priv.selRange;
    }
  };
  this.render = function() {
    if (instance.view) {
      instance.renderCall = true;
      instance.forceFullRender = true;
      selection.refreshBorders(null, true);
    }
  };
  this.loadData = function(data) {
    if (typeof data === 'object' && data !== null) {
      if (!(data.push && data.splice)) {
        data = [data];
      }
    } else if (data === null) {
      data = [];
      var row;
      for (var r = 0,
          rlen = priv.settings.startRows; r < rlen; r++) {
        row = [];
        for (var c = 0,
            clen = priv.settings.startCols; c < clen; c++) {
          row.push(null);
        }
        data.push(row);
      }
    } else {
      throw new Error('loadData only accepts array of objects or array of arrays (' + typeof data + ' given)');
    }
    priv.isPopulated = false;
    GridSettings.prototype.data = data;
    if (Array.isArray(priv.settings.dataSchema) || Array.isArray(data[0])) {
      instance.dataType = 'array';
    } else if (typeof priv.settings.dataSchema === 'function') {
      instance.dataType = 'function';
    } else {
      instance.dataType = 'object';
    }
    datamap = new DataMap(instance, priv, GridSettings);
    clearCellSettingCache();
    grid.adjustRowsAndCols();
    Handsontable.hooks.run(instance, 'afterLoadData');
    if (priv.firstRun) {
      priv.firstRun = [null, 'loadData'];
    } else {
      Handsontable.hooks.run(instance, 'afterChange', null, 'loadData');
      instance.render();
    }
    priv.isPopulated = true;
    function clearCellSettingCache() {
      priv.cellSettings.length = 0;
    }
  };
  this.getData = function(r, c, r2, c2) {
    if (typeof r === 'undefined') {
      return datamap.getAll();
    } else {
      return datamap.getRange(new WalkontableCellCoords(r, c), new WalkontableCellCoords(r2, c2), datamap.DESTINATION_RENDERER);
    }
  };
  this.getCopyableText = function(startRow, startCol, endRow, endCol) {
    return datamap.getCopyableText(new WalkontableCellCoords(startRow, startCol), new WalkontableCellCoords(endRow, endCol));
  };
  this.getCopyableData = function(row, column) {
    return datamap.getCopyable(row, datamap.colToProp(column));
  };
  this.getSchema = function() {
    return datamap.getSchema();
  };
  this.updateSettings = function(settings, init, noRefresh) {
    var i,
        clen;
    Handsontable.noRefresh = noRefresh;
    if (typeof settings.rows !== 'undefined') {
      throw new Error('"rows" setting is no longer supported. do you mean startRows, minRows or maxRows?');
    }
    if (typeof settings.cols !== 'undefined') {
      throw new Error('"cols" setting is no longer supported. do you mean startCols, minCols or maxCols?');
    }
    for (i in settings) {
      if (i === 'data') {
        continue;
      } else {
        if (Handsontable.hooks.getRegistered().indexOf(i) > -1) {
          if (typeof settings[i] === 'function' || Array.isArray(settings[i])) {
            instance.addHook(i, settings[i]);
          }
        } else {
          if (!init && settings.hasOwnProperty(i)) {
            GridSettings.prototype[i] = settings[i];
          }
        }
      }
    }
    if (settings.data === void 0 && priv.settings.data === void 0) {
      instance.loadData(null);
    } else if (settings.data !== void 0) {
      instance.loadData(settings.data);
    } else if (settings.columns !== void 0) {
      datamap.createMap();
    }
    clen = instance.countCols();
    if (clen > 0) {
      var proto,
          column;
      for (i = 0; i < clen; i++) {
        priv.columnSettings[i] = columnFactory(GridSettings, priv.columnsSettingConflicts);
        proto = priv.columnSettings[i].prototype;
        if (GridSettings.prototype.columns) {
          column = GridSettings.prototype.columns[i];
          extend(proto, column);
          extend(proto, expandType(column));
        }
      }
    }
    if (typeof settings.cell !== 'undefined') {
      for (i in settings.cell) {
        if (settings.cell.hasOwnProperty(i)) {
          var cell = settings.cell[i];
          instance.setCellMetaObject(cell.row, cell.col, cell);
        }
      }
    }
    Handsontable.hooks.run(instance, 'afterCellMetaReset');
    if (typeof settings.className !== 'undefined') {
      if (GridSettings.prototype.className) {
        removeClass(instance.rootElement, GridSettings.prototype.className);
      }
      if (settings.className) {
        addClass(instance.rootElement, settings.className);
      }
    }
    if (typeof settings.height != 'undefined') {
      var height = settings.height;
      if (typeof height == 'function') {
        height = height();
      }
      instance.rootElement.style.height = height + 'px';
    }
    if (typeof settings.width != 'undefined') {
      var width = settings.width;
      if (typeof width == 'function') {
        width = width();
      }
      instance.rootElement.style.width = width + 'px';
    }
    if (height) {
      instance.rootElement.style.overflow = 'hidden';
    }
    if (!init && (settings.fixedRowsTop || settings.fixedColumnsLeft)) {
      instance.view.wt.draw(false);
    }
    if (!init) {
      Handsontable.hooks.run(instance, 'afterUpdateSettings');
    }
    grid.adjustRowsAndCols();
    if (instance.view && !priv.firstRun) {
      instance.forceFullRender = true;
      selection.refreshBorders(null, true);
    }
    Handsontable.noRefresh = false;
  };
  this.getValue = function() {
    var sel = instance.getSelected();
    if (GridSettings.prototype.getValue) {
      if (typeof GridSettings.prototype.getValue === 'function') {
        return GridSettings.prototype.getValue.call(instance);
      } else if (sel) {
        return instance.getData()[sel[0]][GridSettings.prototype.getValue];
      }
    } else if (sel) {
      return instance.getDataAtCell(sel[0], sel[1]);
    }
  };
  function expandType(obj) {
    if (!obj.hasOwnProperty('type')) {
      return;
    }
    var type,
        expandedType = {};
    if (typeof obj.type === 'object') {
      type = obj.type;
    } else if (typeof obj.type === 'string') {
      type = Handsontable.cellTypes[obj.type];
      if (type === void 0) {
        throw new Error('You declared cell type "' + obj.type + '" as a string that is not mapped to a known object. Cell type must be an object or a string mapped to an object in Handsontable.cellTypes');
      }
    }
    for (var i in type) {
      if (type.hasOwnProperty(i) && !obj.hasOwnProperty(i)) {
        expandedType[i] = type[i];
      }
    }
    return expandedType;
  }
  this.getSettings = function() {
    return priv.settings;
  };
  this.clear = function() {
    selection.selectAll();
    selection.empty();
  };
  this.alter = function(action, index, amount, source, keepEmptyRows) {
    grid.alter(action, index, amount, source, keepEmptyRows);
  };
  this.getCell = function(row, col, topmost) {
    return instance.view.getCellAtCoords(new WalkontableCellCoords(row, col), topmost);
  };
  this.getCoords = function(elem) {
    return this.view.wt.wtTable.getCoords.call(this.view.wt.wtTable, elem);
  };
  this.colToProp = function(col) {
    return datamap.colToProp(col);
  };
  this.propToCol = function(prop) {
    return datamap.propToCol(prop);
  };
  this.getDataAtCell = function(row, col) {
    return datamap.get(row, datamap.colToProp(col));
  };
  this.getDataAtRowProp = function(row, prop) {
    return datamap.get(row, prop);
  };
  this.getDataAtCol = function(col) {
    var out = [];
    return out.concat.apply(out, datamap.getRange(new WalkontableCellCoords(0, col), new WalkontableCellCoords(priv.settings.data.length - 1, col), datamap.DESTINATION_RENDERER));
  };
  this.getDataAtProp = function(prop) {
    var out = [],
        range;
    range = datamap.getRange(new WalkontableCellCoords(0, datamap.propToCol(prop)), new WalkontableCellCoords(priv.settings.data.length - 1, datamap.propToCol(prop)), datamap.DESTINATION_RENDERER);
    return out.concat.apply(out, range);
  };
  this.getSourceDataAtCol = function(col) {
    var out = [],
        data = priv.settings.data;
    for (var i = 0; i < data.length; i++) {
      out.push(data[i][col]);
    }
    return out;
  };
  this.getSourceDataAtRow = function(row) {
    return priv.settings.data[row];
  };
  this.getDataAtRow = function(row) {
    var data = datamap.getRange(new WalkontableCellCoords(row, 0), new WalkontableCellCoords(row, this.countCols() - 1), datamap.DESTINATION_RENDERER);
    return data[0];
  };
  this.getDataType = function(rowFrom, columnFrom, rowTo, columnTo) {
    var $__18 = this;
    var previousType = null;
    var currentType = null;
    if (rowFrom === void 0) {
      rowFrom = 0;
      rowTo = this.countRows();
      columnFrom = 0;
      columnTo = this.countCols();
    }
    if (rowTo === void 0) {
      rowTo = rowFrom;
    }
    if (columnTo === void 0) {
      columnTo = columnFrom;
    }
    var type = 'mixed';
    rangeEach(Math.min(rowFrom, rowTo), Math.max(rowFrom, rowTo), (function(row) {
      var isTypeEqual = true;
      rangeEach(Math.min(columnFrom, columnTo), Math.max(columnFrom, columnTo), (function(column) {
        var cellType = $__18.getCellMeta(row, column);
        currentType = cellType.type;
        if (previousType) {
          isTypeEqual = previousType === currentType;
        } else {
          previousType = currentType;
        }
        return isTypeEqual;
      }));
      type = isTypeEqual ? currentType : 'mixed';
      return isTypeEqual;
    }));
    return type;
  };
  this.removeCellMeta = function(row, col, key) {
    var cellMeta = instance.getCellMeta(row, col);
    if (cellMeta[key] != undefined) {
      delete priv.cellSettings[row][col][key];
    }
  };
  this.setCellMetaObject = function(row, col, prop) {
    if (typeof prop === 'object') {
      for (var key in prop) {
        if (prop.hasOwnProperty(key)) {
          var value = prop[key];
          this.setCellMeta(row, col, key, value);
        }
      }
    }
  };
  this.setCellMeta = function(row, col, key, val) {
    if (!priv.cellSettings[row]) {
      priv.cellSettings[row] = [];
    }
    if (!priv.cellSettings[row][col]) {
      priv.cellSettings[row][col] = new priv.columnSettings[col]();
    }
    priv.cellSettings[row][col][key] = val;
    Handsontable.hooks.run(instance, 'afterSetCellMeta', row, col, key, val);
  };
  this.getCellsMeta = function() {
    return arrayFlatten(priv.cellSettings);
  };
  this.getCellMeta = function(row, col) {
    var prop = datamap.colToProp(col),
        cellProperties;
    row = translateRowIndex(row);
    col = translateColIndex(col);
    if (!priv.columnSettings[col]) {
      priv.columnSettings[col] = columnFactory(GridSettings, priv.columnsSettingConflicts);
    }
    if (!priv.cellSettings[row]) {
      priv.cellSettings[row] = [];
    }
    if (!priv.cellSettings[row][col]) {
      priv.cellSettings[row][col] = new priv.columnSettings[col]();
    }
    cellProperties = priv.cellSettings[row][col];
    cellProperties.row = row;
    cellProperties.col = col;
    cellProperties.prop = prop;
    cellProperties.instance = instance;
    Handsontable.hooks.run(instance, 'beforeGetCellMeta', row, col, cellProperties);
    extend(cellProperties, expandType(cellProperties));
    if (cellProperties.cells) {
      var settings = cellProperties.cells.call(cellProperties, row, col, prop);
      if (settings) {
        extend(cellProperties, settings);
        extend(cellProperties, expandType(settings));
      }
    }
    Handsontable.hooks.run(instance, 'afterGetCellMeta', row, col, cellProperties);
    return cellProperties;
  };
  this.isColumnModificationAllowed = function() {
    return !(instance.dataType === 'object' || instance.getSettings().columns);
  };
  function translateRowIndex(row) {
    return Handsontable.hooks.run(instance, 'modifyRow', row);
  }
  function translateColIndex(col) {
    return Handsontable.hooks.run(instance, 'modifyCol', col);
  }
  var rendererLookup = cellMethodLookupFactory('renderer');
  this.getCellRenderer = function(row, col) {
    var renderer = rendererLookup.call(this, row, col);
    return getRenderer(renderer);
  };
  this.getCellEditor = cellMethodLookupFactory('editor');
  this.getCellValidator = cellMethodLookupFactory('validator');
  this.validateCells = function(callback) {
    var waitingForValidator = new ValidatorsQueue();
    waitingForValidator.onQueueEmpty = callback;
    var i = instance.countRows() - 1;
    while (i >= 0) {
      var j = instance.countCols() - 1;
      while (j >= 0) {
        waitingForValidator.addValidatorToQueue();
        instance.validateCell(instance.getDataAtCell(i, j), instance.getCellMeta(i, j), function(result) {
          if (typeof result !== 'boolean') {
            throw new Error('Validation error: result is not boolean');
          }
          if (result === false) {
            waitingForValidator.valid = false;
          }
          waitingForValidator.removeValidatorFormQueue();
        }, 'validateCells');
        j--;
      }
      i--;
    }
    waitingForValidator.checkIfQueueIsEmpty();
  };
  this.getRowHeader = function(row) {
    if (row === void 0) {
      var out = [];
      for (var i = 0,
          ilen = instance.countRows(); i < ilen; i++) {
        out.push(instance.getRowHeader(i));
      }
      return out;
    } else if (Array.isArray(priv.settings.rowHeaders) && priv.settings.rowHeaders[row] !== void 0) {
      return priv.settings.rowHeaders[row];
    } else if (typeof priv.settings.rowHeaders === 'function') {
      return priv.settings.rowHeaders(row);
    } else if (priv.settings.rowHeaders && typeof priv.settings.rowHeaders !== 'string' && typeof priv.settings.rowHeaders !== 'number') {
      return row + 1;
    } else {
      return priv.settings.rowHeaders;
    }
  };
  this.hasRowHeaders = function() {
    return !!priv.settings.rowHeaders;
  };
  this.hasColHeaders = function() {
    if (priv.settings.colHeaders !== void 0 && priv.settings.colHeaders !== null) {
      return !!priv.settings.colHeaders;
    }
    for (var i = 0,
        ilen = instance.countCols(); i < ilen; i++) {
      if (instance.getColHeader(i)) {
        return true;
      }
    }
    return false;
  };
  this.getColHeader = function(col) {
    if (col === void 0) {
      var out = [];
      for (var i = 0,
          ilen = instance.countCols(); i < ilen; i++) {
        out.push(instance.getColHeader(i));
      }
      return out;
    } else {
      var baseCol = col;
      col = Handsontable.hooks.run(instance, 'modifyCol', col);
      if (priv.settings.columns && priv.settings.columns[col] && priv.settings.columns[col].title) {
        return priv.settings.columns[col].title;
      } else if (Array.isArray(priv.settings.colHeaders) && priv.settings.colHeaders[col] !== void 0) {
        return priv.settings.colHeaders[col];
      } else if (typeof priv.settings.colHeaders === 'function') {
        return priv.settings.colHeaders(col);
      } else if (priv.settings.colHeaders && typeof priv.settings.colHeaders !== 'string' && typeof priv.settings.colHeaders !== 'number') {
        return spreadsheetColumnLabel(baseCol);
      } else {
        return priv.settings.colHeaders;
      }
    }
  };
  this._getColWidthFromSettings = function(col) {
    var cellProperties = instance.getCellMeta(0, col);
    var width = cellProperties.width;
    if (width === void 0 || width === priv.settings.width) {
      width = cellProperties.colWidths;
    }
    if (width !== void 0 && width !== null) {
      switch (typeof width) {
        case 'object':
          width = width[col];
          break;
        case 'function':
          width = width(col);
          break;
      }
      if (typeof width === 'string') {
        width = parseInt(width, 10);
      }
    }
    return width;
  };
  this.getColWidth = function(col) {
    var width = instance._getColWidthFromSettings(col);
    width = Handsontable.hooks.run(instance, 'modifyColWidth', width, col);
    if (width === void 0) {
      width = WalkontableViewportColumnsCalculator.DEFAULT_WIDTH;
    }
    return width;
  };
  this._getRowHeightFromSettings = function(row) {
    var height = priv.settings.rowHeights;
    if (height !== void 0 && height !== null) {
      switch (typeof height) {
        case 'object':
          height = height[row];
          break;
        case 'function':
          height = height(row);
          break;
      }
      if (typeof height === 'string') {
        height = parseInt(height, 10);
      }
    }
    return height;
  };
  this.getRowHeight = function(row) {
    var height = instance._getRowHeightFromSettings(row);
    height = Handsontable.hooks.run(instance, 'modifyRowHeight', height, row);
    return height;
  };
  this.countRows = function() {
    return priv.settings.data.length;
  };
  this.countCols = function() {
    if (instance.dataType === 'object' || instance.dataType === 'function') {
      if (priv.settings.columns && priv.settings.columns.length) {
        return priv.settings.columns.length;
      } else {
        return datamap.colToPropCache.length;
      }
    } else if (instance.dataType === 'array') {
      if (priv.settings.columns && priv.settings.columns.length) {
        return priv.settings.columns.length;
      } else if (priv.settings.data && priv.settings.data[0] && priv.settings.data[0].length) {
        return priv.settings.data[0].length;
      } else {
        return 0;
      }
    }
  };
  this.getColspanOffset = function(col, level) {
    var colspanSum = 0;
    if (instance.colspanArray) {
      for (var i = 0; i < col; i++) {
        colspanSum += instance.colspanArray[level][i] - 1 || 0;
      }
      return colspanSum;
    }
    var colspanSum = 0;
    var TRindex = instance.view.wt.wtTable.THEAD.childNodes.length - level - 1;
    var TR = instance.view.wt.wtTable.THEAD.querySelector('tr:nth-child(' + parseInt(TRindex + 1, 10) + ')');
    var rowHeadersCount = instance.view.wt.wtSettings.settings.rowHeaders().length;
    for (var i = rowHeadersCount; i < rowHeadersCount + col; i++) {
      if (TR.childNodes[i].hasAttribute('colspan')) {
        colspanSum += parseInt(TR.childNodes[i].getAttribute('colspan'), 10) - 1;
      }
    }
    return colspanSum;
  };
  this.getHeaderColspan = function(col, level) {
    var TRindex = instance.view.wt.wtTable.THEAD.childNodes.length - level - 1;
    var rowHeadersCount = instance.view.wt.wtSettings.settings.rowHeaders().length;
    var TR = instance.view.wt.wtTable.THEAD.querySelector('tr:nth-child(' + parseInt(TRindex + 1, 10) + ')');
    var offsettedColIndex = rowHeadersCount + col - instance.view.wt.wtViewport.columnsRenderCalculator.startColumn;
    if (TR.childNodes[offsettedColIndex].hasAttribute('colspan')) {
      return parseInt(TR.childNodes[offsettedColIndex].getAttribute('colspan'), 10);
    }
    return 0;
  };
  this.rowOffset = function() {
    return instance.view.wt.wtTable.getFirstRenderedRow();
  };
  this.colOffset = function() {
    return instance.view.wt.wtTable.getFirstRenderedColumn();
  };
  this.countRenderedRows = function() {
    return instance.view.wt.drawn ? instance.view.wt.wtTable.getRenderedRowsCount() : -1;
  };
  this.countVisibleRows = function() {
    return instance.view.wt.drawn ? instance.view.wt.wtTable.getVisibleRowsCount() : -1;
  };
  this.countRenderedCols = function() {
    return instance.view.wt.drawn ? instance.view.wt.wtTable.getRenderedColumnsCount() : -1;
  };
  this.countVisibleCols = function() {
    return instance.view.wt.drawn ? instance.view.wt.wtTable.getVisibleColumnsCount() : -1;
  };
  this.countEmptyRows = function(ending) {
    var i = instance.countRows() - 1,
        empty = 0,
        row;
    while (i >= 0) {
      row = Handsontable.hooks.run(this, 'modifyRow', i);
      if (instance.isEmptyRow(row)) {
        empty++;
      } else if (ending) {
        break;
      }
      i--;
    }
    return empty;
  };
  this.countEmptyCols = function(ending) {
    if (instance.countRows() < 1) {
      return 0;
    }
    var i = instance.countCols() - 1,
        empty = 0;
    while (i >= 0) {
      if (instance.isEmptyCol(i)) {
        empty++;
      } else if (ending) {
        break;
      }
      i--;
    }
    return empty;
  };
  this.isEmptyRow = function(row) {
    return priv.settings.isEmptyRow.call(instance, row);
  };
  this.isEmptyCol = function(col) {
    return priv.settings.isEmptyCol.call(instance, col);
  };
  this.selectCell = function(row, col, endRow, endCol, scrollToCell, changeListener) {
    var coords;
    changeListener = typeof changeListener === 'undefined' || changeListener === true;
    if (typeof row !== 'number' || row < 0 || row >= instance.countRows()) {
      return false;
    }
    if (typeof col !== 'number' || col < 0 || col >= instance.countCols()) {
      return false;
    }
    if (typeof endRow !== 'undefined') {
      if (typeof endRow !== 'number' || endRow < 0 || endRow >= instance.countRows()) {
        return false;
      }
      if (typeof endCol !== 'number' || endCol < 0 || endCol >= instance.countCols()) {
        return false;
      }
    }
    coords = new WalkontableCellCoords(row, col);
    priv.selRange = new WalkontableCellRange(coords, coords, coords);
    if (document.activeElement && document.activeElement !== document.documentElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    if (changeListener) {
      instance.listen();
    }
    if (typeof endRow === 'undefined') {
      selection.setRangeEnd(priv.selRange.from, scrollToCell);
    } else {
      selection.setRangeEnd(new WalkontableCellCoords(endRow, endCol), scrollToCell);
    }
    instance.selection.finish();
    return true;
  };
  this.selectCellByProp = function(row, prop, endRow, endProp, scrollToCell) {
    arguments[1] = datamap.propToCol(arguments[1]);
    if (typeof arguments[3] !== 'undefined') {
      arguments[3] = datamap.propToCol(arguments[3]);
    }
    return instance.selectCell.apply(instance, arguments);
  };
  this.deselectCell = function() {
    selection.deselect();
  };
  this.destroy = function() {
    instance._clearTimeouts();
    if (instance.view) {
      instance.view.destroy();
    }
    empty(instance.rootElement);
    eventManager.destroy();
    Handsontable.hooks.run(instance, 'afterDestroy');
    Handsontable.hooks.destroy(instance);
    for (var i in instance) {
      if (instance.hasOwnProperty(i)) {
        if (typeof instance[i] === 'function') {
          instance[i] = postMortem;
        } else if (i !== 'guid') {
          instance[i] = null;
        }
      }
    }
    priv = null;
    datamap = null;
    grid = null;
    selection = null;
    editorManager = null;
    instance = null;
    GridSettings = null;
  };
  function postMortem() {
    throw new Error('This method cannot be called because this Handsontable instance has been destroyed');
  }
  this.getActiveEditor = function() {
    return editorManager.getActiveEditor();
  };
  this.getPlugin = function(pluginName) {
    return getPlugin(this, pluginName);
  };
  this.getInstance = function() {
    return instance;
  };
  this.addHook = function(key, callback) {
    Handsontable.hooks.add(key, callback, instance);
  };
  this.addHookOnce = function(key, callback) {
    Handsontable.hooks.once(key, callback, instance);
  };
  this.removeHook = function(key, callback) {
    Handsontable.hooks.remove(key, callback, instance);
  };
  this.runHooks = function(key, p1, p2, p3, p4, p5, p6) {
    return Handsontable.hooks.run(instance, key, p1, p2, p3, p4, p5, p6);
  };
  this.timeouts = [];
  this._registerTimeout = function(handle) {
    this.timeouts.push(handle);
  };
  this._clearTimeouts = function() {
    for (var i = 0,
        ilen = this.timeouts.length; i < ilen; i++) {
      clearTimeout(this.timeouts[i]);
    }
  };
  this.version = Handsontable.version;
  Handsontable.hooks.run(instance, 'construct');
};
var DefaultSettings = function() {};
DefaultSettings.prototype = {
  data: void 0,
  dataSchema: void 0,
  width: void 0,
  height: void 0,
  startRows: 5,
  startCols: 5,
  rowHeaders: null,
  colHeaders: null,
  colWidths: void 0,
  columns: void 0,
  cells: void 0,
  cell: [],
  comments: false,
  customBorders: false,
  minRows: 0,
  minCols: 0,
  maxRows: Infinity,
  maxCols: Infinity,
  minSpareRows: 0,
  minSpareCols: 0,
  allowInsertRow: true,
  allowInsertColumn: true,
  allowRemoveRow: true,
  allowRemoveColumn: true,
  multiSelect: true,
  fillHandle: true,
  fixedRowsTop: 0,
  fixedRowsBottom: 0,
  fixedColumnsLeft: 0,
  outsideClickDeselects: true,
  enterBeginsEditing: true,
  enterMoves: {
    row: 1,
    col: 0
  },
  tabMoves: {
    row: 0,
    col: 1
  },
  autoWrapRow: false,
  autoWrapCol: false,
  copyRowsLimit: 1000,
  copyColsLimit: 1000,
  pasteMode: 'overwrite',
  persistentState: false,
  currentRowClassName: void 0,
  currentColClassName: void 0,
  className: void 0,
  tableClassName: void 0,
  stretchH: 'none',
  isEmptyRow: function(row) {
    var col,
        colLen,
        value,
        meta;
    for (col = 0, colLen = this.countCols(); col < colLen; col++) {
      value = this.getDataAtCell(row, col);
      if (value !== '' && value !== null && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          meta = this.getCellMeta(row, col);
          return isObjectEquals(this.getSchema()[meta.prop], value);
        }
        return false;
      }
    }
    return true;
  },
  isEmptyCol: function(col) {
    var row,
        rowLen,
        value;
    for (row = 0, rowLen = this.countRows(); row < rowLen; row++) {
      value = this.getDataAtCell(row, col);
      if (value !== '' && value !== null && typeof value !== 'undefined') {
        return false;
      }
    }
    return true;
  },
  observeDOMVisibility: true,
  allowInvalid: true,
  invalidCellClassName: 'htInvalid',
  placeholder: false,
  placeholderCellClassName: 'htPlaceholder',
  readOnlyCellClassName: 'htDimmed',
  renderer: void 0,
  commentedCellClassName: 'htCommentCell',
  fragmentSelection: false,
  readOnly: false,
  skipColumnOnPaste: false,
  search: false,
  type: 'text',
  copyable: true,
  editor: void 0,
  autoComplete: void 0,
  visibleRows: 10,
  trimDropdown: true,
  debug: false,
  wordWrap: true,
  noWordWrapClassName: 'htNoWrap',
  contextMenu: void 0,
  contextMenuCopyPaste: void 0,
  copyPaste: void 0,
  undo: void 0,
  columnSorting: void 0,
  manualColumnMove: void 0,
  manualColumnResize: void 0,
  manualRowMove: void 0,
  manualRowResize: void 0,
  mergeCells: false,
  viewportRowRenderingOffset: 'auto',
  viewportColumnRenderingOffset: 'auto',
  validator: void 0,
  disableVisualSelection: false,
  sortIndicator: false,
  manualColumnFreeze: void 0,
  trimWhitespace: true,
  settings: void 0,
  source: void 0,
  title: void 0,
  checkedTemplate: void 0,
  uncheckedTemplate: void 0,
  label: void 0,
  format: void 0,
  language: void 0,
  selectOptions: void 0,
  autoColumnSize: void 0,
  autoRowSize: void 0,
  dateFormat: void 0,
  correctFormat: false,
  defaultDate: void 0,
  strict: void 0,
  renderAllRows: void 0
};
Handsontable.DefaultSettings = DefaultSettings;

//# 
},{"3rdparty/walkontable/src/calculator/viewportColumns":2,"3rdparty/walkontable/src/cell/coords":4,"3rdparty/walkontable/src/cell/range":5,"3rdparty/walkontable/src/selection":17,"dataMap":25,"editorManager":26,"eventManager":32,"helpers/array":33,"helpers/data":35,"helpers/dom/element":36,"helpers/number":40,"helpers/object":41,"helpers/setting":42,"helpers/string":43,"numeral":"numeral","plugins":47,"renderers":70,"tableView":74}],25:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  DataMap: {get: function() {
      return DataMap;
    }},
  __esModule: {value: true}
});
var $__SheetClip__,
    $__helpers_47_data__,
    $__helpers_47_setting__,
    $__helpers_47_object__,
    $__helpers_47_array__,
    $__multiMap__;
var SheetClip = ($__SheetClip__ = require("SheetClip"), $__SheetClip__ && $__SheetClip__.__esModule && $__SheetClip__ || {default: $__SheetClip__}).default;
var cellMethodLookupFactory = ($__helpers_47_data__ = require("helpers/data"), $__helpers_47_data__ && $__helpers_47_data__.__esModule && $__helpers_47_data__ || {default: $__helpers_47_data__}).cellMethodLookupFactory;
var columnFactory = ($__helpers_47_setting__ = require("helpers/setting"), $__helpers_47_setting__ && $__helpers_47_setting__.__esModule && $__helpers_47_setting__ || {default: $__helpers_47_setting__}).columnFactory;
var $__3 = ($__helpers_47_object__ = require("helpers/object"), $__helpers_47_object__ && $__helpers_47_object__.__esModule && $__helpers_47_object__ || {default: $__helpers_47_object__}),
    duckSchema = $__3.duckSchema,
    deepExtend = $__3.deepExtend;
var $__4 = ($__helpers_47_array__ = require("helpers/array"), $__helpers_47_array__ && $__helpers_47_array__.__esModule && $__helpers_47_array__ || {default: $__helpers_47_array__}),
    extendArray = $__4.extendArray,
    to2dArray = $__4.to2dArray;
var MultiMap = ($__multiMap__ = require("multiMap"), $__multiMap__ && $__multiMap__.__esModule && $__multiMap__ || {default: $__multiMap__}).MultiMap;
function DataMap(instance, priv, GridSettings) {
  this.instance = instance;
  this.priv = priv;
  this.GridSettings = GridSettings;
  this.dataSource = this.instance.getSettings().data;
  if (this.dataSource[0]) {
    this.duckSchema = this.recursiveDuckSchema(this.dataSource[0]);
  } else {
    this.duckSchema = {};
  }
  this.createMap();
}
DataMap.prototype.DESTINATION_RENDERER = 1;
DataMap.prototype.DESTINATION_CLIPBOARD_GENERATOR = 2;
DataMap.prototype.recursiveDuckSchema = function(object) {
  return duckSchema(object);
};
DataMap.prototype.recursiveDuckColumns = function(schema, lastCol, parent) {
  var prop,
      i;
  if (typeof lastCol === 'undefined') {
    lastCol = 0;
    parent = '';
  }
  if (typeof schema === 'object' && !Array.isArray(schema)) {
    for (i in schema) {
      if (schema.hasOwnProperty(i)) {
        if (schema[i] === null) {
          prop = parent + i;
          this.colToPropCache.push(prop);
          this.propToColCache.set(prop, lastCol);
          lastCol++;
        } else {
          lastCol = this.recursiveDuckColumns(schema[i], lastCol, i + '.');
        }
      }
    }
  }
  return lastCol;
};
DataMap.prototype.createMap = function() {
  var i,
      ilen,
      schema = this.getSchema();
  if (typeof schema === 'undefined') {
    throw new Error('trying to create `columns` definition but you didnt\' provide `schema` nor `data`');
  }
  this.colToPropCache = [];
  this.propToColCache = new MultiMap();
  var columns = this.instance.getSettings().columns;
  if (columns) {
    for (i = 0, ilen = columns.length; i < ilen; i++) {
      if (typeof columns[i].data != 'undefined') {
        this.colToPropCache[i] = columns[i].data;
        this.propToColCache.set(columns[i].data, i);
      }
    }
  } else {
    this.recursiveDuckColumns(schema);
  }
};
DataMap.prototype.colToProp = function(col) {
  col = Handsontable.hooks.run(this.instance, 'modifyCol', col);
  if (this.colToPropCache && typeof this.colToPropCache[col] !== 'undefined') {
    return this.colToPropCache[col];
  }
  return col;
};
DataMap.prototype.propToCol = function(prop) {
  var col;
  if (typeof this.propToColCache.get(prop) === 'undefined') {
    col = prop;
  } else {
    col = this.propToColCache.get(prop);
  }
  col = Handsontable.hooks.run(this.instance, 'modifyCol', col);
  return col;
};
DataMap.prototype.getSchema = function() {
  var schema = this.instance.getSettings().dataSchema;
  if (schema) {
    if (typeof schema === 'function') {
      return schema();
    }
    return schema;
  }
  return this.duckSchema;
};
DataMap.prototype.createRow = function(index, amount, createdAutomatically) {
  var row,
      colCount = this.instance.countCols(),
      numberOfCreatedRows = 0,
      currentIndex;
  if (!amount) {
    amount = 1;
  }
  if (typeof index !== 'number' || index >= this.instance.countRows()) {
    index = this.instance.countRows();
  }
  currentIndex = index;
  var maxRows = this.instance.getSettings().maxRows;
  while (numberOfCreatedRows < amount && this.instance.countRows() < maxRows) {
    if (this.instance.dataType === 'array') {
      row = [];
      for (var c = 0; c < colCount; c++) {
        row.push(null);
      }
    } else if (this.instance.dataType === 'function') {
      row = this.instance.getSettings().dataSchema(index);
    } else {
      row = {};
      deepExtend(row, this.getSchema());
    }
    if (index === this.instance.countRows()) {
      this.dataSource.push(row);
    } else {
      this.dataSource.splice(index, 0, row);
    }
    numberOfCreatedRows++;
    currentIndex++;
  }
  Handsontable.hooks.run(this.instance, 'afterCreateRow', index, numberOfCreatedRows, createdAutomatically);
  this.instance.forceFullRender = true;
  return numberOfCreatedRows;
};
DataMap.prototype.createCol = function(index, amount, createdAutomatically) {
  if (!this.instance.isColumnModificationAllowed()) {
    throw new Error('Cannot create new column. When data source in an object, ' + 'you can only have as much columns as defined in first data row, data schema or in the \'columns\' setting.' + 'If you want to be able to add new columns, you have to use array datasource.');
  }
  var rlen = this.instance.countRows(),
      data = this.dataSource,
      constructor,
      numberOfCreatedCols = 0,
      currentIndex;
  if (!amount) {
    amount = 1;
  }
  currentIndex = index;
  var maxCols = this.instance.getSettings().maxCols;
  while (numberOfCreatedCols < amount && this.instance.countCols() < maxCols) {
    constructor = columnFactory(this.GridSettings, this.priv.columnsSettingConflicts);
    if (typeof index !== 'number' || index >= this.instance.countCols()) {
      for (var r = 0; r < rlen; r++) {
        if (typeof data[r] === 'undefined') {
          data[r] = [];
        }
        data[r].push(null);
      }
      this.priv.columnSettings.push(constructor);
    } else {
      for (var r = 0; r < rlen; r++) {
        data[r].splice(currentIndex, 0, null);
      }
      this.priv.columnSettings.splice(currentIndex, 0, constructor);
    }
    numberOfCreatedCols++;
    currentIndex++;
  }
  Handsontable.hooks.run(this.instance, 'afterCreateCol', index, numberOfCreatedCols, createdAutomatically);
  this.instance.forceFullRender = true;
  return numberOfCreatedCols;
};
DataMap.prototype.removeRow = function(index, amount) {
  if (!amount) {
    amount = 1;
  }
  if (typeof index !== 'number') {
    index = -amount;
  }
  index = (this.instance.countRows() + index) % this.instance.countRows();
  var logicRows = this.physicalRowsToLogical(index, amount);
  var actionWasNotCancelled = Handsontable.hooks.run(this.instance, 'beforeRemoveRow', index, amount);
  if (actionWasNotCancelled === false) {
    return;
  }
  var data = this.dataSource;
  var newData = data.filter(function(row, index) {
    return logicRows.indexOf(index) == -1;
  });
  data.length = 0;
  Array.prototype.push.apply(data, newData);
  Handsontable.hooks.run(this.instance, 'afterRemoveRow', index, amount);
  this.instance.forceFullRender = true;
};
DataMap.prototype.removeCol = function(index, amount) {
  if (this.instance.dataType === 'object' || this.instance.getSettings().columns) {
    throw new Error('cannot remove column with object data source or columns option specified');
  }
  if (!amount) {
    amount = 1;
  }
  if (typeof index !== 'number') {
    index = -amount;
  }
  index = (this.instance.countCols() + index) % this.instance.countCols();
  var actionWasNotCancelled = Handsontable.hooks.run(this.instance, 'beforeRemoveCol', index, amount);
  if (actionWasNotCancelled === false) {
    return;
  }
  var data = this.dataSource;
  for (var r = 0,
      rlen = this.instance.countRows(); r < rlen; r++) {
    data[r].splice(index, amount);
  }
  this.priv.columnSettings.splice(index, amount);
  Handsontable.hooks.run(this.instance, 'afterRemoveCol', index, amount);
  this.instance.forceFullRender = true;
};
DataMap.prototype.spliceCol = function(col, index, amount) {
  var elements = 4 <= arguments.length ? [].slice.call(arguments, 3) : [];
  var colData = this.instance.getDataAtCol(col);
  var removed = colData.slice(index, index + amount);
  var after = colData.slice(index + amount);
  extendArray(elements, after);
  var i = 0;
  while (i < amount) {
    elements.push(null);
    i++;
  }
  to2dArray(elements);
  this.instance.populateFromArray(index, col, elements, null, null, 'spliceCol');
  return removed;
};
DataMap.prototype.spliceRow = function(row, index, amount) {
  var elements = 4 <= arguments.length ? [].slice.call(arguments, 3) : [];
  var rowData = this.instance.getSourceDataAtRow(row);
  var removed = rowData.slice(index, index + amount);
  var after = rowData.slice(index + amount);
  extendArray(elements, after);
  var i = 0;
  while (i < amount) {
    elements.push(null);
    i++;
  }
  this.instance.populateFromArray(row, index, [elements], null, null, 'spliceRow');
  return removed;
};
DataMap.prototype.get = function(row, prop) {
  row = Handsontable.hooks.run(this.instance, 'modifyRow', row);
  if (typeof prop === 'string' && prop.indexOf('.') > -1) {
    var sliced = prop.split('.');
    var out = this.dataSource[row];
    if (!out) {
      return null;
    }
    for (var i = 0,
        ilen = sliced.length; i < ilen; i++) {
      out = out[sliced[i]];
      if (typeof out === 'undefined') {
        return null;
      }
    }
    return out;
  } else if (typeof prop === 'function') {
    return prop(this.dataSource.slice(row, row + 1)[0]);
  } else {
    return this.dataSource[row] ? this.dataSource[row][prop] : null;
  }
};
var copyableLookup = cellMethodLookupFactory('copyable', false);
DataMap.prototype.getCopyable = function(row, prop) {
  if (copyableLookup.call(this.instance, row, this.propToCol(prop))) {
    return this.get(row, prop);
  }
  return '';
};
DataMap.prototype.set = function(row, prop, value, source) {
  row = Handsontable.hooks.run(this.instance, 'modifyRow', row, source || 'datamapGet');
  if (typeof prop === 'string' && prop.indexOf('.') > -1) {
    var sliced = prop.split('.');
    var out = this.dataSource[row];
    for (var i = 0,
        ilen = sliced.length - 1; i < ilen; i++) {
      if (typeof out[sliced[i]] === 'undefined') {
        out[sliced[i]] = {};
      }
      out = out[sliced[i]];
    }
    out[sliced[i]] = value;
  } else if (typeof prop === 'function') {
    prop(this.dataSource.slice(row, row + 1)[0], value);
  } else {
    this.dataSource[row][prop] = value;
  }
};
DataMap.prototype.physicalRowsToLogical = function(index, amount) {
  var totalRows = this.instance.countRows();
  var physicRow = (totalRows + index) % totalRows;
  var logicRows = [];
  var rowsToRemove = amount;
  var row;
  while (physicRow < totalRows && rowsToRemove) {
    row = Handsontable.hooks.run(this.instance, 'modifyRow', physicRow);
    logicRows.push(row);
    rowsToRemove--;
    physicRow++;
  }
  return logicRows;
};
DataMap.prototype.clear = function() {
  for (var r = 0; r < this.instance.countRows(); r++) {
    for (var c = 0; c < this.instance.countCols(); c++) {
      this.set(r, this.colToProp(c), '');
    }
  }
};
DataMap.prototype.getAll = function() {
  return this.dataSource;
};
DataMap.prototype.getRange = function(start, end, destination) {
  var r,
      rlen,
      c,
      clen,
      output = [],
      row;
  var getFn = destination === this.DESTINATION_CLIPBOARD_GENERATOR ? this.getCopyable : this.get;
  rlen = Math.max(start.row, end.row);
  clen = Math.max(start.col, end.col);
  for (r = Math.min(start.row, end.row); r <= rlen; r++) {
    row = [];
    for (c = Math.min(start.col, end.col); c <= clen; c++) {
      row.push(getFn.call(this, r, this.colToProp(c)));
    }
    output.push(row);
  }
  return output;
};
DataMap.prototype.getText = function(start, end) {
  return SheetClip.stringify(this.getRange(start, end, this.DESTINATION_RENDERER));
};
DataMap.prototype.getCopyableText = function(start, end) {
  return SheetClip.stringify(this.getRange(start, end, this.DESTINATION_CLIPBOARD_GENERATOR));
};
;
Handsontable.DataMap = DataMap;

//# 
},{"SheetClip":"SheetClip","helpers/array":33,"helpers/data":35,"helpers/object":41,"helpers/setting":42,"multiMap":45}],26:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  EditorManager: {get: function() {
      return EditorManager;
    }},
  __esModule: {value: true}
});
var $__3rdparty_47_walkontable_47_src_47_cell_47_coords__,
    $__helpers_47_unicode__,
    $__helpers_47_dom_47_event__,
    $__editors__,
    $__eventManager__;
var WalkontableCellCoords = ($__3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $__3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
var $__1 = ($__helpers_47_unicode__ = require("helpers/unicode"), $__helpers_47_unicode__ && $__helpers_47_unicode__.__esModule && $__helpers_47_unicode__ || {default: $__helpers_47_unicode__}),
    KEY_CODES = $__1.KEY_CODES,
    isMetaKey = $__1.isMetaKey,
    isCtrlKey = $__1.isCtrlKey;
var $__2 = ($__helpers_47_dom_47_event__ = require("helpers/dom/event"), $__helpers_47_dom_47_event__ && $__helpers_47_dom_47_event__.__esModule && $__helpers_47_dom_47_event__ || {default: $__helpers_47_dom_47_event__}),
    stopPropagation = $__2.stopPropagation,
    stopImmediatePropagation = $__2.stopImmediatePropagation,
    isImmediatePropagationStopped = $__2.isImmediatePropagationStopped;
var getEditor = ($__editors__ = require("editors"), $__editors__ && $__editors__.__esModule && $__editors__ || {default: $__editors__}).getEditor;
var eventManagerObject = ($__eventManager__ = require("eventManager"), $__eventManager__ && $__eventManager__.__esModule && $__eventManager__ || {default: $__eventManager__}).eventManager;
;
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
      selection.transformStart(-enterMoves.row, -enterMoves.col);
    } else {
      selection.transformStart(enterMoves.row, enterMoves.col, true);
    }
  }
  function moveSelectionUp(shiftKey) {
    if (shiftKey) {
      selection.transformEnd(-1, 0);
    } else {
      selection.transformStart(-1, 0);
    }
  }
  function moveSelectionDown(shiftKey) {
    if (shiftKey) {
      selection.transformEnd(1, 0);
    } else {
      selection.transformStart(1, 0);
    }
  }
  function moveSelectionRight(shiftKey) {
    if (shiftKey) {
      selection.transformEnd(0, 1);
    } else {
      selection.transformStart(0, 1);
    }
  }
  function moveSelectionLeft(shiftKey) {
    if (shiftKey) {
      selection.transformEnd(0, -1);
    } else {
      selection.transformStart(0, -1);
    }
  }
  function onKeyDown(event) {
    var ctrlDown,
        rangeModifier;
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
        moveSelectionUp(event.shiftKey);
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.ARROW_DOWN:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionDown(event.shiftKey);
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.ARROW_RIGHT:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionRight(event.shiftKey);
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.ARROW_LEFT:
        if (_this.isEditorOpened() && !activeEditor.isWaiting()) {
          _this.closeEditorAndSaveChanges(ctrlDown);
        }
        moveSelectionLeft(event.shiftKey);
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.TAB:
        var tabMoves = typeof priv.settings.tabMoves === 'function' ? priv.settings.tabMoves(event) : priv.settings.tabMoves;
        if (event.shiftKey) {
          selection.transformStart(-tabMoves.row, -tabMoves.col);
        } else {
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
        _this.openEditor(null, event);
        if (activeEditor) {
          activeEditor.enableFullEditMode();
        }
        event.preventDefault();
        break;
      case KEY_CODES.ENTER:
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
        event.preventDefault();
        stopImmediatePropagation(event);
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
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.END:
        if (event.ctrlKey || event.metaKey) {
          rangeModifier(new WalkontableCellCoords(instance.countRows() - 1, priv.selRange.from.col));
        } else {
          rangeModifier(new WalkontableCellCoords(priv.selRange.from.row, instance.countCols() - 1));
        }
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.PAGE_UP:
        selection.transformStart(-instance.countVisibleRows(), 0);
        event.preventDefault();
        stopPropagation(event);
        break;
      case KEY_CODES.PAGE_DOWN:
        selection.transformStart(instance.countVisibleRows(), 0);
        event.preventDefault();
        stopPropagation(event);
        break;
    }
  }
  function init() {
    instance.addHook('afterDocumentKeyDown', onKeyDown);
    eventManager.addEventListener(document.documentElement, 'keydown', function(event) {
      instance.runHooks('afterDocumentKeyDown', event);
    });
    function onDblClick(event, coords, elem) {
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
  this.destroyEditor = function(revertOriginal) {
    this.closeEditor(revertOriginal);
  };
  this.getActiveEditor = function() {
    return activeEditor;
  };
  this.prepareEditor = function() {
    var row,
        col,
        prop,
        td,
        originalValue,
        cellProperties,
        editorClass;
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
    originalValue = instance.getDataAtCell(row, col);
    cellProperties = instance.getCellMeta(row, col);
    editorClass = instance.getCellEditor(cellProperties);
    if (editorClass) {
      activeEditor = Handsontable.editors.getEditor(editorClass, instance);
      activeEditor.prepare(row, col, prop, td, originalValue, cellProperties);
    } else {
      activeEditor = void 0;
    }
  };
  this.isEditorOpened = function() {
    return activeEditor && activeEditor.isOpened();
  };
  this.openEditor = function(initialValue, event) {
    if (activeEditor && !activeEditor.cellProperties.readOnly) {
      activeEditor.beginEditing(initialValue, event);
    } else if (activeEditor && activeEditor.cellProperties.readOnly) {
      if (event && event.keyCode === KEY_CODES.ENTER) {
        moveSelectionAfterEnter();
      }
    }
  };
  this.closeEditor = function(restoreOriginalValue, ctrlDown, callback) {
    if (activeEditor) {
      activeEditor.finishEditing(restoreOriginalValue, ctrlDown, callback);
    } else {
      if (callback) {
        callback(false);
      }
    }
  };
  this.closeEditorAndSaveChanges = function(ctrlDown) {
    return this.closeEditor(false, ctrlDown);
  };
  this.closeEditorAndRestoreOriginalValue = function(ctrlDown) {
    return this.closeEditor(true, ctrlDown);
  };
  init();
}

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"editors":27,"eventManager":32,"helpers/dom/event":37,"helpers/unicode":44}],27:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  registerEditor: {get: function() {
      return registerEditor;
    }},
  getEditor: {get: function() {
      return getEditor;
    }},
  hasEditor: {get: function() {
      return hasEditor;
    }},
  getEditorConstructor: {get: function() {
      return getEditorConstructor;
    }},
  __esModule: {value: true}
});
var $__helpers_47_string__;
var toUpperCaseFirst = ($__helpers_47_string__ = require("helpers/string"), $__helpers_47_string__ && $__helpers_47_string__.__esModule && $__helpers_47_string__ || {default: $__helpers_47_string__}).toUpperCaseFirst;
;
var registeredEditorNames = {},
    registeredEditorClasses = new WeakMap();
Handsontable.editors = Handsontable.editors || {};
Handsontable.editors.registerEditor = registerEditor;
Handsontable.editors.getEditor = getEditor;
function RegisteredEditor(editorClass) {
  var Clazz,
      instances;
  instances = {};
  Clazz = editorClass;
  this.getConstructor = function() {
    return editorClass;
  };
  this.getInstance = function(hotInstance) {
    if (!(hotInstance.guid in instances)) {
      instances[hotInstance.guid] = new Clazz(hotInstance);
    }
    return instances[hotInstance.guid];
  };
}
function registerEditor(editorName, editorClass) {
  var editor = new RegisteredEditor(editorClass);
  if (typeof editorName === 'string') {
    registeredEditorNames[editorName] = editor;
    Handsontable.editors[toUpperCaseFirst(editorName) + 'Editor'] = editorClass;
  }
  registeredEditorClasses.set(editorClass, editor);
}
function getEditor(editorName, hotInstance) {
  var editor;
  if (typeof editorName == 'function') {
    if (!(registeredEditorClasses.get(editorName))) {
      registerEditor(null, editorName);
    }
    editor = registeredEditorClasses.get(editorName);
  } else if (typeof editorName == 'string') {
    editor = registeredEditorNames[editorName];
  } else {
    throw Error('Only strings and functions can be passed as "editor" parameter ');
  }
  if (!editor) {
    throw Error('No editor registered under name "' + editorName + '"');
  }
  return editor.getInstance(hotInstance);
}
function getEditorConstructor(editorName) {
  var editor;
  if (typeof editorName == 'string') {
    editor = registeredEditorNames[editorName];
  } else {
    throw Error('Only strings and functions can be passed as "editor" parameter ');
  }
  if (!editor) {
    throw Error('No editor registered under name "' + editorName + '"');
  }
  return editor.getConstructor();
}
function hasEditor(editorName) {
  return registeredEditorNames[editorName] ? true : false;
}

//# 
},{"helpers/string":43}],28:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  BaseEditor: {get: function() {
      return BaseEditor;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_mixed__,
    $___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__;
var stringify = ($___46__46__47_helpers_47_mixed__ = require("helpers/mixed"), $___46__46__47_helpers_47_mixed__ && $___46__46__47_helpers_47_mixed__.__esModule && $___46__46__47_helpers_47_mixed__ || {default: $___46__46__47_helpers_47_mixed__}).stringify;
var WalkontableCellCoords = ($___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $___46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
;
Handsontable.editors = Handsontable.editors || {};
Handsontable.editors.BaseEditor = BaseEditor;
Handsontable.EditorState = {
  VIRGIN: 'STATE_VIRGIN',
  EDITING: 'STATE_EDITING',
  WAITING: 'STATE_WAITING',
  FINISHED: 'STATE_FINISHED'
};
function BaseEditor(instance) {
  this.instance = instance;
  this.state = Handsontable.EditorState.VIRGIN;
  this._opened = false;
  this._fullEditMode = false;
  this._closeCallback = null;
  this.init();
}
BaseEditor.prototype._fireCallbacks = function(result) {
  if (this._closeCallback) {
    this._closeCallback(result);
    this._closeCallback = null;
  }
};
BaseEditor.prototype.init = function() {};
BaseEditor.prototype.getValue = function() {
  throw Error('Editor getValue() method unimplemented');
};
BaseEditor.prototype.setValue = function(newValue) {
  throw Error('Editor setValue() method unimplemented');
};
BaseEditor.prototype.open = function() {
  throw Error('Editor open() method unimplemented');
};
BaseEditor.prototype.close = function() {
  throw Error('Editor close() method unimplemented');
};
BaseEditor.prototype.prepare = function(row, col, prop, td, originalValue, cellProperties) {
  this.TD = td;
  this.row = row;
  this.col = col;
  this.prop = prop;
  this.originalValue = originalValue;
  this.cellProperties = cellProperties;
  this.state = Handsontable.EditorState.VIRGIN;
};
BaseEditor.prototype.extend = function() {
  var baseClass = this.constructor;
  function Editor() {
    baseClass.apply(this, arguments);
  }
  function inherit(Child, Parent) {
    function Bridge() {}
    Bridge.prototype = Parent.prototype;
    Child.prototype = new Bridge();
    Child.prototype.constructor = Child;
    return Child;
  }
  return inherit(Editor, baseClass);
};
BaseEditor.prototype.saveValue = function(val, ctrlDown) {
  var sel,
      tmp;
  if (ctrlDown) {
    sel = this.instance.getSelected();
    if (sel[0] > sel[2]) {
      tmp = sel[0];
      sel[0] = sel[2];
      sel[2] = tmp;
    }
    if (sel[1] > sel[3]) {
      tmp = sel[1];
      sel[1] = sel[3];
      sel[3] = tmp;
    }
    this.instance.populateFromArray(sel[0], sel[1], val, sel[2], sel[3], 'edit');
  } else {
    this.instance.populateFromArray(this.row, this.col, val, null, null, 'edit');
  }
};
BaseEditor.prototype.beginEditing = function(initialValue, event) {
  if (this.state != Handsontable.EditorState.VIRGIN) {
    return;
  }
  this.instance.view.scrollViewport(new WalkontableCellCoords(this.row, this.col));
  this.instance.view.render();
  this.state = Handsontable.EditorState.EDITING;
  initialValue = typeof initialValue == 'string' ? initialValue : this.originalValue;
  this.setValue(stringify(initialValue));
  this.open(event);
  this._opened = true;
  this.focus();
  this.instance.view.render();
};
BaseEditor.prototype.finishEditing = function(restoreOriginalValue, ctrlDown, callback) {
  var _this = this,
      val;
  if (callback) {
    var previousCloseCallback = this._closeCallback;
    this._closeCallback = function(result) {
      if (previousCloseCallback) {
        previousCloseCallback(result);
      }
      callback(result);
    };
  }
  if (this.isWaiting()) {
    return;
  }
  if (this.state == Handsontable.EditorState.VIRGIN) {
    this.instance._registerTimeout(setTimeout(function() {
      _this._fireCallbacks(true);
    }, 0));
    return;
  }
  if (this.state == Handsontable.EditorState.EDITING) {
    if (restoreOriginalValue) {
      this.cancelChanges();
      this.instance.view.render();
      return;
    }
    if (this.instance.getSettings().trimWhitespace) {
      val = [[typeof this.getValue() === 'string' ? String.prototype.trim.call(this.getValue() || '') : this.getValue()]];
    } else {
      val = [[this.getValue()]];
    }
    this.state = Handsontable.EditorState.WAITING;
    this.saveValue(val, ctrlDown);
    if (this.instance.getCellValidator(this.cellProperties)) {
      this.instance.addHookOnce('postAfterValidate', function(result) {
        _this.state = Handsontable.EditorState.FINISHED;
        _this.discardEditor(result);
      });
    } else {
      this.state = Handsontable.EditorState.FINISHED;
      this.discardEditor(true);
    }
  }
};
BaseEditor.prototype.cancelChanges = function() {
  this.state = Handsontable.EditorState.FINISHED;
  this.discardEditor();
};
BaseEditor.prototype.discardEditor = function(result) {
  if (this.state !== Handsontable.EditorState.FINISHED) {
    return;
  }
  if (result === false && this.cellProperties.allowInvalid !== true) {
    this.instance.selectCell(this.row, this.col);
    this.focus();
    this.state = Handsontable.EditorState.EDITING;
    this._fireCallbacks(false);
  } else {
    this.close();
    this._opened = false;
    this._fullEditMode = false;
    this.state = Handsontable.EditorState.VIRGIN;
    this._fireCallbacks(true);
  }
};
BaseEditor.prototype.enableFullEditMode = function() {
  this._fullEditMode = true;
};
BaseEditor.prototype.isInFullEditMode = function() {
  return this._fullEditMode;
};
BaseEditor.prototype.isOpened = function() {
  return this._opened;
};
BaseEditor.prototype.isWaiting = function() {
  return this.state === Handsontable.EditorState.WAITING;
};
BaseEditor.prototype.checkEditorSection = function() {
  var totalRows = this.instance.countRows();
  var section = '';
  if (this.row < this.instance.getSettings().fixedRowsTop) {
    if (this.col < this.instance.getSettings().fixedColumnsLeft) {
      section = 'top-left-corner';
    } else {
      section = 'top';
    }
  } else if (this.instance.getSettings().fixedRowsBottom && this.row >= totalRows - this.instance.getSettings().fixedRowsBottom) {
    if (this.col < this.instance.getSettings().fixedColumnsLeft) {
      section = 'bottom-left-corner';
    } else {
      section = 'bottom';
    }
  } else {
    if (this.col < this.instance.getSettings().fixedColumnsLeft) {
      section = 'left';
    }
  }
  return section;
};

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"helpers/mixed":39}],29:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  HandsontableEditor: {get: function() {
      return HandsontableEditor;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_unicode__,
    $___46__46__47_helpers_47_object__,
    $___46__46__47_helpers_47_dom_47_element__,
    $___46__46__47_helpers_47_dom_47_event__,
    $___46__46__47_editors__,
    $__textEditor__;
var KEY_CODES = ($___46__46__47_helpers_47_unicode__ = require("helpers/unicode"), $___46__46__47_helpers_47_unicode__ && $___46__46__47_helpers_47_unicode__.__esModule && $___46__46__47_helpers_47_unicode__ || {default: $___46__46__47_helpers_47_unicode__}).KEY_CODES;
var extend = ($___46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47_helpers_47_object__ && $___46__46__47_helpers_47_object__.__esModule && $___46__46__47_helpers_47_object__ || {default: $___46__46__47_helpers_47_object__}).extend;
var setCaretPosition = ($___46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47_helpers_47_dom_47_element__ && $___46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47_helpers_47_dom_47_element__}).setCaretPosition;
var $__3 = ($___46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47_helpers_47_dom_47_event__ && $___46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47_helpers_47_dom_47_event__}),
    stopImmediatePropagation = $__3.stopImmediatePropagation,
    isImmediatePropagationStopped = $__3.isImmediatePropagationStopped;
var $__4 = ($___46__46__47_editors__ = require("editors"), $___46__46__47_editors__ && $___46__46__47_editors__.__esModule && $___46__46__47_editors__ || {default: $___46__46__47_editors__}),
    getEditor = $__4.getEditor,
    registerEditor = $__4.registerEditor;
var TextEditor = ($__textEditor__ = require("textEditor"), $__textEditor__ && $__textEditor__.__esModule && $__textEditor__ || {default: $__textEditor__}).TextEditor;
var HandsontableEditor = TextEditor.prototype.extend();
HandsontableEditor.prototype.createElements = function() {
  TextEditor.prototype.createElements.apply(this, arguments);
  var DIV = document.createElement('DIV');
  DIV.className = 'handsontableEditor';
  this.TEXTAREA_PARENT.appendChild(DIV);
  this.htContainer = DIV;
  this.assignHooks();
};
HandsontableEditor.prototype.prepare = function(td, row, col, prop, value, cellProperties) {
  TextEditor.prototype.prepare.apply(this, arguments);
  var parent = this;
  var options = {
    startRows: 0,
    startCols: 0,
    minRows: 0,
    minCols: 0,
    className: 'listbox',
    copyPaste: false,
    autoColumnSize: false,
    autoRowSize: false,
    readOnly: true,
    fillHandle: false,
    afterOnCellMouseDown: function() {
      var value = this.getValue();
      if (value !== void 0) {
        parent.setValue(value);
      }
      parent.instance.destroyEditor();
    }
  };
  if (this.cellProperties.handsontable) {
    extend(options, cellProperties.handsontable);
  }
  this.htOptions = options;
};
var onBeforeKeyDown = function(event) {
  if (isImmediatePropagationStopped(event)) {
    return;
  }
  var editor = this.getActiveEditor();
  var innerHOT = editor.htEditor.getInstance();
  var rowToSelect;
  if (event.keyCode == KEY_CODES.ARROW_DOWN) {
    if (innerHOT.getSelected()) {
      var selectedRow = innerHOT.getSelected()[0];
      var lastRow = innerHOT.countRows() - 1;
      rowToSelect = Math.min(lastRow, selectedRow + 1);
    } else {
      rowToSelect = 0;
    }
  } else if (event.keyCode == KEY_CODES.ARROW_UP) {
    if (innerHOT.getSelected()) {
      var selectedRow = innerHOT.getSelected()[0];
      rowToSelect = selectedRow - 1;
    }
  }
  if (rowToSelect !== void 0) {
    if (rowToSelect < 0) {
      innerHOT.deselectCell();
    } else {
      innerHOT.selectCell(rowToSelect, 0);
    }
    if (innerHOT.getData().length) {
      event.preventDefault();
      stopImmediatePropagation(event);
      editor.instance.listen();
      editor.TEXTAREA.focus();
    }
  }
};
HandsontableEditor.prototype.open = function() {
  this.instance.addHook('beforeKeyDown', onBeforeKeyDown);
  TextEditor.prototype.open.apply(this, arguments);
  if (this.htEditor) {
    this.htEditor.destroy();
  }
  this.htEditor = new Handsontable(this.htContainer, this.htOptions);
  if (this.cellProperties.strict) {
    this.htEditor.selectCell(0, 0);
    this.TEXTAREA.style.visibility = 'hidden';
  } else {
    this.htEditor.deselectCell();
    this.TEXTAREA.style.visibility = 'visible';
  }
  setCaretPosition(this.TEXTAREA, 0, this.TEXTAREA.value.length);
};
HandsontableEditor.prototype.close = function() {
  this.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
  this.instance.listen();
  TextEditor.prototype.close.apply(this, arguments);
};
HandsontableEditor.prototype.focus = function() {
  this.instance.listen();
  TextEditor.prototype.focus.apply(this, arguments);
};
HandsontableEditor.prototype.beginEditing = function(initialValue) {
  var onBeginEditing = this.instance.getSettings().onBeginEditing;
  if (onBeginEditing && onBeginEditing() === false) {
    return;
  }
  TextEditor.prototype.beginEditing.apply(this, arguments);
};
HandsontableEditor.prototype.finishEditing = function(isCancelled, ctrlDown) {
  if (this.htEditor && this.htEditor.isListening()) {
    this.instance.listen();
  }
  if (this.htEditor && this.htEditor.getSelected()) {
    var value = this.htEditor.getInstance().getValue();
    if (value !== void 0) {
      this.setValue(value);
    }
  }
  return TextEditor.prototype.finishEditing.apply(this, arguments);
};
HandsontableEditor.prototype.assignHooks = function() {
  var _this = this;
  this.instance.addHook('afterDestroy', function() {
    if (_this.htEditor) {
      _this.htEditor.destroy();
    }
  });
};
;
registerEditor('handsontable', HandsontableEditor);

//# 
},{"editors":27,"helpers/dom/element":36,"helpers/dom/event":37,"helpers/object":41,"helpers/unicode":44,"textEditor":31}],30:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  NumericEditor: {get: function() {
      return NumericEditor;
    }},
  __esModule: {value: true}
});
var $__numeral__,
    $___46__46__47_editors__,
    $__textEditor__;
var numeral = ($__numeral__ = require("numeral"), $__numeral__ && $__numeral__.__esModule && $__numeral__ || {default: $__numeral__}).default;
var $__1 = ($___46__46__47_editors__ = require("editors"), $___46__46__47_editors__ && $___46__46__47_editors__.__esModule && $___46__46__47_editors__ || {default: $___46__46__47_editors__}),
    getEditor = $__1.getEditor,
    registerEditor = $__1.registerEditor;
var TextEditor = ($__textEditor__ = require("textEditor"), $__textEditor__ && $__textEditor__.__esModule && $__textEditor__ || {default: $__textEditor__}).TextEditor;
var NumericEditor = function NumericEditor() {
  $traceurRuntime.superConstructor($NumericEditor).apply(this, arguments);
};
var $NumericEditor = NumericEditor;
($traceurRuntime.createClass)(NumericEditor, {beginEditing: function(initialValue) {
    if (typeof initialValue === 'undefined' && this.originalValue) {
      if (typeof this.cellProperties.language !== 'undefined') {
        numeral.language(this.cellProperties.language);
      }
      var decimalDelimiter = numeral.languageData().delimiters.decimal;
      initialValue = ('' + this.originalValue).replace('.', decimalDelimiter);
    }
    $traceurRuntime.superGet(this, $NumericEditor.prototype, "beginEditing").call(this, initialValue);
  }}, {}, TextEditor);
;
registerEditor('numeric', NumericEditor);

//# 
},{"editors":27,"numeral":"numeral","textEditor":31}],31:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  TextEditor: {get: function() {
      return TextEditor;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_dom_47_element__,
    $__autoResize__,
    $___95_baseEditor__,
    $___46__46__47_eventManager__,
    $___46__46__47_editors__,
    $___46__46__47_helpers_47_unicode__,
    $___46__46__47_helpers_47_dom_47_event__;
var $__0 = ($___46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47_helpers_47_dom_47_element__ && $___46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    getCaretPosition = $__0.getCaretPosition,
    getComputedStyle = $__0.getComputedStyle,
    getCssTransform = $__0.getCssTransform,
    getScrollableElement = $__0.getScrollableElement,
    innerWidth = $__0.innerWidth,
    offset = $__0.offset,
    resetCssTransform = $__0.resetCssTransform,
    setCaretPosition = $__0.setCaretPosition;
var autoResize = ($__autoResize__ = require("autoResize"), $__autoResize__ && $__autoResize__.__esModule && $__autoResize__ || {default: $__autoResize__}).default;
var BaseEditor = ($___95_baseEditor__ = require("_baseEditor"), $___95_baseEditor__ && $___95_baseEditor__.__esModule && $___95_baseEditor__ || {default: $___95_baseEditor__}).BaseEditor;
var eventManagerObject = ($___46__46__47_eventManager__ = require("eventManager"), $___46__46__47_eventManager__ && $___46__46__47_eventManager__.__esModule && $___46__46__47_eventManager__ || {default: $___46__46__47_eventManager__}).eventManager;
var $__4 = ($___46__46__47_editors__ = require("editors"), $___46__46__47_editors__ && $___46__46__47_editors__.__esModule && $___46__46__47_editors__ || {default: $___46__46__47_editors__}),
    getEditor = $__4.getEditor,
    registerEditor = $__4.registerEditor;
var KEY_CODES = ($___46__46__47_helpers_47_unicode__ = require("helpers/unicode"), $___46__46__47_helpers_47_unicode__ && $___46__46__47_helpers_47_unicode__.__esModule && $___46__46__47_helpers_47_unicode__ || {default: $___46__46__47_helpers_47_unicode__}).KEY_CODES;
var $__6 = ($___46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47_helpers_47_dom_47_event__ && $___46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47_helpers_47_dom_47_event__}),
    stopPropagation = $__6.stopPropagation,
    stopImmediatePropagation = $__6.stopImmediatePropagation,
    isImmediatePropagationStopped = $__6.isImmediatePropagationStopped;
var TextEditor = BaseEditor.prototype.extend();
TextEditor.prototype.init = function() {
  var that = this;
  this.createElements();
  this.eventManager = eventManagerObject(this);
  this.bindEvents();
  this.autoResize = autoResize();
  this.instance.addHook('afterDestroy', function() {
    that.destroy();
  });
};
TextEditor.prototype.getValue = function() {
  return this.TEXTAREA.value;
};
TextEditor.prototype.setValue = function(newValue) {
  this.TEXTAREA.value = newValue;
};
var onBeforeKeyDown = function onBeforeKeyDown(event) {
  var instance = this,
      that = instance.getActiveEditor(),
      ctrlDown;
  ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey;
  if (event.target !== that.TEXTAREA || isImmediatePropagationStopped(event)) {
    return;
  }
  if (event.keyCode === 17 || event.keyCode === 224 || event.keyCode === 91 || event.keyCode === 93) {
    stopImmediatePropagation(event);
    return;
  }
  switch (event.keyCode) {
    case KEY_CODES.ARROW_RIGHT:
      if (that.isInFullEditMode()) {
        if ((!that.isWaiting() && !that.allowKeyEventPropagation) || (!that.isWaiting() && that.allowKeyEventPropagation && !that.allowKeyEventPropagation(event.keyCode))) {
          stopImmediatePropagation(event);
        }
      }
      break;
    case KEY_CODES.ARROW_LEFT:
      if (that.isInFullEditMode()) {
        if ((!that.isWaiting() && !that.allowKeyEventPropagation) || (!that.isWaiting() && that.allowKeyEventPropagation && !that.allowKeyEventPropagation(event.keyCode))) {
          stopImmediatePropagation(event);
        }
      }
      break;
    case KEY_CODES.ARROW_UP:
    case KEY_CODES.ARROW_DOWN:
      if (that.isInFullEditMode()) {
        if ((!that.isWaiting() && !that.allowKeyEventPropagation) || (!that.isWaiting() && that.allowKeyEventPropagation && !that.allowKeyEventPropagation(event.keyCode))) {
          stopImmediatePropagation(event);
        }
      }
      break;
    case KEY_CODES.ENTER:
      var selected = that.instance.getSelected();
      var isMultipleSelection = !(selected[0] === selected[2] && selected[1] === selected[3]);
      if ((ctrlDown && !isMultipleSelection) || event.altKey) {
        if (that.isOpened()) {
          var caretPosition = getCaretPosition(that.TEXTAREA),
              value = that.getValue();
          var newValue = value.slice(0, caretPosition) + '\n' + value.slice(caretPosition);
          that.setValue(newValue);
          setCaretPosition(that.TEXTAREA, caretPosition + 1);
        } else {
          that.beginEditing(that.originalValue + '\n');
        }
        stopImmediatePropagation(event);
      }
      event.preventDefault();
      break;
    case KEY_CODES.A:
    case KEY_CODES.X:
    case KEY_CODES.C:
    case KEY_CODES.V:
      if (ctrlDown) {
        stopImmediatePropagation(event);
      }
      break;
    case KEY_CODES.BACKSPACE:
    case KEY_CODES.DELETE:
    case KEY_CODES.HOME:
    case KEY_CODES.END:
      stopImmediatePropagation(event);
      break;
  }
  if ([KEY_CODES.ARROW_UP, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT].indexOf(event.keyCode) === -1) {
    that.autoResize.resize(String.fromCharCode(event.keyCode));
  }
};
TextEditor.prototype.open = function() {
  this.refreshDimensions();
  this.instance.addHook('beforeKeyDown', onBeforeKeyDown);
};
TextEditor.prototype.close = function(tdOutside) {
  this.textareaParentStyle.display = 'none';
  this.autoResize.unObserve();
  if (document.activeElement === this.TEXTAREA) {
    this.instance.listen();
  }
  this.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
};
TextEditor.prototype.focus = function() {
  this.TEXTAREA.focus();
  setCaretPosition(this.TEXTAREA, this.TEXTAREA.value.length);
};
TextEditor.prototype.createElements = function() {
  this.TEXTAREA = document.createElement('TEXTAREA');
  addClass(this.TEXTAREA, 'handsontableInput');
  this.textareaStyle = this.TEXTAREA.style;
  this.textareaStyle.width = 0;
  this.textareaStyle.height = 0;
  this.TEXTAREA_PARENT = document.createElement('DIV');
  addClass(this.TEXTAREA_PARENT, 'handsontableInputHolder');
  this.textareaParentStyle = this.TEXTAREA_PARENT.style;
  this.textareaParentStyle.top = 0;
  this.textareaParentStyle.left = 0;
  this.textareaParentStyle.display = 'none';
  this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
  this.instance.rootElement.appendChild(this.TEXTAREA_PARENT);
  var that = this;
  this.instance._registerTimeout(setTimeout(function() {
    that.refreshDimensions();
  }, 0));
};
TextEditor.prototype.getEditedCell = function() {
  var editorSection = this.checkEditorSection(),
      editedCell;
  switch (editorSection) {
    case 'top':
      editedCell = this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      });
      this.textareaParentStyle.zIndex = 101;
      break;
    case 'top-left-corner':
      editedCell = this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      });
      this.textareaParentStyle.zIndex = 103;
      break;
    case 'bottom-left-corner':
      editedCell = this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      });
      this.textareaParentStyle.zIndex = 103;
      break;
    case 'left':
      editedCell = this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      });
      this.textareaParentStyle.zIndex = 102;
      break;
    case 'bottom':
      editedCell = this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      });
      this.textareaParentStyle.zIndex = 102;
      break;
    default:
      editedCell = this.instance.getCell(this.row, this.col);
      this.textareaParentStyle.zIndex = '';
      break;
  }
  return editedCell != -1 && editedCell != -2 ? editedCell : void 0;
};
TextEditor.prototype.refreshDimensions = function() {
  if (this.state !== Handsontable.EditorState.EDITING) {
    return;
  }
  this.TD = this.getEditedCell();
  if (!this.TD) {
    this.close(true);
    return;
  }
  var currentOffset = offset(this.TD),
      containerOffset = offset(this.instance.rootElement),
      scrollableContainer = getScrollableElement(this.TD),
      totalRowsCount = this.instance.countRows(),
      editTop = currentOffset.top - containerOffset.top - 1 - (scrollableContainer.scrollTop || 0),
      editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0),
      settings = this.instance.getSettings(),
      rowHeadersCount = settings.rowHeaders ? 1 : 0,
      colHeadersCount = settings.colHeaders ? 1 : 0,
      editorSection = this.checkEditorSection(),
      backgroundColor = this.TD.style.backgroundColor,
      cssTransformOffset;
  switch (editorSection) {
    case 'top':
      cssTransformOffset = getCssTransform(this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
      break;
    case 'left':
      cssTransformOffset = getCssTransform(this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
      break;
    case 'top-left-corner':
      cssTransformOffset = getCssTransform(this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
      break;
    case 'bottom-left-corner':
      cssTransformOffset = getCssTransform(this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
      break;
    case 'bottom':
      cssTransformOffset = getCssTransform(this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
      break;
  }
  if (colHeadersCount && this.instance.getSelected()[0] === 0 || (settings.fixedRowsBottom && this.instance.getSelected()[0] === totalRowsCount - settings.fixedRowsBottom)) {
    editTop += 1;
  }
  if (this.instance.getSelected()[1] === 0) {
    editLeft += 1;
  }
  if (cssTransformOffset && cssTransformOffset != -1) {
    this.textareaParentStyle[cssTransformOffset[0]] = cssTransformOffset[1];
  } else {
    resetCssTransform(this.textareaParentStyle);
  }
  this.textareaParentStyle.top = editTop + 'px';
  this.textareaParentStyle.left = editLeft + 'px';
  var cellTopOffset = this.TD.offsetTop - this.instance.view.wt.wtOverlays.topOverlay.getScrollPosition(),
      cellLeftOffset = this.TD.offsetLeft - this.instance.view.wt.wtOverlays.leftOverlay.getScrollPosition();
  var width = innerWidth(this.TD) - 8;
  var maxWidth = this.instance.view.maximumVisibleElementWidth(cellLeftOffset) - 9;
  var height = this.TD.scrollHeight + 1;
  var maxHeight = Math.max(this.instance.view.maximumVisibleElementHeight(cellTopOffset) - 2, 23);
  var cellComputedStyle = getComputedStyle(this.TD);
  this.TEXTAREA.style.fontSize = cellComputedStyle.fontSize;
  this.TEXTAREA.style.fontFamily = cellComputedStyle.fontFamily;
  this.TEXTAREA.style.backgroundColor = '';
  this.TEXTAREA.style.backgroundColor = backgroundColor ? backgroundColor : getComputedStyle(this.TEXTAREA).backgroundColor;
  this.autoResize.init(this.TEXTAREA, {
    minHeight: Math.min(height, maxHeight),
    maxHeight: maxHeight,
    minWidth: Math.min(width, maxWidth),
    maxWidth: maxWidth
  }, true);
  this.textareaParentStyle.display = 'block';
};
TextEditor.prototype.bindEvents = function() {
  var editor = this;
  this.eventManager.addEventListener(this.TEXTAREA, 'cut', function(event) {
    stopPropagation(event);
  });
  this.eventManager.addEventListener(this.TEXTAREA, 'paste', function(event) {
    stopPropagation(event);
  });
  this.instance.addHook('afterScrollVertically', function() {
    editor.refreshDimensions();
  });
  this.instance.addHook('afterColumnResize', function() {
    editor.refreshDimensions();
    editor.focus();
  });
  this.instance.addHook('afterRowResize', function() {
    editor.refreshDimensions();
    editor.focus();
  });
  this.instance.addHook('afterDestroy', function() {
    editor.eventManager.destroy();
  });
};
TextEditor.prototype.destroy = function() {
  this.eventManager.destroy();
};
;
registerEditor('text', TextEditor);

//# 
},{"_baseEditor":28,"autoResize":"autoResize","editors":27,"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"helpers/unicode":44}],32:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  EventManager: {get: function() {
      return EventManager;
    }},
  eventManager: {get: function() {
      return eventManager;
    }},
  __esModule: {value: true}
});
var $__helpers_47_dom_47_element__,
    $__helpers_47_browser__;
var $__0 = ($__helpers_47_dom_47_element__ = require("helpers/dom/element"), $__helpers_47_dom_47_element__ && $__helpers_47_dom_47_element__.__esModule && $__helpers_47_dom_47_element__ || {default: $__helpers_47_dom_47_element__}),
    polymerWrap = $__0.polymerWrap,
    closest = $__0.closest;
var isWebComponentSupportedNatively = ($__helpers_47_browser__ = require("helpers/browser"), $__helpers_47_browser__ && $__helpers_47_browser__.__esModule && $__helpers_47_browser__ || {default: $__helpers_47_browser__}).isWebComponentSupportedNatively;
var EventManager = function EventManager() {
  var context = arguments[0] !== (void 0) ? arguments[0] : null;
  this.context = context || this;
  if (!this.context.eventListeners) {
    this.context.eventListeners = [];
  }
};
($traceurRuntime.createClass)(EventManager, {
  addEventListener: function(element, eventName, callback) {
    var $__2 = this;
    var context = this.context;
    function callbackProxy(event) {
      if (event.target == void 0 && event.srcElement != void 0) {
        if (event.definePoperty) {
          event.definePoperty('target', {value: event.srcElement});
        } else {
          event.target = event.srcElement;
        }
      }
      if (event.preventDefault == void 0) {
        if (event.definePoperty) {
          event.definePoperty('preventDefault', {value: function() {
              this.returnValue = false;
            }});
        } else {
          event.preventDefault = function() {
            this.returnValue = false;
          };
        }
      }
      event = extendEvent(context, event);
      callback.call(this, event);
    }
    this.context.eventListeners.push({
      element: element,
      event: eventName,
      callback: callback,
      callbackProxy: callbackProxy
    });
    if (window.addEventListener) {
      element.addEventListener(eventName, callbackProxy, false);
    } else {
      element.attachEvent('on' + eventName, callbackProxy);
    }
    Handsontable.countEventManagerListeners++;
    return (function() {
      $__2.removeEventListener(element, eventName, callback);
    });
  },
  removeEventListener: function(element, eventName, callback) {
    var len = this.context.eventListeners.length;
    var tmpEvent;
    while (len--) {
      tmpEvent = this.context.eventListeners[len];
      if (tmpEvent.event == eventName && tmpEvent.element == element) {
        if (callback && callback != tmpEvent.callback) {
          continue;
        }
        this.context.eventListeners.splice(len, 1);
        if (tmpEvent.element.removeEventListener) {
          tmpEvent.element.removeEventListener(tmpEvent.event, tmpEvent.callbackProxy, false);
        } else {
          tmpEvent.element.detachEvent('on' + tmpEvent.event, tmpEvent.callbackProxy);
        }
        Handsontable.countEventManagerListeners--;
      }
    }
  },
  clearEvents: function() {
    if (!this.context) {
      return;
    }
    var len = this.context.eventListeners.length;
    while (len--) {
      var event = this.context.eventListeners[len];
      if (event) {
        this.removeEventListener(event.element, event.event, event.callback);
      }
    }
  },
  clear: function() {
    this.clearEvents();
  },
  destroy: function() {
    this.clearEvents();
    this.context = null;
  },
  fireEvent: function(element, eventName) {
    var options = {
      bubbles: true,
      cancelable: (eventName !== 'mousemove'),
      view: window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 1,
      clientY: 1,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: undefined
    };
    var event;
    if (document.createEvent) {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent(eventName, options.bubbles, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.relatedTarget || document.body.parentNode);
    } else {
      event = document.createEventObject();
    }
    if (element.dispatchEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent('on' + eventName, event);
    }
  }
}, {});
function extendEvent(context, event) {
  var componentName = 'HOT-TABLE';
  var isHotTableSpotted;
  var fromElement;
  var realTarget;
  var target;
  var len;
  event.isTargetWebComponent = false;
  event.realTarget = event.target;
  if (!Handsontable.eventManager.isHotTableEnv) {
    return event;
  }
  event = polymerWrap(event);
  len = event.path ? event.path.length : 0;
  while (len--) {
    if (event.path[len].nodeName === componentName) {
      isHotTableSpotted = true;
    } else if (isHotTableSpotted && event.path[len].shadowRoot) {
      target = event.path[len];
      break;
    }
    if (len === 0 && !target) {
      target = event.path[len];
    }
  }
  if (!target) {
    target = event.target;
  }
  event.isTargetWebComponent = true;
  if (isWebComponentSupportedNatively()) {
    event.realTarget = event.srcElement || event.toElement;
  } else if (context instanceof Handsontable.Core || context instanceof Walkontable) {
    if (context instanceof Handsontable.Core) {
      fromElement = context.view ? context.view.wt.wtTable.TABLE : null;
    } else if (context instanceof Walkontable) {
      fromElement = context.wtTable.TABLE.parentNode.parentNode;
    }
    realTarget = closest(event.target, [componentName], fromElement);
    if (realTarget) {
      event.realTarget = fromElement.querySelector(componentName) || event.target;
    } else {
      event.realTarget = event.target;
    }
  }
  Object.defineProperty(event, 'target', {
    get: function() {
      return polymerWrap(target);
    },
    enumerable: true,
    configurable: true
  });
  return event;
}
;
window.Handsontable = window.Handsontable || {};
Handsontable.countEventManagerListeners = 0;
Handsontable.eventManager = eventManager;
function eventManager(context) {
  return new EventManager(context);
}

//# 
},{"helpers/browser":34,"helpers/dom/element":36}],33:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  to2dArray: {get: function() {
      return to2dArray;
    }},
  extendArray: {get: function() {
      return extendArray;
    }},
  pivot: {get: function() {
      return pivot;
    }},
  arrayReduce: {get: function() {
      return arrayReduce;
    }},
  arrayFilter: {get: function() {
      return arrayFilter;
    }},
  arrayMap: {get: function() {
      return arrayMap;
    }},
  arrayEach: {get: function() {
      return arrayEach;
    }},
  arraySum: {get: function() {
      return arraySum;
    }},
  arrayAvg: {get: function() {
      return arrayAvg;
    }},
  arrayFlatten: {get: function() {
      return arrayFlatten;
    }},
  arrayUnique: {get: function() {
      return arrayUnique;
    }},
  __esModule: {value: true}
});
function to2dArray(arr) {
  var i = 0,
      ilen = arr.length;
  while (i < ilen) {
    arr[i] = [arr[i]];
    i++;
  }
}
function extendArray(arr, extension) {
  var i = 0,
      ilen = extension.length;
  while (i < ilen) {
    arr.push(extension[i]);
    i++;
  }
}
function pivot(arr) {
  var pivotedArr = [];
  if (!arr || arr.length === 0 || !arr[0] || arr[0].length === 0) {
    return pivotedArr;
  }
  var rowCount = arr.length;
  var colCount = arr[0].length;
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      if (!pivotedArr[j]) {
        pivotedArr[j] = [];
      }
      pivotedArr[j][i] = arr[i][j];
    }
  }
  return pivotedArr;
}
function arrayReduce(array, iteratee, accumulator, initFromArray) {
  var index = -1,
      length = array.length;
  if (initFromArray && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];
  while (++index < length) {
    var value = array[index];
    result[++resIndex] = iteratee(value, index, array);
  }
  return result;
}
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
function arraySum(array) {
  return arrayReduce(array, (function(a, b) {
    return (a + b);
  }), 0);
}
function arrayAvg(array) {
  if (!array.length) {
    return 0;
  }
  return arraySum(array) / array.length;
}
function arrayFlatten(array) {
  return arrayReduce(array, (function(initial, value) {
    return initial.concat(Array.isArray(value) ? arrayFlatten(value) : value);
  }), []);
}
function arrayUnique(array) {
  var unique = [];
  arrayEach(array, (function(value) {
    if (unique.indexOf(value) === -1) {
      unique.push(value);
    }
  }));
  return unique;
}

//# 
},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  isIE8: {get: function() {
      return isIE8;
    }},
  isIE9: {get: function() {
      return isIE9;
    }},
  isSafari: {get: function() {
      return isSafari;
    }},
  isChrome: {get: function() {
      return isChrome;
    }},
  isMobileBrowser: {get: function() {
      return isMobileBrowser;
    }},
  isTouchSupported: {get: function() {
      return isTouchSupported;
    }},
  isWebComponentSupportedNatively: {get: function() {
      return isWebComponentSupportedNatively;
    }},
  hasCaptionProblem: {get: function() {
      return hasCaptionProblem;
    }},
  __esModule: {value: true}
});
var _isIE8 = !(document.createTextNode('test').textContent);
function isIE8() {
  return _isIE8;
}
var _isIE9 = !!(document.documentMode);
function isIE9() {
  return _isIE9;
}
var _isSafari = (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor));
function isSafari() {
  return _isSafari;
}
var _isChrome = (/Chrome/.test(navigator.userAgent) && /Google/.test(navigator.vendor));
function isChrome() {
  return _isChrome;
}
function isMobileBrowser(userAgent) {
  if (!userAgent) {
    userAgent = navigator.userAgent;
  }
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
}
function isTouchSupported() {
  return ('ontouchstart' in window);
}
function isWebComponentSupportedNatively() {
  var test = document.createElement('div');
  return test.createShadowRoot && test.createShadowRoot.toString().match(/\[native code\]/) ? true : false;
}
var _hasCaptionProblem;
function detectCaptionProblem() {
  var TABLE = document.createElement('TABLE');
  TABLE.style.borderSpacing = 0;
  TABLE.style.borderWidth = 0;
  TABLE.style.padding = 0;
  var TBODY = document.createElement('TBODY');
  TABLE.appendChild(TBODY);
  TBODY.appendChild(document.createElement('TR'));
  TBODY.firstChild.appendChild(document.createElement('TD'));
  TBODY.firstChild.firstChild.innerHTML = '<tr><td>t<br>t</td></tr>';
  var CAPTION = document.createElement('CAPTION');
  CAPTION.innerHTML = 'c<br>c<br>c<br>c';
  CAPTION.style.padding = 0;
  CAPTION.style.margin = 0;
  TABLE.insertBefore(CAPTION, TBODY);
  document.body.appendChild(TABLE);
  _hasCaptionProblem = (TABLE.offsetHeight < 2 * TABLE.lastChild.offsetHeight);
  document.body.removeChild(TABLE);
}
function hasCaptionProblem() {
  if (_hasCaptionProblem === void 0) {
    detectCaptionProblem();
  }
  return _hasCaptionProblem;
}

//# 
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  spreadsheetColumnLabel: {get: function() {
      return spreadsheetColumnLabel;
    }},
  createSpreadsheetData: {get: function() {
      return createSpreadsheetData;
    }},
  createSpreadsheetObjectData: {get: function() {
      return createSpreadsheetObjectData;
    }},
  translateRowsToColumns: {get: function() {
      return translateRowsToColumns;
    }},
  cellMethodLookupFactory: {get: function() {
      return cellMethodLookupFactory;
    }},
  __esModule: {value: true}
});
var $__object__;
var getPrototypeOf = ($__object__ = require("object"), $__object__ && $__object__.__esModule && $__object__ || {default: $__object__}).getPrototypeOf;
function spreadsheetColumnLabel(index) {
  var dividend = index + 1;
  var columnLabel = '';
  var modulo;
  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = parseInt((dividend - modulo) / 26, 10);
  }
  return columnLabel;
}
function createSpreadsheetData(rowCount, colCount) {
  rowCount = typeof rowCount === 'number' ? rowCount : 100;
  colCount = typeof colCount === 'number' ? colCount : 4;
  var rows = [],
      i,
      j;
  for (i = 0; i < rowCount; i++) {
    var row = [];
    for (j = 0; j < colCount; j++) {
      row.push(spreadsheetColumnLabel(j) + (i + 1));
    }
    rows.push(row);
  }
  return rows;
}
function createSpreadsheetObjectData(rowCount, colCount) {
  rowCount = typeof rowCount === 'number' ? rowCount : 100;
  colCount = typeof colCount === 'number' ? colCount : 4;
  var rows = [],
      i,
      j;
  for (i = 0; i < rowCount; i++) {
    var row = {};
    for (j = 0; j < colCount; j++) {
      row['prop' + j] = spreadsheetColumnLabel(j) + (i + 1);
    }
    rows.push(row);
  }
  return rows;
}
function translateRowsToColumns(input) {
  var i,
      ilen,
      j,
      jlen,
      output = [],
      olen = 0;
  for (i = 0, ilen = input.length; i < ilen; i++) {
    for (j = 0, jlen = input[i].length; j < jlen; j++) {
      if (j == olen) {
        output.push([]);
        olen++;
      }
      output[j].push(input[i][j]);
    }
  }
  return output;
}
function cellMethodLookupFactory(methodName, allowUndefined) {
  allowUndefined = typeof allowUndefined == 'undefined' ? true : allowUndefined;
  return function cellMethodLookup(row, col) {
    return (function getMethodFromProperties(properties) {
      if (!properties) {
        return;
      } else if (properties.hasOwnProperty(methodName) && properties[methodName] !== void 0) {
        return properties[methodName];
      } else if (properties.hasOwnProperty('type') && properties.type) {
        var type;
        if (typeof properties.type != 'string') {
          throw new Error('Cell type must be a string ');
        }
        type = translateTypeNameToObject(properties.type);
        if (type.hasOwnProperty(methodName)) {
          return type[methodName];
        } else if (allowUndefined) {
          return;
        }
      }
      return getMethodFromProperties(getPrototypeOf(properties));
    })(typeof row == 'number' ? this.getCellMeta(row, col) : row);
  };
  function translateTypeNameToObject(typeName) {
    var type = Handsontable.cellTypes[typeName];
    if (typeof type == 'undefined') {
      throw new Error('You declared cell type "' + typeName + '" as a string that is not mapped to a known object. ' + 'Cell type must be an object or a string mapped to an object in Handsontable.cellTypes');
    }
    return type;
  }
}

//# 
},{"object":41}],36:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  closest: {get: function() {
      return closest;
    }},
  isChildOf: {get: function() {
      return isChildOf;
    }},
  isChildOfWebComponentTable: {get: function() {
      return isChildOfWebComponentTable;
    }},
  polymerWrap: {get: function() {
      return polymerWrap;
    }},
  polymerUnwrap: {get: function() {
      return polymerUnwrap;
    }},
  index: {get: function() {
      return index;
    }},
  overlayContainsElement: {get: function() {
      return overlayContainsElement;
    }},
  hasClass: {get: function() {
      return hasClass;
    }},
  addClass: {get: function() {
      return addClass;
    }},
  removeClass: {get: function() {
      return removeClass;
    }},
  removeTextNodes: {get: function() {
      return removeTextNodes;
    }},
  empty: {get: function() {
      return empty;
    }},
  HTML_CHARACTERS: {get: function() {
      return HTML_CHARACTERS;
    }},
  fastInnerHTML: {get: function() {
      return fastInnerHTML;
    }},
  fastInnerText: {get: function() {
      return fastInnerText;
    }},
  isVisible: {get: function() {
      return isVisible;
    }},
  offset: {get: function() {
      return offset;
    }},
  getWindowScrollTop: {get: function() {
      return getWindowScrollTop;
    }},
  getWindowScrollLeft: {get: function() {
      return getWindowScrollLeft;
    }},
  getScrollTop: {get: function() {
      return getScrollTop;
    }},
  getScrollLeft: {get: function() {
      return getScrollLeft;
    }},
  getScrollableElement: {get: function() {
      return getScrollableElement;
    }},
  getTrimmingContainer: {get: function() {
      return getTrimmingContainer;
    }},
  getStyle: {get: function() {
      return getStyle;
    }},
  getComputedStyle: {get: function() {
      return getComputedStyle;
    }},
  outerWidth: {get: function() {
      return outerWidth;
    }},
  outerHeight: {get: function() {
      return outerHeight;
    }},
  innerHeight: {get: function() {
      return innerHeight;
    }},
  innerWidth: {get: function() {
      return innerWidth;
    }},
  addEvent: {get: function() {
      return addEvent;
    }},
  removeEvent: {get: function() {
      return removeEvent;
    }},
  getCaretPosition: {get: function() {
      return getCaretPosition;
    }},
  getSelectionEndPosition: {get: function() {
      return getSelectionEndPosition;
    }},
  setCaretPosition: {get: function() {
      return setCaretPosition;
    }},
  getScrollbarWidth: {get: function() {
      return getScrollbarWidth;
    }},
  setOverlayPosition: {get: function() {
      return setOverlayPosition;
    }},
  getCssTransform: {get: function() {
      return getCssTransform;
    }},
  resetCssTransform: {get: function() {
      return resetCssTransform;
    }},
  isInput: {get: function() {
      return isInput;
    }},
  isOutsideInput: {get: function() {
      return isOutsideInput;
    }},
  requestAnimationFrame: {get: function() {
      return requestAnimationFrame;
    }},
  cancelAnimationFrame: {get: function() {
      return cancelAnimationFrame;
    }},
  __esModule: {value: true}
});
var $___46__46__47_browser__;
var $__0 = ($___46__46__47_browser__ = require("../browser"), $___46__46__47_browser__ && $___46__46__47_browser__.__esModule && $___46__46__47_browser__ || {default: $___46__46__47_browser__}),
    isIE8 = $__0.isIE8,
    isIE9 = $__0.isIE9,
    isSafari = $__0.isSafari,
    hasCaptionProblem = $__0.hasCaptionProblem;
function closest(element, nodes, until) {
  while (element != null && element !== until) {
    if (element.nodeType === Node.ELEMENT_NODE && (nodes.indexOf(element.nodeName) > -1 || nodes.indexOf(element) > -1)) {
      return element;
    }
    if (element.host && element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      element = element.host;
    } else {
      element = element.parentNode;
    }
  }
  return null;
}
function isChildOf(child, parent) {
  var node = child.parentNode;
  var queriedParents = [];
  if (typeof parent === 'string') {
    queriedParents = Array.prototype.slice.call(document.querySelectorAll(parent), 0);
  } else {
    queriedParents.push(parent);
  }
  while (node != null) {
    if (queriedParents.indexOf(node) > -1) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
function isChildOfWebComponentTable(element) {
  var hotTableName = 'hot-table',
      result = false,
      parentNode;
  parentNode = polymerWrap(element);
  function isHotTable(element) {
    return element.nodeType === Node.ELEMENT_NODE && element.nodeName === hotTableName.toUpperCase();
  }
  while (parentNode != null) {
    if (isHotTable(parentNode)) {
      result = true;
      break;
    } else if (parentNode.host && parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      result = isHotTable(parentNode.host);
      if (result) {
        break;
      }
      parentNode = parentNode.host;
    }
    parentNode = parentNode.parentNode;
  }
  return result;
}
function polymerWrap(element) {
  return typeof Polymer !== 'undefined' && typeof wrap === 'function' ? wrap(element) : element;
}
function polymerUnwrap(element) {
  return typeof Polymer !== 'undefined' && typeof unwrap === 'function' ? unwrap(element) : element;
}
function index(element) {
  var i = 0;
  if (element.previousSibling) {
    while (element = element.previousSibling) {
      ++i;
    }
  }
  return i;
}
function overlayContainsElement(overlayType, element) {
  var overlayElement = document.querySelector('.ht_clone_' + overlayType);
  return overlayElement ? overlayElement.contains(element) : null;
}
var classListSupport = document.documentElement.classList ? true : false;
var _hasClass,
    _addClass,
    _removeClass;
function filterEmptyClassNames(classNames) {
  var len = 0,
      result = [];
  if (!classNames || !classNames.length) {
    return result;
  }
  while (classNames[len]) {
    result.push(classNames[len]);
    len++;
  }
  return result;
}
if (classListSupport) {
  var isSupportMultipleClassesArg = (function() {
    var element = document.createElement('div');
    element.classList.add('test', 'test2');
    return element.classList.contains('test2');
  }());
  _hasClass = function _hasClass(element, className) {
    if (className === '') {
      return false;
    }
    return element.classList.contains(className);
  };
  _addClass = function _addClass(element, className) {
    var len = 0;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    if (isSupportMultipleClassesArg) {
      element.classList.add.apply(element.classList, className);
    } else {
      while (className && className[len]) {
        element.classList.add(className[len]);
        len++;
      }
    }
  };
  _removeClass = function _removeClass(element, className) {
    var len = 0;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    if (isSupportMultipleClassesArg) {
      element.classList.remove.apply(element.classList, className);
    } else {
      while (className && className[len]) {
        element.classList.remove(className[len]);
        len++;
      }
    }
  };
} else {
  var createClassNameRegExp = function createClassNameRegExp(className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)');
  };
  _hasClass = function _hasClass(element, className) {
    return element.className.match(createClassNameRegExp(className)) ? true : false;
  };
  _addClass = function _addClass(element, className) {
    var len = 0,
        _className = element.className;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    if (_className === '') {
      _className = className.join(' ');
    } else {
      while (className && className[len]) {
        if (!createClassNameRegExp(className[len]).test(_className)) {
          _className += ' ' + className[len];
        }
        len++;
      }
    }
    element.className = _className;
  };
  _removeClass = function _removeClass(element, className) {
    var len = 0,
        _className = element.className;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    while (className && className[len]) {
      _className = _className.replace(createClassNameRegExp(className[len]), ' ').trim();
      len++;
    }
    if (element.className !== _className) {
      element.className = _className;
    }
  };
}
function hasClass(element, className) {
  return _hasClass(element, className);
}
function addClass(element, className) {
  return _addClass(element, className);
}
function removeClass(element, className) {
  return _removeClass(element, className);
}
function removeTextNodes(element, parent) {
  if (element.nodeType === 3) {
    parent.removeChild(element);
  } else if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'].indexOf(element.nodeName) > -1) {
    var childs = element.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
      removeTextNodes(childs[i], element);
    }
  }
}
function empty(element) {
  var child;
  while (child = element.lastChild) {
    element.removeChild(child);
  }
}
var HTML_CHARACTERS = /(<(.*)>|&(.*);)/;
function fastInnerHTML(element, content) {
  if (HTML_CHARACTERS.test(content)) {
    element.innerHTML = content;
  } else {
    fastInnerText(element, content);
  }
}
var textContextSupport = document.createTextNode('test').textContent ? true : false;
function fastInnerText(element, content) {
  var child = element.firstChild;
  if (child && child.nodeType === 3 && child.nextSibling === null) {
    if (textContextSupport) {
      child.textContent = content;
    } else {
      child.data = content;
    }
  } else {
    empty(element);
    element.appendChild(document.createTextNode(content));
  }
}
function isVisible(elem) {
  var next = elem;
  while (polymerUnwrap(next) !== document.documentElement) {
    if (next === null) {
      return false;
    } else if (next.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      if (next.host) {
        if (next.host.impl) {
          return isVisible(next.host.impl);
        } else if (next.host) {
          return isVisible(next.host);
        } else {
          throw new Error('Lost in Web Components world');
        }
      } else {
        return false;
      }
    } else if (next.style.display === 'none') {
      return false;
    }
    next = next.parentNode;
  }
  return true;
}
function offset(elem) {
  var offsetLeft,
      offsetTop,
      lastElem,
      docElem,
      box;
  docElem = document.documentElement;
  if (hasCaptionProblem() && elem.firstChild && elem.firstChild.nodeName === 'CAPTION') {
    box = elem.getBoundingClientRect();
    return {
      top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    };
  }
  offsetLeft = elem.offsetLeft;
  offsetTop = elem.offsetTop;
  lastElem = elem;
  while (elem = elem.offsetParent) {
    if (elem === document.body) {
      break;
    }
    offsetLeft += elem.offsetLeft;
    offsetTop += elem.offsetTop;
    lastElem = elem;
  }
  if (lastElem && lastElem.style.position === 'fixed') {
    offsetLeft += window.pageXOffset || docElem.scrollLeft;
    offsetTop += window.pageYOffset || docElem.scrollTop;
  }
  return {
    left: offsetLeft,
    top: offsetTop
  };
}
function getWindowScrollTop() {
  var res = window.scrollY;
  if (res === void 0) {
    res = document.documentElement.scrollTop;
  }
  return res;
}
function getWindowScrollLeft() {
  var res = window.scrollX;
  if (res === void 0) {
    res = document.documentElement.scrollLeft;
  }
  return res;
}
function getScrollTop(element) {
  if (element === window) {
    return getWindowScrollTop();
  } else {
    return element.scrollTop;
  }
}
function getScrollLeft(element) {
  if (element === window) {
    return getWindowScrollLeft();
  } else {
    return element.scrollLeft;
  }
}
function getScrollableElement(element) {
  var el = element.parentNode,
      props = ['auto', 'scroll'],
      overflow,
      overflowX,
      overflowY,
      computedStyle = '',
      computedOverflow = '',
      computedOverflowY = '',
      computedOverflowX = '';
  while (el && el.style && document.body !== el) {
    overflow = el.style.overflow;
    overflowX = el.style.overflowX;
    overflowY = el.style.overflowY;
    if (overflow == 'scroll' || overflowX == 'scroll' || overflowY == 'scroll') {
      return el;
    } else if (window.getComputedStyle) {
      computedStyle = window.getComputedStyle(el);
      computedOverflow = computedStyle.getPropertyValue('overflow');
      computedOverflowY = computedStyle.getPropertyValue('overflow-y');
      computedOverflowX = computedStyle.getPropertyValue('overflow-x');
      if (computedOverflow === 'scroll' || computedOverflowX === 'scroll' || computedOverflowY === 'scroll') {
        return el;
      }
    }
    if (el.clientHeight <= el.scrollHeight && (props.indexOf(overflowY) !== -1 || props.indexOf(overflow) !== -1 || props.indexOf(computedOverflow) !== -1 || props.indexOf(computedOverflowY) !== -1)) {
      return el;
    }
    if (el.clientWidth <= el.scrollWidth && (props.indexOf(overflowX) !== -1 || props.indexOf(overflow) !== -1 || props.indexOf(computedOverflow) !== -1 || props.indexOf(computedOverflowX) !== -1)) {
      return el;
    }
    el = el.parentNode;
  }
  return window;
}
function getTrimmingContainer(base) {
  var el = base.parentNode;
  while (el && el.style && document.body !== el) {
    if (el.style.overflow !== 'visible' && el.style.overflow !== '') {
      return el;
    } else if (window.getComputedStyle) {
      var computedStyle = window.getComputedStyle(el);
      if (computedStyle.getPropertyValue('overflow') !== 'visible' && computedStyle.getPropertyValue('overflow') !== '') {
        return el;
      }
    }
    el = el.parentNode;
  }
  return window;
}
function getStyle(element, prop) {
  if (!element) {
    return;
  } else if (element === window) {
    if (prop === 'width') {
      return window.innerWidth + 'px';
    } else if (prop === 'height') {
      return window.innerHeight + 'px';
    }
    return;
  }
  var styleProp = element.style[prop],
      computedStyle;
  if (styleProp !== '' && styleProp !== void 0) {
    return styleProp;
  } else {
    computedStyle = getComputedStyle(element);
    if (computedStyle[prop] !== '' && computedStyle[prop] !== void 0) {
      return computedStyle[prop];
    }
    return void 0;
  }
}
function getComputedStyle(element) {
  return element.currentStyle || document.defaultView.getComputedStyle(element);
}
function outerWidth(element) {
  return element.offsetWidth;
}
function outerHeight(elem) {
  if (hasCaptionProblem() && elem.firstChild && elem.firstChild.nodeName === 'CAPTION') {
    return elem.offsetHeight + elem.firstChild.offsetHeight;
  } else {
    return elem.offsetHeight;
  }
}
function innerHeight(element) {
  return element.clientHeight || element.innerHeight;
}
function innerWidth(element) {
  return element.clientWidth || element.innerWidth;
}
function addEvent(element, event, callback) {
  if (window.addEventListener) {
    element.addEventListener(event, callback, false);
  } else {
    element.attachEvent('on' + event, callback);
  }
}
function removeEvent(element, event, callback) {
  if (window.removeEventListener) {
    element.removeEventListener(event, callback, false);
  } else {
    element.detachEvent('on' + event, callback);
  }
}
function getCaretPosition(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();
    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }
    var re = el.createTextRange();
    var rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);
    return rc.text.length;
  }
  return 0;
}
function getSelectionEndPosition(el) {
  if (el.selectionEnd) {
    return el.selectionEnd;
  } else if (document.selection) {
    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }
    var re = el.createTextRange();
    return re.text.indexOf(r.text) + r.text.length;
  }
}
function setCaretPosition(element, pos, endPos) {
  if (endPos === void 0) {
    endPos = pos;
  }
  if (element.setSelectionRange) {
    element.focus();
    try {
      element.setSelectionRange(pos, endPos);
    } catch (err) {
      var elementParent = element.parentNode;
      var parentDisplayValue = elementParent.style.display;
      elementParent.style.display = 'block';
      element.setSelectionRange(pos, endPos);
      elementParent.style.display = parentDisplayValue;
    }
  } else if (element.createTextRange) {
    var range = element.createTextRange();
    range.collapse(true);
    range.moveEnd('character', endPos);
    range.moveStart('character', pos);
    range.select();
  }
}
var cachedScrollbarWidth;
function walkontableCalculateScrollbarWidth() {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';
  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);
  (document.body || document.documentElement).appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) {
    w2 = outer.clientWidth;
  }
  (document.body || document.documentElement).removeChild(outer);
  return (w1 - w2);
}
function getScrollbarWidth() {
  if (cachedScrollbarWidth === void 0) {
    cachedScrollbarWidth = walkontableCalculateScrollbarWidth();
  }
  return cachedScrollbarWidth;
}
function setOverlayPosition(overlayElem, left, top) {
  if (isIE8() || isIE9()) {
    overlayElem.style.top = top;
    overlayElem.style.left = left;
  } else if (isSafari()) {
    overlayElem.style['-webkit-transform'] = 'translate3d(' + left + ',' + top + ',0)';
  } else {
    overlayElem.style.transform = 'translate3d(' + left + ',' + top + ',0)';
  }
}
function getCssTransform(element) {
  var transform;
  if (element.style.transform && (transform = element.style.transform) !== '') {
    return ['transform', transform];
  } else if (element.style['-webkit-transform'] && (transform = element.style['-webkit-transform']) !== '') {
    return ['-webkit-transform', transform];
  }
  return -1;
}
function resetCssTransform(element) {
  if (element.transform && element.transform !== '') {
    element.transform = '';
  } else if (element['-webkit-transform'] && element['-webkit-transform'] !== '') {
    element['-webkit-transform'] = '';
  }
}
function isInput(element) {
  var inputs = ['INPUT', 'SELECT', 'TEXTAREA'];
  return inputs.indexOf(element.nodeName) > -1 || element.contentEditable === 'true';
}
function isOutsideInput(element) {
  return isInput(element) && element.className.indexOf('handsontableInput') == -1 && element.className.indexOf('copyPaste') == -1;
}
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
var _requestAnimationFrame = window.requestAnimationFrame;
var _cancelAnimationFrame = window.cancelAnimationFrame;
for (var x = 0; x < vendors.length && !_requestAnimationFrame; ++x) {
  _requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  _cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!_requestAnimationFrame) {
  _requestAnimationFrame = function(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!_cancelAnimationFrame) {
  _cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}
function requestAnimationFrame(callback) {
  return _requestAnimationFrame.call(window, callback);
}
function cancelAnimationFrame(id) {
  _cancelAnimationFrame.call(window, id);
}

//# 
},{"../browser":34}],37:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  stopImmediatePropagation: {get: function() {
      return stopImmediatePropagation;
    }},
  isImmediatePropagationStopped: {get: function() {
      return isImmediatePropagationStopped;
    }},
  stopPropagation: {get: function() {
      return stopPropagation;
    }},
  pageX: {get: function() {
      return pageX;
    }},
  pageY: {get: function() {
      return pageY;
    }},
  __esModule: {value: true}
});
function stopImmediatePropagation(event) {
  event.isImmediatePropagationEnabled = false;
  event.cancelBubble = true;
}
function isImmediatePropagationStopped(event) {
  return event.isImmediatePropagationEnabled === false;
}
function stopPropagation(event) {
  if (typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}
function pageX(event) {
  if (event.pageX) {
    return event.pageX;
  }
  var scrollLeft = getWindowScrollLeft();
  var cursorX = event.clientX + scrollLeft;
  return cursorX;
}
function pageY(event) {
  if (event.pageY) {
    return event.pageY;
  }
  var scrollTop = getWindowScrollTop();
  var cursorY = event.clientY + scrollTop;
  return cursorY;
}

//# 
},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  proxy: {get: function() {
      return proxy;
    }},
  throttle: {get: function() {
      return throttle;
    }},
  throttleAfterHits: {get: function() {
      return throttleAfterHits;
    }},
  __esModule: {value: true}
});
function proxy(fun, context) {
  return function() {
    return fun.apply(context, arguments);
  };
}
function throttle(func) {
  var wait = arguments[1] !== (void 0) ? arguments[1] : 200;
  var lastCalled = 0;
  var result = {lastCallThrottled: true};
  var lastTimer = null;
  function _throttle() {
    var $__0 = this;
    var args = arguments;
    var stamp = Date.now();
    var needCall = false;
    result.lastCallThrottled = true;
    if (!lastCalled) {
      lastCalled = stamp;
      needCall = true;
    }
    var remaining = wait - (stamp - lastCalled);
    if (needCall) {
      result.lastCallThrottled = false;
      func.apply(this, args);
    } else {
      if (lastTimer) {
        clearTimeout(lastTimer);
      }
      lastTimer = setTimeout((function() {
        result.lastCallThrottled = false;
        func.apply($__0, args);
        lastCalled = 0;
        lastTimer = void 0;
      }), remaining);
    }
    return result;
  }
  return _throttle;
}
function throttleAfterHits(func) {
  var wait = arguments[1] !== (void 0) ? arguments[1] : 200;
  var hits = arguments[2] !== (void 0) ? arguments[2] : 10;
  var funcThrottle = throttle(func, wait);
  var remainHits = hits;
  function _clearHits() {
    remainHits = hits;
  }
  function _throttleAfterHits() {
    if (remainHits) {
      remainHits--;
      return func.apply(this, arguments);
    }
    return funcThrottle.apply(this, arguments);
  }
  _throttleAfterHits.clearHits = _clearHits;
  return _throttleAfterHits;
}

//# 
},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  stringify: {get: function() {
      return stringify;
    }},
  __esModule: {value: true}
});
function stringify(value) {
  switch (typeof value) {
    case 'string':
    case 'number':
      return value + '';
    case 'object':
      if (value === null) {
        return '';
      } else {
        return value.toString();
      }
      break;
    case 'undefined':
      return '';
    default:
      return value.toString();
  }
}

//# 
},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  isNumeric: {get: function() {
      return isNumeric;
    }},
  rangeEach: {get: function() {
      return rangeEach;
    }},
  valueAccordingPercent: {get: function() {
      return valueAccordingPercent;
    }},
  __esModule: {value: true}
});
function isNumeric(n) {
  var t = typeof n;
  return t == 'number' ? !isNaN(n) && isFinite(n) : t == 'string' ? !n.length ? false : n.length == 1 ? /\d/.test(n) : /^\s*[+-]?\s*(?:(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?)|(?:0x[a-f\d]+))\s*$/i.test(n) : t == 'object' ? !!n && typeof n.valueOf() == 'number' && !(n instanceof Date) : false;
}
function rangeEach(rangeFrom, rangeTo, iteratee, onlyForward) {
  var index = -1;
  var _rangeTo = rangeTo;
  var _rangeFrom = 0;
  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    _rangeTo = rangeFrom;
  } else {
    index = rangeFrom - 1;
  }
  if (onlyForward || rangeFrom <= _rangeTo) {
    while (++index <= _rangeTo) {
      if (iteratee(index) === false) {
        break;
      }
    }
  } else {
    index = rangeFrom + 1;
    while (--index >= rangeTo) {
      if (iteratee(index) === false) {
        break;
      }
    }
  }
}
function valueAccordingPercent(value, percent) {
  percent = parseInt(percent.toString().replace('%', ''), 10);
  percent = parseInt(value * percent / 100);
  return percent;
}

//# 
},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  duckSchema: {get: function() {
      return duckSchema;
    }},
  inherit: {get: function() {
      return inherit;
    }},
  extend: {get: function() {
      return extend;
    }},
  deepExtend: {get: function() {
      return deepExtend;
    }},
  deepClone: {get: function() {
      return deepClone;
    }},
  clone: {get: function() {
      return clone;
    }},
  mixin: {get: function() {
      return mixin;
    }},
  isObjectEquals: {get: function() {
      return isObjectEquals;
    }},
  isObject: {get: function() {
      return isObject;
    }},
  getPrototypeOf: {get: function() {
      return getPrototypeOf;
    }},
  defineGetter: {get: function() {
      return defineGetter;
    }},
  objectEach: {get: function() {
      return objectEach;
    }},
  __esModule: {value: true}
});
var $__array__;
var arrayEach = ($__array__ = require("array"), $__array__ && $__array__.__esModule && $__array__ || {default: $__array__}).arrayEach;
function duckSchema(object) {
  var schema;
  if (Array.isArray(object)) {
    schema = [];
  } else {
    schema = {};
    objectEach(object, function(value, key) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        schema[key] = duckSchema(value);
      } else if (Array.isArray(value)) {
        if (value.length && typeof value[0] === 'object' && !Array.isArray(value[0])) {
          schema[key] = [duckSchema(value[0])];
        } else {
          schema[key] = [];
        }
      } else {
        schema[key] = null;
      }
    });
  }
  return schema;
}
function inherit(Child, Parent) {
  Parent.prototype.constructor = Parent;
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  return Child;
}
function extend(target, extension) {
  objectEach(extension, function(value, key) {
    target[key] = value;
  });
  return target;
}
function deepExtend(target, extension) {
  objectEach(extension, function(value, key) {
    if (extension[key] && typeof extension[key] === 'object') {
      if (!target[key]) {
        if (Array.isArray(extension[key])) {
          target[key] = [];
        } else {
          target[key] = {};
        }
      }
      deepExtend(target[key], extension[key]);
    } else {
      target[key] = extension[key];
    }
  });
}
function deepClone(obj) {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}
function clone(object) {
  var result = {};
  objectEach(object, (function(value, key) {
    return result[key] = value;
  }));
  return result;
}
function mixin(Base) {
  for (var mixins = [],
      $__1 = 1; $__1 < arguments.length; $__1++)
    mixins[$__1 - 1] = arguments[$__1];
  arrayEach(mixins, (function(mixin) {
    objectEach(mixin, (function(value, key) {
      if (typeof value === 'function') {
        Base.prototype[key] = value;
      } else {
        var getter = function _getter(propertyName, initialValue) {
          propertyName = '_' + propertyName;
          var initValue = (function(value) {
            if (Array.isArray(value) || isObject(value)) {
              value = deepClone(value);
            }
            return value;
          });
          return function() {
            if (this[propertyName] === void 0) {
              this[propertyName] = initValue(initialValue);
            }
            return this[propertyName];
          };
        };
        var setter = function _setter(propertyName) {
          propertyName = '_' + propertyName;
          return function(value) {
            this[propertyName] = value;
          };
        };
        Object.defineProperty(Base.prototype, key, {
          get: getter(key, value),
          set: setter(key),
          configurable: true
        });
      }
    }));
  }));
  return Base;
}
function isObjectEquals(object1, object2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) == '[object Object]';
}
function getPrototypeOf(obj) {
  var prototype;
  if (typeof obj.__proto__ == 'object') {
    prototype = obj.__proto__;
  } else {
    var oldConstructor,
        constructor = obj.constructor;
    if (typeof obj.constructor == 'function') {
      oldConstructor = constructor;
      if (delete obj.constructor) {
        constructor = obj.constructor;
        obj.constructor = oldConstructor;
      }
    }
    prototype = constructor ? constructor.prototype : null;
  }
  return prototype;
}
function defineGetter(object, property, value, options) {
  options.value = value;
  options.writable = options.writable === false ? false : true;
  options.enumerable = options.enumerable === false ? false : true;
  options.configurable = options.configurable === false ? false : true;
  Object.defineProperty(object, property, options);
}
function objectEach(object, iteratee) {
  for (var key in object) {
    if (!object.hasOwnProperty || (object.hasOwnProperty && object.hasOwnProperty(key))) {
      if (iteratee(object[key], key, object) === false) {
        break;
      }
    }
  }
  return object;
}

//# 
},{"array":33}],42:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  columnFactory: {get: function() {
      return columnFactory;
    }},
  __esModule: {value: true}
});
var $__object__;
var inherit = ($__object__ = require("object"), $__object__ && $__object__.__esModule && $__object__ || {default: $__object__}).inherit;
function columnFactory(GridSettings, conflictList) {
  function ColumnSettings() {}
  ;
  inherit(ColumnSettings, GridSettings);
  for (var i = 0,
      len = conflictList.length; i < len; i++) {
    ColumnSettings.prototype[conflictList[i]] = void 0;
  }
  return ColumnSettings;
}

//# 
},{"object":41}],43:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  toUpperCaseFirst: {get: function() {
      return toUpperCaseFirst;
    }},
  startsWith: {get: function() {
      return startsWith;
    }},
  endsWith: {get: function() {
      return endsWith;
    }},
  equalsIgnoreCase: {get: function() {
      return equalsIgnoreCase;
    }},
  randomString: {get: function() {
      return randomString;
    }},
  isPercentValue: {get: function() {
      return isPercentValue;
    }},
  __esModule: {value: true}
});
var $__mixed__,
    $__number__;
var stringify = ($__mixed__ = require("mixed"), $__mixed__ && $__mixed__.__esModule && $__mixed__ || {default: $__mixed__}).stringify;
var rangeEach = ($__number__ = require("number"), $__number__ && $__number__.__esModule && $__number__ || {default: $__number__}).rangeEach;
function toUpperCaseFirst(string) {
  return string[0].toUpperCase() + string.substr(1);
}
function startsWith(string, needle) {
  var result = true;
  rangeEach(needle.length - 1, (function(index) {
    if (string.charAt(index) !== needle.charAt(index)) {
      result = false;
      return false;
    }
  }));
  return result;
}
function endsWith(string, needle) {
  var result = true;
  var needleLength = needle.length - 1;
  var stringLength = string.length - 1;
  rangeEach(needleLength, (function(index) {
    var stringIndex = stringLength - index;
    var needleIndex = needleLength - index;
    if (string.charAt(stringIndex) !== needle.charAt(needleIndex)) {
      result = false;
      return false;
    }
  }));
  return result;
}
function equalsIgnoreCase() {
  for (var strings = [],
      $__2 = 0; $__2 < arguments.length; $__2++)
    strings[$__2] = arguments[$__2];
  var unique = [];
  var length = strings.length;
  while (length--) {
    var string = stringify(strings[length]).toLowerCase();
    if (unique.indexOf(string) === -1) {
      unique.push(string);
    }
  }
  return unique.length === 1;
}
function randomString() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4();
}
function isPercentValue(value) {
  return /^([0-9][0-9]?\%$)|(^100\%$)/.test(value);
}

//# 
},{"mixed":39,"number":40}],44:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  KEY_CODES: {get: function() {
      return KEY_CODES;
    }},
  isPrintableChar: {get: function() {
      return isPrintableChar;
    }},
  isMetaKey: {get: function() {
      return isMetaKey;
    }},
  isCtrlKey: {get: function() {
      return isCtrlKey;
    }},
  isKey: {get: function() {
      return isKey;
    }},
  __esModule: {value: true}
});
var $__array__;
var arrayEach = ($__array__ = require("array"), $__array__ && $__array__.__esModule && $__array__ || {default: $__array__}).arrayEach;
var KEY_CODES = {
  MOUSE_LEFT: 1,
  MOUSE_RIGHT: 3,
  MOUSE_MIDDLE: 2,
  BACKSPACE: 8,
  COMMA: 188,
  INSERT: 45,
  DELETE: 46,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  CONTROL_LEFT: 91,
  COMMAND_LEFT: 17,
  COMMAND_RIGHT: 93,
  ALT: 18,
  HOME: 36,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  SPACE: 32,
  SHIFT: 16,
  CAPS_LOCK: 20,
  TAB: 9,
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  A: 65,
  X: 88,
  C: 67,
  V: 86
};
function isPrintableChar(keyCode) {
  return ((keyCode == 32) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222) || keyCode >= 226 || (keyCode >= 65 && keyCode <= 90));
}
function isMetaKey(keyCode) {
  var metaKeys = [KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.HOME, KEY_CODES.END, KEY_CODES.DELETE, KEY_CODES.BACKSPACE, KEY_CODES.F1, KEY_CODES.F2, KEY_CODES.F3, KEY_CODES.F4, KEY_CODES.F5, KEY_CODES.F6, KEY_CODES.F7, KEY_CODES.F8, KEY_CODES.F9, KEY_CODES.F10, KEY_CODES.F11, KEY_CODES.F12, KEY_CODES.TAB, KEY_CODES.PAGE_DOWN, KEY_CODES.PAGE_UP, KEY_CODES.ENTER, KEY_CODES.ESCAPE, KEY_CODES.SHIFT, KEY_CODES.CAPS_LOCK, KEY_CODES.ALT];
  return metaKeys.indexOf(keyCode) !== -1;
}
function isCtrlKey(keyCode) {
  return [KEY_CODES.CONTROL_LEFT, 224, KEY_CODES.COMMAND_LEFT, KEY_CODES.COMMAND_RIGHT].indexOf(keyCode) !== -1;
}
function isKey(keyCode, baseCode) {
  var keys = baseCode.split('|');
  var result = false;
  arrayEach(keys, function(key) {
    if (keyCode === KEY_CODES[key]) {
      result = true;
      return false;
    }
  });
  return result;
}

//# 
},{"array":33}],45:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  MultiMap: {get: function() {
      return MultiMap;
    }},
  __esModule: {value: true}
});
;
window.MultiMap = MultiMap;
function MultiMap() {
  var map = {
    arrayMap: [],
    weakMap: new WeakMap()
  };
  return {
    get: function(key) {
      if (canBeAnArrayMapKey(key)) {
        return map.arrayMap[key];
      } else if (canBeAWeakMapKey(key)) {
        return map.weakMap.get(key);
      }
    },
    set: function(key, value) {
      if (canBeAnArrayMapKey(key)) {
        map.arrayMap[key] = value;
      } else if (canBeAWeakMapKey(key)) {
        map.weakMap.set(key, value);
      } else {
        throw new Error('Invalid key type');
      }
    },
    delete: function(key) {
      if (canBeAnArrayMapKey(key)) {
        delete map.arrayMap[key];
      } else if (canBeAWeakMapKey(key)) {
        map.weakMap.delete(key);
      }
    }
  };
  function canBeAnArrayMapKey(obj) {
    return obj !== null && !isNaNSymbol(obj) && (typeof obj == 'string' || typeof obj == 'number');
  }
  function canBeAWeakMapKey(obj) {
    return obj !== null && (typeof obj == 'object' || typeof obj == 'function');
  }
  function isNaNSymbol(obj) {
    return obj !== obj;
  }
}

//# 
},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Hooks: {get: function() {
      return Hooks;
    }},
  localHooks: {get: function() {
      return localHooks;
    }},
  __esModule: {value: true}
});
var $__helpers_47_array__,
    $__helpers_47_object__;
var REGISTERED_HOOKS = ['afterCellMetaReset', 'afterChange', 'afterChangesObserved', 'afterColumnMove', 'afterColumnResize', 'afterContextMenuDefaultOptions', 'afterContextMenuHide', 'afterContextMenuShow', 'afterCopyLimit', 'afterCreateCol', 'afterCreateRow', 'afterDeselect', 'afterDestroy', 'afterDocumentKeyDown', 'afterGetCellMeta', 'afterGetColHeader', 'afterGetRowHeader', 'afterInit', 'afterIsMultipleSelectionCheck', 'afterLoadData', 'afterMomentumScroll', 'afterOnCellCornerMouseDown', 'afterOnCellMouseDown', 'afterOnCellMouseOver', 'afterRemoveCol', 'afterRemoveRow', 'afterRender', 'afterRenderer', 'afterScrollHorizontally', 'afterScrollVertically', 'afterSelection', 'afterSelectionByProp', 'afterSelectionEnd', 'afterSelectionEndByProp', 'afterSetCellMeta', 'afterUpdateSettings', 'afterValidate', 'beforeAutofill', 'beforeCellAlignment', 'beforeChange', 'beforeChangeRender', 'beforeDrawBorders', 'beforeGetCellMeta', 'beforeInit', 'beforeInitWalkontable', 'beforeKeyDown', 'beforeOnCellMouseDown', 'beforeRemoveCol', 'beforeRemoveRow', 'beforeRender', 'beforeSetRangeEnd', 'beforeTouchScroll', 'beforeValidate', 'construct', 'init', 'modifyCol', 'modifyColWidth', 'modifyRow', 'modifyRowHeight', 'persistentStateLoad', 'persistentStateReset', 'persistentStateSave', 'beforeColumnSort', 'afterColumnSort', 'afterAutofillApplyValues', 'modifyCopyableRange', 'beforeColumnMove', 'afterColumnMove', 'beforeRowMove', 'afterRowMove', 'beforeColumnResize', 'afterColumnResize', 'beforeRowResize', 'afterRowResize'];
var arrayEach = ($__helpers_47_array__ = require("helpers/array"), $__helpers_47_array__ && $__helpers_47_array__.__esModule && $__helpers_47_array__ || {default: $__helpers_47_array__}).arrayEach;
var objectEach = ($__helpers_47_object__ = require("helpers/object"), $__helpers_47_object__ && $__helpers_47_object__.__esModule && $__helpers_47_object__ || {default: $__helpers_47_object__}).objectEach;
var Hooks = function Hooks() {
  this.globalBucket = this.createEmptyBucket();
};
($traceurRuntime.createClass)(Hooks, {
  createEmptyBucket: function() {
    var bucket = Object.create(null);
    arrayEach(REGISTERED_HOOKS, (function(hook) {
      return (bucket[hook] = []);
    }));
    return bucket;
  },
  getBucket: function() {
    var context = arguments[0] !== (void 0) ? arguments[0] : null;
    if (context) {
      if (!context.pluginHookBucket) {
        context.pluginHookBucket = this.createEmptyBucket();
      }
      return context.pluginHookBucket;
    }
    return this.globalBucket;
  },
  add: function(key, callback) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var $__2 = this;
    if (Array.isArray(callback)) {
      arrayEach(callback, (function(c) {
        return ($__2.add(key, c, context));
      }));
    } else {
      var bucket = this.getBucket(context);
      if (typeof bucket[key] === 'undefined') {
        this.register(key);
        bucket[key] = [];
      }
      callback.skip = false;
      if (bucket[key].indexOf(callback) === -1) {
        bucket[key].push(callback);
      }
    }
    return this;
  },
  once: function(key, callback) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var $__2 = this;
    if (Array.isArray(callback)) {
      arrayEach(callback, (function(c) {
        return ($__2.once(key, c, context));
      }));
    } else {
      callback.runOnce = true;
      this.add(key, callback, context);
    }
  },
  remove: function(key, callback) {
    var context = arguments[2] !== (void 0) ? arguments[2] : null;
    var bucket = this.getBucket(context);
    if (typeof bucket[key] !== 'undefined') {
      if (bucket[key].indexOf(callback) >= 0) {
        callback.skip = true;
        return true;
      }
    }
    return false;
  },
  run: function(context, key, p1, p2, p3, p4, p5, p6) {
    {
      var globalHandlers = this.globalBucket[key];
      var index = -1;
      var length = globalHandlers ? globalHandlers.length : 0;
      if (length) {
        while (++index < length) {
          if (!globalHandlers[index] || globalHandlers[index].skip) {
            continue;
          }
          var res = globalHandlers[index].call(context, p1, p2, p3, p4, p5, p6);
          if (res !== void 0) {
            p1 = res;
          }
          if (globalHandlers[index] && globalHandlers[index].runOnce) {
            this.remove(key, globalHandlers[index]);
          }
        }
      }
    }
    {
      var localHandlers = this.getBucket(context)[key];
      var index$__5 = -1;
      var length$__6 = localHandlers ? localHandlers.length : 0;
      if (length$__6) {
        while (++index$__5 < length$__6) {
          if (!localHandlers[index$__5] || localHandlers[index$__5].skip) {
            continue;
          }
          var res$__7 = localHandlers[index$__5].call(context, p1, p2, p3, p4, p5, p6);
          if (res$__7 !== void 0) {
            p1 = res$__7;
          }
          if (localHandlers[index$__5] && localHandlers[index$__5].runOnce) {
            this.remove(key, localHandlers[index$__5], context);
          }
        }
      }
    }
    return p1;
  },
  destroy: function() {
    var context = arguments[0] !== (void 0) ? arguments[0] : null;
    objectEach(this.getBucket(context), (function(value, key, bucket) {
      return (bucket[key].length = 0);
    }));
  },
  register: function(key) {
    if (!this.isRegistered(key)) {
      REGISTERED_HOOKS.push(key);
    }
  },
  deregister: function(key) {
    if (this.isRegistered(key)) {
      REGISTERED_HOOKS.splice(REGISTERED_HOOKS.indexOf(key), 1);
    }
  },
  isRegistered: function(key) {
    return REGISTERED_HOOKS.indexOf(key) >= 0;
  },
  getRegistered: function() {
    return REGISTERED_HOOKS;
  }
}, {});
;
var localHooks = {
  _localHooks: Object.create(null),
  addLocalHook: function(key, callback) {
    if (!this._localHooks[key]) {
      this._localHooks[key] = [];
    }
    this._localHooks[key].push(callback);
  },
  runLocalHooks: function(key) {
    for (var params = [],
        $__4 = 1; $__4 < arguments.length; $__4++)
      params[$__4 - 1] = arguments[$__4];
    var $__2 = this;
    if (this._localHooks[key]) {
      arrayEach(this._localHooks[key], (function(callback) {
        return callback.apply($__2, params);
      }));
    }
  },
  clearLocalHooks: function() {
    this._localHooks = {};
  }
};
;
Handsontable.utils = Handsontable.utils || {};
Handsontable.utils.Hooks = Hooks;
Handsontable.utils.localHooks = localHooks;

//# 
},{"helpers/array":33,"helpers/object":41}],47:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  registerPlugin: {get: function() {
      return registerPlugin;
    }},
  getPlugin: {get: function() {
      return getPlugin;
    }},
  getRegistredPluginNames: {get: function() {
      return getRegistredPluginNames;
    }},
  getPluginName: {get: function() {
      return getPluginName;
    }},
  __esModule: {value: true}
});
var $__helpers_47_object__,
    $__helpers_47_string__;
var objectEach = ($__helpers_47_object__ = require("helpers/object"), $__helpers_47_object__ && $__helpers_47_object__.__esModule && $__helpers_47_object__ || {default: $__helpers_47_object__}).objectEach;
var toUpperCaseFirst = ($__helpers_47_string__ = require("helpers/string"), $__helpers_47_string__ && $__helpers_47_string__.__esModule && $__helpers_47_string__ || {default: $__helpers_47_string__}).toUpperCaseFirst;
var registeredPlugins = new WeakMap();
Handsontable.plugins = Handsontable.plugins || {};
function registerPlugin(pluginName, PluginClass) {
  pluginName = toUpperCaseFirst(pluginName);
  Handsontable.plugins[pluginName] = PluginClass;
  Handsontable.hooks.add('construct', function() {
    var holder;
    if (!registeredPlugins.has(this)) {
      registeredPlugins.set(this, {});
    }
    holder = registeredPlugins.get(this);
    if (!holder[pluginName]) {
      holder[pluginName] = new PluginClass(this);
    }
  });
  Handsontable.hooks.add('afterDestroy', function() {
    if (registeredPlugins.has(this)) {
      var pluginsHolder = registeredPlugins.get(this);
      objectEach(pluginsHolder, (function(plugin) {
        return plugin.destroy();
      }));
      registeredPlugins.delete(this);
    }
  });
}
function getPlugin(instance, pluginName) {
  if (typeof pluginName != 'string') {
    throw Error('Only strings can be passed as "plugin" parameter');
  }
  var _pluginName = toUpperCaseFirst(pluginName);
  if (!registeredPlugins.has(instance) || !registeredPlugins.get(instance)[_pluginName]) {
    return void 0;
  }
  return registeredPlugins.get(instance)[_pluginName];
}
function getRegistredPluginNames(hotInstance) {
  return registeredPlugins.has(hotInstance) ? Object.keys(registeredPlugins.get(hotInstance)) : [];
}
function getPluginName(hotInstance, plugin) {
  var pluginName = null;
  if (registeredPlugins.has(hotInstance)) {
    objectEach(registeredPlugins.get(hotInstance), (function(pluginInstance, name) {
      if (pluginInstance === plugin) {
        pluginName = name;
      }
    }));
  }
  return pluginName;
}
;

//# 
},{"helpers/object":41,"helpers/string":43}],48:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_object__,
    $___46__46__47_helpers_47_array__,
    $___46__46__47_plugins__;
var $__0 = ($___46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47_helpers_47_object__ && $___46__46__47_helpers_47_object__.__esModule && $___46__46__47_helpers_47_object__ || {default: $___46__46__47_helpers_47_object__}),
    defineGetter = $__0.defineGetter,
    objectEach = $__0.objectEach;
var arrayEach = ($___46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47_helpers_47_array__ && $___46__46__47_helpers_47_array__.__esModule && $___46__46__47_helpers_47_array__ || {default: $___46__46__47_helpers_47_array__}).arrayEach;
var $__2 = ($___46__46__47_plugins__ = require("plugins"), $___46__46__47_plugins__ && $___46__46__47_plugins__.__esModule && $___46__46__47_plugins__ || {default: $___46__46__47_plugins__}),
    getRegistredPluginNames = $__2.getRegistredPluginNames,
    getPluginName = $__2.getPluginName;
var privatePool = new WeakMap();
var initializedPlugins = null;
var BasePlugin = function BasePlugin(hotInstance) {
  var $__3 = this;
  defineGetter(this, 'hot', hotInstance, {writable: false});
  privatePool.set(this, {hooks: {}});
  initializedPlugins = null;
  this.pluginsInitializedCallbacks = [];
  this.isPluginsReady = false;
  this.pluginName = null;
  this.enabled = false;
  this.initialized = false;
  this.hot.addHook('afterPluginsInitialized', (function() {
    return $__3.onAfterPluginsInitialized();
  }));
  this.hot.addHook('afterUpdateSettings', (function() {
    return $__3.onUpdateSettings();
  }));
  this.hot.addHook('beforeInit', (function() {
    return $__3.init();
  }));
};
($traceurRuntime.createClass)(BasePlugin, {
  init: function() {
    this.pluginName = getPluginName(this.hot, this);
    if (this.isEnabled && this.isEnabled()) {
      this.enablePlugin();
    }
    if (!initializedPlugins) {
      initializedPlugins = getRegistredPluginNames(this.hot);
    }
    if (initializedPlugins.indexOf(this.pluginName) >= 0) {
      initializedPlugins.splice(initializedPlugins.indexOf(this.pluginName), 1);
    }
    if (!initializedPlugins.length) {
      this.hot.runHooks('afterPluginsInitialized');
    }
    this.initialized = true;
  },
  enablePlugin: function() {
    this.enabled = true;
  },
  disablePlugin: function() {
    if (this.eventManager) {
      this.eventManager.clear();
    }
    this.clearHooks();
    this.enabled = false;
  },
  addHook: function(name, callback) {
    var hooks = privatePool.get(this).hooks[name] = (privatePool.get(this).hooks[name] || []);
    this.hot.addHook(name, callback);
    hooks.push(callback);
    privatePool.get(this).hooks[name] = hooks;
  },
  removeHooks: function(name) {
    var $__3 = this;
    arrayEach(privatePool.get(this).hooks[name] || [], (function(callback) {
      $__3.hot.removeHook(name, callback);
    }));
  },
  clearHooks: function() {
    var $__3 = this;
    var hooks = privatePool.get(this).hooks;
    objectEach(hooks, (function(callbacks, name) {
      return $__3.removeHooks(name);
    }));
    hooks.length = 0;
  },
  callOnPluginsReady: function(callback) {
    if (this.isPluginsReady) {
      callback();
    } else {
      this.pluginsInitializedCallbacks.push(callback);
    }
  },
  onAfterPluginsInitialized: function() {
    arrayEach(this.pluginsInitializedCallbacks, (function(callback) {
      return callback();
    }));
    this.pluginsInitializedCallbacks.length = 0;
    this.isPluginsReady = true;
  },
  onUpdateSettings: function() {
    if (this.isEnabled) {
      if (this.enabled && !this.isEnabled()) {
        this.disablePlugin();
      }
      if (!this.enabled && this.isEnabled()) {
        this.enablePlugin();
      }
      if (this.enabled && this.isEnabled()) {
        if (this.updatePlugin) {
          this.updatePlugin();
        }
      }
    }
  },
  updatePlugin: function() {},
  destroy: function() {
    if (this.eventManager) {
      this.eventManager.destroy();
    }
    this.clearHooks();
    delete this.hot;
  }
}, {});
var $__default = BasePlugin;

//# 
},{"helpers/array":33,"helpers/object":41,"plugins":47}],49:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Autofill: {get: function() {
      return Autofill;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_plugins__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    offset = $__0.offset,
    outerHeight = $__0.outerHeight,
    outerWidth = $__0.outerWidth;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var WalkontableCellCoords = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
;
function getDeltas(start, end, data, direction) {
  var rlength = data.length,
      clength = data ? data[0].length : 0,
      deltas = [],
      arr = [],
      diffRow,
      diffCol,
      startValue,
      endValue,
      delta;
  diffRow = end.row - start.row;
  diffCol = end.col - start.col;
  if (['down', 'up'].indexOf(direction) !== -1) {
    for (var col = 0; col <= diffCol; col++) {
      startValue = parseInt(data[0][col], 10);
      endValue = parseInt(data[rlength - 1][col], 10);
      delta = (direction === 'down' ? (endValue - startValue) : (startValue - endValue)) / (rlength - 1) || 0;
      arr.push(delta);
    }
    deltas.push(arr);
  }
  if (['right', 'left'].indexOf(direction) !== -1) {
    for (var row = 0; row <= diffRow; row++) {
      startValue = parseInt(data[row][0], 10);
      endValue = parseInt(data[row][clength - 1], 10);
      delta = (direction === 'right' ? (endValue - startValue) : (startValue - endValue)) / (clength - 1) || 0;
      arr = [];
      arr.push(delta);
      deltas.push(arr);
    }
  }
  return deltas;
}
function filterRawData(data) {
  var destData = [],
      item,
      destItem;
  for (var row = 0,
      l = data.length; row < l; row++) {
    destData[row] = [];
    for (var col = 0,
        len = data[row].length; col < len; col++) {
      item = data[row][col];
      if (item[0] != '=' && !isNaN(parseInt($(item).text(), 10))) {
        destItem = parseInt($(item).text(), 10);
      } else {
        destItem = item;
      }
      destData[row].push(destItem);
    }
  }
  return destData;
}
function Autofill(instance) {
  var _this = this,
      mouseDownOnCellCorner = false,
      wtOnCellCornerMouseDown,
      wtOnCellMouseOver,
      eventManager;
  this.instance = instance;
  this.addingStarted = false;
  eventManager = eventManagerObject(instance);
  function mouseUpCallback(event) {
    if (!instance.autofill) {
      return true;
    }
    if (instance.autofill.handle && instance.autofill.handle.isDragged) {
      if (instance.autofill.handle.isDragged > 1) {
        instance.autofill.apply();
      }
      instance.autofill.handle.isDragged = 0;
      mouseDownOnCellCorner = false;
    }
  }
  function mouseMoveCallback(event) {
    var tableBottom,
        tableRight;
    if (!_this.instance.autofill) {
      return false;
    }
    tableBottom = offset(_this.instance.table).top - (window.pageYOffset || document.documentElement.scrollTop) + outerHeight(_this.instance.table);
    tableRight = offset(_this.instance.table).left - (window.pageXOffset || document.documentElement.scrollLeft) + outerWidth(_this.instance.table);
    if (_this.addingStarted === false && _this.instance.autofill.handle.isDragged > 0 && event.clientY > tableBottom && event.clientX <= tableRight) {
      _this.instance.mouseDragOutside = true;
      _this.addingStarted = true;
    } else {
      _this.instance.mouseDragOutside = false;
    }
    if (_this.instance.mouseDragOutside) {
      setTimeout(function() {
        _this.addingStarted = false;
        _this.instance.alter('insert_row');
      }, 200);
    }
  }
  eventManager.addEventListener(document, 'mouseup', mouseUpCallback);
  eventManager.addEventListener(document, 'mousemove', mouseMoveCallback);
  wtOnCellCornerMouseDown = this.instance.view.wt.wtSettings.settings.onCellCornerMouseDown;
  this.instance.view.wt.wtSettings.settings.onCellCornerMouseDown = function(event) {
    instance.autofill.handle.isDragged = 1;
    mouseDownOnCellCorner = true;
    wtOnCellCornerMouseDown(event);
  };
  wtOnCellMouseOver = this.instance.view.wt.wtSettings.settings.onCellMouseOver;
  this.instance.view.wt.wtSettings.settings.onCellMouseOver = function(event, coords, TD, wt) {
    if (instance.autofill && mouseDownOnCellCorner && !instance.view.isMouseDown() && instance.autofill.handle && instance.autofill.handle.isDragged) {
      instance.autofill.handle.isDragged++;
      instance.autofill.showBorder(coords);
      instance.autofill.checkIfNewRowNeeded();
    }
    wtOnCellMouseOver(event, coords, TD, wt);
  };
  this.instance.view.wt.wtSettings.settings.onCellCornerDblClick = function() {
    instance.autofill.selectAdjacent();
  };
}
Autofill.prototype.init = function() {
  this.handle = {};
};
Autofill.prototype.disable = function() {
  this.handle.disabled = true;
};
Autofill.prototype.selectAdjacent = function() {
  var select,
      data,
      r,
      maxR,
      c;
  if (this.instance.selection.isMultiple()) {
    select = this.instance.view.wt.selections.area.getCorners();
  } else {
    select = this.instance.view.wt.selections.current.getCorners();
  }
  data = this.instance.getData();
  rows: for (r = select[2] + 1; r < this.instance.countRows(); r++) {
    for (c = select[1]; c <= select[3]; c++) {
      if (data[r][c]) {
        break rows;
      }
    }
    if (!!data[r][select[1] - 1] || !!data[r][select[3] + 1]) {
      maxR = r;
    }
  }
  if (maxR) {
    this.instance.view.wt.selections.fill.clear();
    this.instance.view.wt.selections.fill.add(new WalkontableCellCoords(select[0], select[1]));
    this.instance.view.wt.selections.fill.add(new WalkontableCellCoords(maxR, select[3]));
    this.apply();
  }
};
Autofill.prototype.apply = function() {
  var drag,
      select,
      start,
      end,
      _data,
      direction,
      deltas,
      selRange;
  this.handle.isDragged = 0;
  if (this.instance.view.wt.selections.fill.isEmpty()) {
    return;
  }
  drag = this.instance.view.wt.selections.fill.getCorners();
  this.instance.view.wt.selections.fill.clear();
  if (this.instance.selection.isMultiple()) {
    select = this.instance.view.wt.selections.area.getCorners();
  } else {
    select = this.instance.view.wt.selections.current.getCorners();
  }
  Handsontable.hooks.run(this.instance, 'afterAutofillApplyValues', select, drag);
  if (drag[0] === select[0] && drag[1] < select[1]) {
    direction = 'left';
    start = new WalkontableCellCoords(drag[0], drag[1]);
    end = new WalkontableCellCoords(drag[2], select[1] - 1);
  } else if (drag[0] === select[0] && drag[3] > select[3]) {
    direction = 'right';
    start = new WalkontableCellCoords(drag[0], select[3] + 1);
    end = new WalkontableCellCoords(drag[2], drag[3]);
  } else if (drag[0] < select[0] && drag[1] === select[1]) {
    direction = 'up';
    start = new WalkontableCellCoords(drag[0], drag[1]);
    end = new WalkontableCellCoords(select[0] - 1, drag[3]);
  } else if (drag[2] > select[2] && drag[1] === select[1]) {
    direction = 'down';
    start = new WalkontableCellCoords(select[2] + 1, drag[1]);
    end = new WalkontableCellCoords(drag[2], drag[3]);
  }
  if (start && start.row > -1 && start.col > -1) {
    selRange = {
      from: this.instance.getSelectedRange().from,
      to: this.instance.getSelectedRange().to
    };
    _data = this.instance.getData(selRange.from.row, selRange.from.col, selRange.to.row, selRange.to.col);
    _data = filterRawData(_data);
    deltas = getDeltas(start, end, _data, direction);
    Handsontable.hooks.run(this.instance, 'beforeAutofill', start, end, _data);
    this.instance.populateFromArray(start.row, start.col, _data, end.row, end.col, 'autofill', null, direction, deltas);
    this.instance.selection.setRangeStart(new WalkontableCellCoords(drag[0], drag[1]));
    this.instance.selection.setRangeEnd(new WalkontableCellCoords(drag[2], drag[3]));
  } else {
    this.instance.selection.refreshBorders();
  }
};
Autofill.prototype.showBorder = function(coords) {
  var topLeft = this.instance.getSelectedRange().getTopLeftCorner(),
      bottomRight = this.instance.getSelectedRange().getBottomRightCorner();
  if (this.instance.getSettings().fillHandle !== 'horizontal' && (bottomRight.row < coords.row || topLeft.row > coords.row)) {
    coords = new WalkontableCellCoords(coords.row, bottomRight.col);
  } else if (this.instance.getSettings().fillHandle !== 'vertical') {
    coords = new WalkontableCellCoords(bottomRight.row, coords.col);
  } else {
    return;
  }
  this.instance.view.wt.selections.fill.clear();
  this.instance.view.wt.selections.fill.add(this.instance.getSelectedRange().from);
  this.instance.view.wt.selections.fill.add(this.instance.getSelectedRange().to);
  this.instance.view.wt.selections.fill.add(coords);
  this.instance.view.render();
};
Autofill.prototype.checkIfNewRowNeeded = function() {
  var fillCorners,
      selection,
      tableRows = this.instance.countRows(),
      that = this;
  if (this.instance.view.wt.selections.fill.cellRange && this.addingStarted === false) {
    selection = this.instance.getSelected();
    fillCorners = this.instance.view.wt.selections.fill.getCorners();
    if (selection[2] < tableRows - 1 && fillCorners[2] === tableRows - 1) {
      this.addingStarted = true;
      this.instance._registerTimeout(setTimeout(function() {
        that.instance.alter('insert_row');
        that.addingStarted = false;
      }, 200));
    }
  }
};
Handsontable.hooks.add('afterInit', function() {
  var autofill = new Autofill(this);
  if (typeof this.getSettings().fillHandle !== 'undefined') {
    if (autofill.handle && this.getSettings().fillHandle === false) {
      autofill.disable();
    } else if (!autofill.handle && this.getSettings().fillHandle !== false) {
      this.autofill = autofill;
      this.autofill.init();
    }
  }
});
Handsontable.Autofill = Autofill;

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"eventManager":32,"helpers/dom/element":36,"plugins":47}],50:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  CommandExecutor: {get: function() {
      return CommandExecutor;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_array__;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var CommandExecutor = function CommandExecutor(hotInstance) {
  this.hot = hotInstance;
  this.commands = {};
  this.commonCallback = null;
};
($traceurRuntime.createClass)(CommandExecutor, {
  registerCommand: function(name, commandDescriptor) {
    this.commands[name] = commandDescriptor;
  },
  setCommonCallback: function(callback) {
    this.commonCallback = callback;
  },
  execute: function(commandName) {
    for (var params = [],
        $__3 = 1; $__3 < arguments.length; $__3++)
      params[$__3 - 1] = arguments[$__3];
    var $__1 = this;
    var commandSplit = commandName.split(':');
    commandName = commandSplit[0];
    var subCommandName = commandSplit.length === 2 ? commandSplit[1] : null;
    var command = this.commands[commandName];
    if (!command) {
      throw new Error(("Menu command '" + commandName + "' not exists."));
    }
    if (subCommandName && command.submenu) {
      command = findSubCommand(subCommandName, command.submenu.items);
    }
    if (command.disabled === true) {
      return;
    }
    if (typeof command.disabled == 'function' && command.disabled.call(this.hot) === true) {
      return;
    }
    if (command.hasOwnProperty('submenu')) {
      return;
    }
    var callbacks = [];
    if (typeof command.callback === 'function') {
      callbacks.push(command.callback);
    }
    if (typeof this.commonCallback === 'function') {
      callbacks.push(this.commonCallback);
    }
    params.unshift(commandSplit.join(':'));
    arrayEach(callbacks, (function(callback) {
      return callback.apply($__1.hot, params);
    }));
  }
}, {});
function findSubCommand(subCommandName, subCommands) {
  var command;
  arrayEach(subCommands, (function(cmd) {
    var cmds = cmd.key ? cmd.key.split(':') : null;
    if (Array.isArray(cmds) && cmds[1] === subCommandName) {
      command = cmd;
      return false;
    }
  }));
  return command;
}
;

//# 
},{"helpers/array":33}],51:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ContextMenu: {get: function() {
      return ContextMenu;
    }},
  __esModule: {value: true}
});
var $___46__46__47__95_base__,
    $___46__46__47__46__46__47_helpers_47_array__,
    $__commandExecutor__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $__itemsFactory__,
    $__menu__,
    $___46__46__47__46__46__47_helpers_47_object__,
    $___46__46__47__46__46__47_plugins__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $__predefinedItems__;
var BasePlugin = ($___46__46__47__95_base__ = require("_base"), $___46__46__47__95_base__ && $___46__46__47__95_base__.__esModule && $___46__46__47__95_base__ || {default: $___46__46__47__95_base__}).default;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var CommandExecutor = ($__commandExecutor__ = require("commandExecutor"), $__commandExecutor__ && $__commandExecutor__.__esModule && $__commandExecutor__ || {default: $__commandExecutor__}).CommandExecutor;
var EventManager = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).EventManager;
var hasClass = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}).hasClass;
var ItemsFactory = ($__itemsFactory__ = require("itemsFactory"), $__itemsFactory__ && $__itemsFactory__.__esModule && $__itemsFactory__ || {default: $__itemsFactory__}).ItemsFactory;
var Menu = ($__menu__ = require("menu"), $__menu__ && $__menu__.__esModule && $__menu__ || {default: $__menu__}).Menu;
var $__7 = ($___46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47_helpers_47_object__}),
    objectEach = $__7.objectEach,
    mixin = $__7.mixin;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var stopPropagation = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}).stopPropagation;
var $__10 = ($__predefinedItems__ = require("predefinedItems"), $__predefinedItems__ && $__predefinedItems__.__esModule && $__predefinedItems__ || {default: $__predefinedItems__}),
    ROW_ABOVE = $__10.ROW_ABOVE,
    ROW_BELOW = $__10.ROW_BELOW,
    COLUMN_LEFT = $__10.COLUMN_LEFT,
    COLUMN_RIGHT = $__10.COLUMN_RIGHT,
    REMOVE_ROW = $__10.REMOVE_ROW,
    REMOVE_COLUMN = $__10.REMOVE_COLUMN,
    UNDO = $__10.UNDO,
    REDO = $__10.REDO,
    READ_ONLY = $__10.READ_ONLY,
    ALIGNMENT = $__10.ALIGNMENT,
    SEPARATOR = $__10.SEPARATOR,
    predefinedItems = $__10.predefinedItems;
var ContextMenu = function ContextMenu(hotInstance) {
  $traceurRuntime.superConstructor($ContextMenu).call(this, hotInstance);
  this.eventManager = new EventManager(this);
  this.commandExecutor = new CommandExecutor(this.hot);
  this.itemsFactory = null;
  this.menu = null;
};
var $ContextMenu = ContextMenu;
($traceurRuntime.createClass)(ContextMenu, {
  isEnabled: function() {
    return this.hot.getSettings().contextMenu;
  },
  enablePlugin: function() {
    var $__11 = this;
    if (this.enabled) {
      return;
    }
    this.itemsFactory = new ItemsFactory(this.hot, $ContextMenu.DEFAULT_ITEMS);
    var settings = this.hot.getSettings().contextMenu;
    var predefinedItems = {items: this.itemsFactory.getVisibleItems(settings)};
    this.registerEvents();
    if (typeof settings.callback === 'function') {
      this.commandExecutor.setCommonCallback(settings.callback);
    }
    $traceurRuntime.superGet(this, $ContextMenu.prototype, "enablePlugin").call(this);
    this.callOnPluginsReady((function() {
      $__11.hot.runHooks('afterContextMenuDefaultOptions', predefinedItems);
      $__11.itemsFactory.setPredefinedItems(predefinedItems.items);
      var menuItems = $__11.itemsFactory.getVisibleItems(settings);
      $__11.menu = new Menu($__11.hot, {className: 'htContextMenu'});
      $__11.menu.setMenuItems(menuItems);
      $__11.menu.addLocalHook('afterOpen', (function() {
        return $__11.hot.runHooks('afterContextMenuShow', $__11);
      }));
      $__11.menu.addLocalHook('afterClose', (function() {
        return $__11.hot.runHooks('afterContextMenuHide', $__11);
      }));
      $__11.menu.addLocalHook('executeCommand', (function() {
        for (var params = [],
            $__13 = 0; $__13 < arguments.length; $__13++)
          params[$__13] = arguments[$__13];
        return $__11.executeCommand.apply($__11, params);
      }));
      arrayEach(menuItems, (function(command) {
        return $__11.commandExecutor.registerCommand(command.key, command);
      }));
    }));
  },
  disablePlugin: function() {
    this.close();
    if (this.menu) {
      this.menu.destroy();
      this.menu = null;
    }
    $traceurRuntime.superGet(this, $ContextMenu.prototype, "disablePlugin").call(this);
  },
  registerEvents: function() {
    var $__11 = this;
    this.eventManager.addEventListener(this.hot.rootElement, 'contextmenu', (function(event) {
      return $__11.onContextMenu(event);
    }));
  },
  open: function(event) {
    if (!this.menu) {
      return;
    }
    this.menu.open();
    this.menu.setPosition(event);
    this.menu.hotMenu.isHotTableEnv = this.hot.isHotTableEnv;
    Handsontable.eventManager.isHotTableEnv = this.hot.isHotTableEnv;
  },
  close: function() {
    if (!this.menu) {
      return;
    }
    this.menu.close();
  },
  executeCommand: function() {
    for (var params = [],
        $__13 = 0; $__13 < arguments.length; $__13++)
      params[$__13] = arguments[$__13];
    this.commandExecutor.execute.apply(this.commandExecutor, params);
  },
  destroy: function() {
    this.close();
    if (this.menu) {
      this.menu.destroy();
    }
    $traceurRuntime.superGet(this, $ContextMenu.prototype, "destroy").call(this);
  },
  onContextMenu: function(event) {
    var settings = this.hot.getSettings();
    var showRowHeaders = settings.rowHeaders;
    var showColHeaders = settings.colHeaders;
    function isValidElement(element) {
      return element.nodeName === 'TD' || element.parentNode.nodeName === 'TD';
    }
    var element = event.realTarget;
    this.close();
    event.preventDefault();
    stopPropagation(event);
    if (!(showRowHeaders || showColHeaders)) {
      if (!isValidElement(element) && !(hasClass(element, 'current') && hasClass(element, 'wtBorder'))) {
        return;
      }
    } else if (showRowHeaders && showColHeaders) {
      var containsCornerHeader = element.parentNode.querySelectorAll('.cornerHeader').length > 0;
      if (containsCornerHeader) {
        return;
      }
    }
    this.open(event);
  }
}, {get DEFAULT_ITEMS() {
    return [ROW_ABOVE, ROW_BELOW, SEPARATOR, COLUMN_LEFT, COLUMN_RIGHT, SEPARATOR, REMOVE_ROW, REMOVE_COLUMN, SEPARATOR, UNDO, REDO, SEPARATOR, READ_ONLY, SEPARATOR, ALIGNMENT];
  }}, BasePlugin);
ContextMenu.SEPARATOR = {name: SEPARATOR};
Handsontable.hooks.register('afterContextMenuDefaultOptions');
Handsontable.hooks.register('afterContextMenuShow');
Handsontable.hooks.register('afterContextMenuHide');
Handsontable.hooks.register('afterContextMenuExecute');
;
registerPlugin('contextMenu', ContextMenu);

//# 
},{"_base":48,"commandExecutor":50,"eventManager":32,"helpers/array":33,"helpers/dom/element":36,"helpers/dom/event":37,"helpers/object":41,"itemsFactory":53,"menu":54,"plugins":47,"predefinedItems":55}],52:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Cursor: {get: function() {
      return Cursor;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getWindowScrollLeft = $__0.getWindowScrollLeft,
    getWindowScrollTop = $__0.getWindowScrollTop;
var $__1 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    pageX = $__1.pageX,
    pageY = $__1.pageY;
var Cursor = function Cursor(object) {
  var windowScrollTop = getWindowScrollTop();
  var windowScrollLeft = getWindowScrollLeft();
  var top,
      topRelative;
  var left,
      leftRelative;
  var scrollTop,
      scrollLeft;
  var cellHeight,
      cellWidth;
  this.type = this.getSourceType(object);
  if (this.type === 'literal') {
    top = parseInt(object.top, 10);
    left = parseInt(object.left, 10);
    cellHeight = object.height;
    cellWidth = object.width;
  } else if (this.type === 'event') {
    top = parseInt(pageY(object), 10);
    left = parseInt(pageX(object), 10);
    cellHeight = object.target.clientHeight;
    cellWidth = object.target.clientWidth;
  }
  topRelative = top - windowScrollTop;
  leftRelative = left - windowScrollLeft;
  scrollTop = windowScrollTop;
  scrollLeft = windowScrollLeft;
  this.top = top;
  this.topRelative = topRelative;
  this.left = left;
  this.leftRelative = leftRelative;
  this.scrollTop = scrollTop;
  this.scrollLeft = scrollLeft;
  this.cellHeight = cellHeight;
  this.cellWidth = cellWidth;
};
($traceurRuntime.createClass)(Cursor, {
  getSourceType: function(object) {
    var type = 'literal';
    if (object instanceof Event) {
      type = 'event';
    }
    return type;
  },
  fitsAbove: function(element) {
    return this.topRelative >= element.offsetHeight;
  },
  fitsBelow: function(element) {
    var viewportHeight = arguments[1] !== (void 0) ? arguments[1] : window.innerHeight;
    return this.topRelative + element.offsetHeight <= viewportHeight;
  },
  fitsOnRight: function(element) {
    var viewportWidth = arguments[1] !== (void 0) ? arguments[1] : window.innerWidth;
    return this.leftRelative + this.cellWidth + element.offsetWidth <= viewportWidth;
  },
  fitsOnLeft: function(element) {
    return this.leftRelative >= element.offsetWidth;
  }
}, {});
;
Handsontable.plugins.utils = Handsontable.plugins.utils || {};
Handsontable.plugins.utils.Cursor = Cursor;

//# 
},{"helpers/dom/element":36,"helpers/dom/event":37}],53:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ItemsFactory: {get: function() {
      return ItemsFactory;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_object__,
    $___46__46__47__46__46__47_helpers_47_array__,
    $__predefinedItems__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47_helpers_47_object__}),
    objectEach = $__0.objectEach,
    isObject = $__0.isObject,
    extend = $__0.extend;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var $__2 = ($__predefinedItems__ = require("predefinedItems"), $__predefinedItems__ && $__predefinedItems__.__esModule && $__predefinedItems__ || {default: $__predefinedItems__}),
    SEPARATOR = $__2.SEPARATOR,
    ITEMS = $__2.ITEMS,
    predefinedItems = $__2.predefinedItems;
var ItemsFactory = function ItemsFactory(hotInstance) {
  var orderPattern = arguments[1] !== (void 0) ? arguments[1] : null;
  this.hot = hotInstance;
  this.predefinedItems = predefinedItems();
  this.defaultOrderPattern = orderPattern;
};
($traceurRuntime.createClass)(ItemsFactory, {
  setPredefinedItems: function(predefinedItems) {
    var $__3 = this;
    var items = {};
    this.defaultOrderPattern.length = 0;
    objectEach(predefinedItems, (function(value, key) {
      var menuItemKey = '';
      if (value.name === SEPARATOR) {
        items[SEPARATOR] = value;
        menuItemKey = SEPARATOR;
      } else if (isNaN(parseInt(key, 10))) {
        value.key = value.key === void 0 ? key : value.key;
        items[key] = value;
        menuItemKey = value.key;
      } else {
        items[value.key] = value;
        menuItemKey = value.key;
      }
      $__3.defaultOrderPattern.push(menuItemKey);
    }));
    this.predefinedItems = items;
  },
  getVisibleItems: function() {
    var pattern = arguments[0] !== (void 0) ? arguments[0] : null;
    var $__3 = this;
    var visibleItems = {};
    objectEach(this.predefinedItems, (function(value, key) {
      if (!value.hidden || value.hidden && !value.hidden.apply($__3.hot)) {
        visibleItems[key] = value;
      }
    }));
    return getItems(pattern, this.defaultOrderPattern, visibleItems);
  },
  getItems: function() {
    var pattern = arguments[0] !== (void 0) ? arguments[0] : null;
    return getItems(pattern, this.defaultOrderPattern, this.predefinedItems);
  }
}, {});
function getItems() {
  var pattern = arguments[0] !== (void 0) ? arguments[0] : null;
  var defaultPattern = arguments[1] !== (void 0) ? arguments[1] : [];
  var items = arguments[2] !== (void 0) ? arguments[2] : {};
  var result = [];
  if (pattern && pattern.items) {
    pattern = pattern.items;
  } else if (!Array.isArray(pattern)) {
    pattern = defaultPattern;
  }
  if (isObject(pattern)) {
    objectEach(pattern, (function(value, key) {
      var item = items[typeof value === 'string' ? value : key];
      if (!item) {
        item = value;
      }
      if (isObject(value)) {
        extend(item, value);
      } else if (typeof item === 'string') {
        item = {name: item};
      }
      if (item.key === void 0) {
        item.key = key;
      }
      result.push(item);
    }));
  } else {
    arrayEach(pattern, (function(name, key) {
      var item = items[name];
      if (!item && ITEMS.indexOf(name) >= 0) {
        return;
      }
      if (!item) {
        item = {
          name: name,
          key: key + ''
        };
      }
      if (isObject(name)) {
        extend(item, name);
      }
      if (item.key === void 0) {
        item.key = key;
      }
      result.push(item);
    }));
  }
  if (result[0].name === SEPARATOR) {
    result.shift();
  }
  return result;
}
;

//# 
},{"helpers/array":33,"helpers/object":41,"predefinedItems":55}],54:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Menu: {get: function() {
      return Menu;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_helpers_47_array__,
    $__cursor__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_object__,
    $__utils__,
    $___46__46__47__46__46__47_helpers_47_unicode__,
    $___46__46__47__46__46__47_pluginHooks__,
    $__predefinedItems__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    empty = $__0.empty,
    fastInnerHTML = $__0.fastInnerHTML,
    getComputedStyle = $__0.getComputedStyle,
    getScrollbarWidth = $__0.getScrollbarWidth,
    getWindowScrollLeft = $__0.getWindowScrollLeft,
    getWindowScrollTop = $__0.getWindowScrollTop,
    hasClass = $__0.hasClass,
    isChildOf = $__0.isChildOf,
    removeClass = $__0.removeClass;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var Cursor = ($__cursor__ = require("cursor"), $__cursor__ && $__cursor__.__esModule && $__cursor__ || {default: $__cursor__}).Cursor;
var EventManager = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).EventManager;
var $__4 = ($___46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47_helpers_47_object__}),
    extend = $__4.extend,
    isObject = $__4.isObject,
    objectEach = $__4.objectEach,
    mixin = $__4.mixin;
var $__5 = ($__utils__ = require("utils"), $__utils__ && $__utils__.__esModule && $__utils__ || {default: $__utils__}),
    isSeparator = $__5.isSeparator,
    isDisabled = $__5.isDisabled,
    isSelectionDisabled = $__5.isSelectionDisabled,
    hasSubMenu = $__5.hasSubMenu,
    normalizeSelection = $__5.normalizeSelection;
var KEY_CODES = ($___46__46__47__46__46__47_helpers_47_unicode__ = require("helpers/unicode"), $___46__46__47__46__46__47_helpers_47_unicode__ && $___46__46__47__46__46__47_helpers_47_unicode__.__esModule && $___46__46__47__46__46__47_helpers_47_unicode__ || {default: $___46__46__47__46__46__47_helpers_47_unicode__}).KEY_CODES;
var localHooks = ($___46__46__47__46__46__47_pluginHooks__ = require("pluginHooks"), $___46__46__47__46__46__47_pluginHooks__ && $___46__46__47__46__46__47_pluginHooks__.__esModule && $___46__46__47__46__46__47_pluginHooks__ || {default: $___46__46__47__46__46__47_pluginHooks__}).localHooks;
var $__8 = ($__predefinedItems__ = require("predefinedItems"), $__predefinedItems__ && $__predefinedItems__.__esModule && $__predefinedItems__ || {default: $__predefinedItems__}),
    SEPARATOR = $__8.SEPARATOR,
    predefinedItems = $__8.predefinedItems;
var $__9 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    stopPropagation = $__9.stopPropagation,
    stopImmediatePropagation = $__9.stopImmediatePropagation,
    pageX = $__9.pageX,
    pageY = $__9.pageY;
var Menu = function Menu(hotInstance) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {
    parent: null,
    name: null,
    className: '',
    keepInViewport: true
  };
  this.hot = hotInstance;
  this.options = options;
  this.eventManager = new EventManager(this);
  this.container = this.createContainer(this.options.name);
  this.hotMenu = null;
  this.hotSubMenus = {};
  this.parentMenu = this.options.parent || null;
  this.menuItems = null;
  this.origOutsideClickDeselects = null;
  this._afterScrollCallback = null;
  this.registerEvents();
};
var $Menu = Menu;
($traceurRuntime.createClass)(Menu, {
  registerEvents: function() {
    var $__10 = this;
    this.eventManager.addEventListener(document.documentElement, 'mousedown', (function(event) {
      return $__10.onDocumentMouseDown(event);
    }));
  },
  setMenuItems: function(menuItems) {
    this.menuItems = menuItems;
  },
  isSubMenu: function() {
    return this.parentMenu !== null;
  },
  open: function() {
    var $__10 = this;
    this.container.removeAttribute('style');
    this.container.style.display = 'block';
    var settings = {
      data: this.menuItems,
      colHeaders: false,
      colWidths: [200],
      autoRowSize: false,
      readOnly: true,
      copyPaste: false,
      columns: [{
        data: 'name',
        renderer: (function(hot, TD, row, col, prop, value) {
          return $__10.menuItemRenderer(hot, TD, row, col, prop, value);
        })
      }],
      renderAllRows: true,
      beforeKeyDown: (function(event) {
        return $__10.onBeforeKeyDown(event);
      }),
      afterOnCellMouseOver: (function(event, coords, TD) {
        return $__10.openSubMenu(coords.row);
      })
    };
    this.origOutsideClickDeselects = this.hot.getSettings().outsideClickDeselects;
    this.hot.getSettings().outsideClickDeselects = false;
    this.hotMenu = new Handsontable.Core(this.container, settings);
    this.hotMenu.addHook('afterInit', (function() {
      return $__10.onAfterInit();
    }));
    this.hotMenu.init();
    this.hotMenu.listen();
    this.blockMainTableCallbacks();
    this.runLocalHooks('afterOpen');
  },
  close: function() {
    var closeParent = arguments[0] !== (void 0) ? arguments[0] : false;
    if (!this.isOpened()) {
      return;
    }
    if (closeParent && this.parentMenu) {
      this.parentMenu.close();
    } else {
      this.closeAllSubMenus();
      this.container.style.display = 'none';
      this.releaseMainTableCallbacks();
      this.hotMenu.destroy();
      this.hotMenu = null;
      this.hot.getSettings().outsideClickDeselects = this.origOutsideClickDeselects;
      this.hot.listen();
      this.runLocalHooks('afterClose');
    }
  },
  openSubMenu: function(row) {
    var cell = this.hotMenu.getCell(row, 0);
    this.closeAllSubMenus();
    if (!cell || !hasSubMenu(cell)) {
      return false;
    }
    var dataItem = this.hotMenu.getData()[row];
    var subMenu = new $Menu(this.hot, {
      parent: this,
      name: dataItem.name,
      className: this.options.className
    });
    subMenu.setMenuItems(dataItem.submenu.items);
    subMenu.open();
    subMenu.setPosition(cell.getBoundingClientRect());
    this.hotSubMenus[dataItem.key] = subMenu;
    return subMenu;
  },
  closeSubMenu: function(row) {
    var dataItem = this.hotMenu.getData()[row];
    var menus = this.hotSubMenus[dataItem.key];
    if (menus) {
      menus.destroy();
      delete this.hotSubMenus[dataItem.key];
    }
  },
  closeAllSubMenus: function() {
    var $__10 = this;
    arrayEach(this.hotMenu.getData(), (function(value, row) {
      return $__10.closeSubMenu(row);
    }));
  },
  isAllSubMenusClosed: function() {
    return Object.keys(this.hotSubMenus).length === 0;
  },
  destroy: function() {
    this.clearLocalHooks();
    this.close();
    this.parentMenu = null;
    this.eventManager.destroy();
  },
  isOpened: function() {
    return this.hotMenu !== null;
  },
  executeCommand: function() {
    var event = arguments[0];
    if (!this.isOpened() || !this.hotMenu.getSelected()) {
      return;
    }
    var selectedItem = this.hotMenu.getData()[this.hotMenu.getSelected()[0]];
    this.runLocalHooks('select', selectedItem, event);
    if (selectedItem.isCommand === false) {
      return;
    }
    var selRange = this.hot.getSelectedRange();
    var normalizedSelection = selRange ? normalizeSelection(selRange) : {};
    this.runLocalHooks('executeCommand', selectedItem.key, normalizedSelection, event);
    if (this.isSubMenu()) {
      this.parentMenu.runLocalHooks('executeCommand', selectedItem.key, normalizedSelection, event);
    }
    this.close(true);
  },
  setPosition: function(coords) {
    var cursor = new Cursor(coords);
    if (this.options.keepInViewport) {
      if (cursor.fitsBelow(this.container)) {
        this.setPositionBelowCursor(cursor);
      } else if (cursor.fitsAbove(this.container)) {
        this.setPositionAboveCursor(cursor);
      } else {
        this.setPositionBelowCursor(cursor);
      }
      if (cursor.fitsOnRight(this.container)) {
        this.setPositionOnRightOfCursor(cursor);
      } else {
        this.setPositionOnLeftOfCursor(cursor);
      }
    } else {
      this.setPositionBelowCursor(cursor);
      this.setPositionOnRightOfCursor(cursor);
    }
  },
  setPositionAboveCursor: function(cursor) {
    var top = cursor.top - this.container.offsetHeight;
    if (this.isSubMenu()) {
      top = window.scrollY + cursor.top + cursor.cellHeight - this.container.offsetHeight + 3;
    }
    this.container.style.top = top + 'px';
  },
  setPositionBelowCursor: function(cursor) {
    var top = cursor.top - 1;
    if (this.isSubMenu()) {
      top = cursor.top + window.scrollY - 1;
    }
    this.container.style.top = top + 'px';
  },
  setPositionOnRightOfCursor: function(cursor) {
    var left;
    if (this.isSubMenu()) {
      left = window.scrollX + 1 + cursor.left + cursor.cellWidth;
    } else {
      left = 1 + cursor.left;
    }
    this.container.style.left = left + 'px';
  },
  setPositionOnLeftOfCursor: function(cursor) {
    this.container.style.left = (cursor.left - this.container.offsetWidth + getScrollbarWidth() + 4) + 'px';
  },
  selectFirstCell: function() {
    var cell = this.hotMenu.getCell(0, 0);
    if (isSeparator(cell) || isDisabled(cell) || isSelectionDisabled(cell)) {
      this.selectNextCell(0, 0);
    } else {
      this.hotMenu.selectCell(0, 0);
    }
  },
  selectLastCell: function() {
    var lastRow = this.hotMenu.countRows() - 1;
    var cell = this.hotMenu.getCell(lastRow, 0);
    if (isSeparator(cell) || isDisabled(cell) || isSelectionDisabled(cell)) {
      this.selectPrevCell(lastRow, 0);
    } else {
      this.hotMenu.selectCell(lastRow, 0);
    }
  },
  selectNextCell: function(row, col) {
    var nextRow = row + 1;
    var cell = nextRow < this.hotMenu.countRows() ? this.hotMenu.getCell(nextRow, col) : null;
    if (!cell) {
      return;
    }
    if (isSeparator(cell) || isDisabled(cell) || isSelectionDisabled(cell)) {
      this.selectNextCell(nextRow, col);
    } else {
      this.hotMenu.selectCell(nextRow, col);
    }
  },
  selectPrevCell: function(row, col) {
    var prevRow = row - 1;
    var cell = prevRow >= 0 ? this.hotMenu.getCell(prevRow, col) : null;
    if (!cell) {
      return;
    }
    if (isSeparator(cell) || isDisabled(cell) || isSelectionDisabled(cell)) {
      this.selectPrevCell(prevRow, col);
    } else {
      this.hotMenu.selectCell(prevRow, col);
    }
  },
  menuItemRenderer: function(hot, TD, row, col, prop, value) {
    var $__10 = this;
    var item = hot.getData()[row];
    var wrapper = document.createElement('div');
    var isSubMenu = (function(item) {
      return item.hasOwnProperty('submenu');
    });
    var itemIsSeparator = (function(item) {
      return new RegExp(SEPARATOR, 'i').test(item.name);
    });
    var itemIsDisabled = (function(item) {
      return item.disabled === true || (typeof item.disabled == 'function' && item.disabled.call($__10.hot) === true);
    });
    var itemIsSelectionDisabled = (function(item) {
      return item.disableSelection;
    });
    if (typeof value === 'function') {
      value = value.call(this.hot);
    }
    empty(TD);
    addClass(wrapper, 'htItemWrapper');
    TD.appendChild(wrapper);
    if (itemIsSeparator(item)) {
      addClass(TD, 'htSeparator');
    } else if (typeof item.renderer === 'function') {
      addClass(TD, 'htCustomMenuRenderer');
      TD.appendChild(item.renderer(hot, wrapper, row, col, prop, value));
    } else {
      fastInnerHTML(wrapper, value);
    }
    if (itemIsDisabled(item)) {
      addClass(TD, 'htDisabled');
      this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
        return hot.deselectCell();
      }));
    } else if (itemIsSelectionDisabled(item)) {
      addClass(TD, 'htSelectionDisabled');
      this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
        return hot.deselectCell();
      }));
    } else if (isSubMenu(item)) {
      addClass(TD, 'htSubmenu');
      if (itemIsSelectionDisabled(item)) {
        this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
          return hot.deselectCell();
        }));
      } else {
        this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
          return hot.selectCell(row, col);
        }));
      }
    } else {
      removeClass(TD, 'htSubmenu');
      removeClass(TD, 'htDisabled');
      if (itemIsSelectionDisabled(item)) {
        this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
          return hot.deselectCell();
        }));
      } else {
        this.eventManager.addEventListener(wrapper, 'mouseenter', (function() {
          return hot.selectCell(row, col);
        }));
      }
    }
  },
  createContainer: function() {
    var name = arguments[0] !== (void 0) ? arguments[0] : null;
    if (name) {
      name = name.replace(/ /g, '_');
      name = this.options.className + 'Sub_' + name;
    }
    var container;
    if (name) {
      container = document.querySelector('.' + this.options.className + '.' + name);
    } else {
      container = document.querySelector('.' + this.options.className);
    }
    if (!container) {
      container = document.createElement('div');
      addClass(container, 'htMenu ' + this.options.className);
      if (name) {
        addClass(container, name);
      }
      document.getElementsByTagName('body')[0].appendChild(container);
    }
    return container;
  },
  blockMainTableCallbacks: function() {
    this._afterScrollCallback = function() {};
    this.hot.addHook('afterScrollVertically', this._afterScrollCallback);
    this.hot.addHook('afterScrollHorizontally', this._afterScrollCallback);
  },
  releaseMainTableCallbacks: function() {
    if (this._afterScrollCallback) {
      this.hot.removeHook('afterScrollVertically', this._afterScrollCallback);
      this.hot.removeHook('afterScrollHorizontally', this._afterScrollCallback);
      this._afterScrollCallback = null;
    }
  },
  onBeforeKeyDown: function(event) {
    var selection = this.hotMenu.getSelected();
    var stopEvent = false;
    switch (event.keyCode) {
      case KEY_CODES.ESCAPE:
        this.close();
        stopEvent = true;
        break;
      case KEY_CODES.ENTER:
        if (selection) {
          if (this.hotMenu.getData()[selection[0]].submenu) {
            stopEvent = true;
          } else {
            this.executeCommand(event);
            this.close(true);
          }
        }
        break;
      case KEY_CODES.ARROW_DOWN:
        if (selection) {
          this.selectNextCell(selection[0], selection[1]);
        } else {
          this.selectFirstCell();
        }
        stopEvent = true;
        break;
      case KEY_CODES.ARROW_UP:
        if (selection) {
          this.selectPrevCell(selection[0], selection[1]);
        } else {
          this.selectLastCell();
        }
        stopEvent = true;
        break;
      case KEY_CODES.ARROW_RIGHT:
        if (selection) {
          var menu = this.openSubMenu(selection[0]);
          if (menu) {
            menu.selectFirstCell();
          }
        }
        stopEvent = true;
        break;
      case KEY_CODES.ARROW_LEFT:
        if (selection && this.isSubMenu()) {
          this.close();
          if (this.parentMenu) {
            this.parentMenu.hotMenu.listen();
          }
          stopEvent = true;
        }
        break;
    }
    if (stopEvent) {
      event.preventDefault();
      stopImmediatePropagation(event);
    }
  },
  onAfterInit: function() {
    var data = this.hotMenu.getSettings().data;
    var hiderStyle = this.hotMenu.view.wt.wtTable.hider.style;
    var holderStyle = this.hotMenu.view.wt.wtTable.holder.style;
    var currentHiderWidth = parseInt(hiderStyle.width, 10);
    var realHeight = 0;
    arrayEach(data, (function(value) {
      return realHeight += value.name === SEPARATOR ? 1 : 26;
    }));
    holderStyle.width = currentHiderWidth + 22 + 'px';
    holderStyle.height = realHeight + 4 + 'px';
  },
  onDocumentMouseDown: function(event) {
    if (!this.isOpened()) {
      return;
    }
    if (this.container && isChildOf(event.target, this.container)) {
      this.executeCommand(event);
    }
    if ((this.isAllSubMenusClosed() || this.isSubMenu()) && (!isChildOf(event.target, '.htMenu') && isChildOf(event.target, document))) {
      this.close(true);
    }
  }
}, {});
mixin(Menu, localHooks);
;

//# 
},{"cursor":52,"eventManager":32,"helpers/array":33,"helpers/dom/element":36,"helpers/dom/event":37,"helpers/object":41,"helpers/unicode":44,"pluginHooks":46,"predefinedItems":55,"utils":56}],55:[function(require,module,exports){
"use strict";
var $__4;
Object.defineProperties(exports, {
  ROW_ABOVE: {get: function() {
      return ROW_ABOVE;
    }},
  ROW_BELOW: {get: function() {
      return ROW_BELOW;
    }},
  COLUMN_LEFT: {get: function() {
      return COLUMN_LEFT;
    }},
  COLUMN_RIGHT: {get: function() {
      return COLUMN_RIGHT;
    }},
  CLEAR_COLUMN: {get: function() {
      return CLEAR_COLUMN;
    }},
  REMOVE_ROW: {get: function() {
      return REMOVE_ROW;
    }},
  REMOVE_COLUMN: {get: function() {
      return REMOVE_COLUMN;
    }},
  UNDO: {get: function() {
      return UNDO;
    }},
  REDO: {get: function() {
      return REDO;
    }},
  READ_ONLY: {get: function() {
      return READ_ONLY;
    }},
  ALIGNMENT: {get: function() {
      return ALIGNMENT;
    }},
  SEPARATOR: {get: function() {
      return SEPARATOR;
    }},
  ITEMS: {get: function() {
      return ITEMS;
    }},
  predefinedItems: {get: function() {
      return predefinedItems;
    }},
  addItem: {get: function() {
      return addItem;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_object__,
    $___46__46__47__46__46__47_helpers_47_number__,
    $__utils__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_object__ = require("helpers/object"), $___46__46__47__46__46__47_helpers_47_object__ && $___46__46__47__46__46__47_helpers_47_object__.__esModule && $___46__46__47__46__46__47_helpers_47_object__ || {default: $___46__46__47__46__46__47_helpers_47_object__}),
    objectEach = $__0.objectEach,
    clone = $__0.clone;
var rangeEach = ($___46__46__47__46__46__47_helpers_47_number__ = require("helpers/number"), $___46__46__47__46__46__47_helpers_47_number__ && $___46__46__47__46__46__47_helpers_47_number__.__esModule && $___46__46__47__46__46__47_helpers_47_number__ || {default: $___46__46__47__46__46__47_helpers_47_number__}).rangeEach;
var $__2 = ($__utils__ = require("utils"), $__utils__ && $__utils__.__esModule && $__utils__ || {default: $__utils__}),
    align = $__2.align,
    getAlignmentClasses = $__2.getAlignmentClasses,
    getValidSelection = $__2.getValidSelection,
    checkSelectionConsistency = $__2.checkSelectionConsistency,
    markLabelAsSelected = $__2.markLabelAsSelected;
var ROW_ABOVE = 'row_above';
var ROW_BELOW = 'row_below';
var COLUMN_LEFT = 'col_left';
var COLUMN_RIGHT = 'col_right';
var CLEAR_COLUMN = 'clear_column';
var REMOVE_ROW = 'remove_row';
var REMOVE_COLUMN = 'remove_col';
var UNDO = 'undo';
var REDO = 'redo';
var READ_ONLY = 'make_read_only';
var ALIGNMENT = 'alignment';
var SEPARATOR = '---------';
var ITEMS = [ROW_ABOVE, ROW_BELOW, COLUMN_LEFT, COLUMN_RIGHT, CLEAR_COLUMN, REMOVE_ROW, REMOVE_COLUMN, UNDO, REDO, READ_ONLY, ALIGNMENT, SEPARATOR];
function predefinedItems() {
  var items = {};
  objectEach(_predefinedItems, (function(value, key) {
    return items[key] = clone(value);
  }));
  return items;
}
function addItem(key, item) {
  if (ITEMS.indexOf(key) === -1) {
    _predefinedItems[key] = item;
  }
}
var _predefinedItems = ($__4 = {}, Object.defineProperty($__4, SEPARATOR, {
  value: {name: SEPARATOR},
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, ROW_ABOVE, {
  value: {
    key: ROW_ABOVE,
    name: 'Insert row above',
    callback: function(key, selection) {
      this.runHooks('menuBeforeInsertRow', selection.start.row);
      this.alter('insert_row', selection.start.row);
      this.runHooks('menuRowChange');
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      var rowCount = this.countRows();
      var entireColumnSelection = [0, selected[1], rowCount - 1, selected[1]];
      return (entireColumnSelection.join(',') === selected.join(',')) && rowCount > 1;
    },
    hidden: function() {
      return !this.getSettings().allowInsertRow;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, ROW_BELOW, {
  value: {
    key: ROW_BELOW,
    name: 'Insert row below',
    callback: function(key, selection) {
      this.runHooks('menuBeforeInsertRow', selection.end.row + 1);
      this.alter('insert_row', selection.end.row + 1);
      this.runHooks('menuRowChange');
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      var rowCount = this.countRows();
      var entireColumnSelection = [0, selected[1], rowCount - 1, selected[1]];
      return (entireColumnSelection.join(',') === selected.join(',')) && rowCount > 1;
    },
    hidden: function() {
      return !this.getSettings().allowInsertRow;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, COLUMN_LEFT, {
  value: {
    key: COLUMN_LEFT,
    name: 'Insert column on the left',
    callback: function(key, selection) {
      this.runHooks('menuBeforeInsertCol', selection.start.col);
      this.alter('insert_col', selection.start.col);
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (!this.isColumnModificationAllowed()) {
        return true;
      }
      var entireRowSelection = [selected[0], 0, selected[0], this.countCols() - 1];
      var rowSelected = entireRowSelection.join(',') == selected.join(',');
      return selected[1] < 0 || this.countCols() >= this.getSettings().maxCols || rowSelected;
    },
    hidden: function() {
      return !this.getSettings().allowInsertColumn;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, COLUMN_RIGHT, {
  value: {
    key: COLUMN_RIGHT,
    name: 'Insert column on the right',
    callback: function(key, selection) {
      this.runHooks('menuBeforeInsertCol', selection.end.col + 1);
      this.alter('insert_col', selection.end.col + 1);
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (!this.isColumnModificationAllowed()) {
        return true;
      }
      var entireRowSelection = [selected[0], 0, selected[0], this.countCols() - 1];
      var rowSelected = entireRowSelection.join(',') == selected.join(',');
      return selected[1] < 0 || this.countCols() >= this.getSettings().maxCols || rowSelected;
    },
    hidden: function() {
      return !this.getSettings().allowInsertColumn;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, CLEAR_COLUMN, {
  value: {
    key: CLEAR_COLUMN,
    name: 'Clear column',
    callback: function(key, selection) {
      var column = selection.start.col;
      this.populateFromArray(0, column, [[null]], Math.max(selection.start.row, selection.end.row), column);
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      var entireRowSelection = [selected[0], 0, selected[0], this.countCols() - 1];
      var rowSelected = entireRowSelection.join(',') == selected.join(',');
      return selected[1] < 0 || this.countCols() >= this.getSettings().maxCols || rowSelected;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, REMOVE_ROW, {
  value: {
    key: REMOVE_ROW,
    name: 'Remove row',
    callback: function(key, selection) {
      var amount = selection.end.row - selection.start.row + 1;
      this.runHooks('menuBeforeRemoveRow', selection.start.row, amount);
      this.alter('remove_row', selection.start.row, amount);
      this.runHooks('menuRowChange');
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      var entireColumnSelection = [0, selected[1], this.countRows() - 1, selected[1]];
      return entireColumnSelection.join(',') === selected.join(',');
    },
    hidden: function() {
      return !this.getSettings().allowRemoveRow;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, REMOVE_COLUMN, {
  value: {
    key: REMOVE_COLUMN,
    name: 'Remove column',
    callback: function(key, selection) {
      var amount = selection.end.col - selection.start.col + 1;
      this.runHooks('menuBeforeRemoveCol', selection.start.col, amount);
      this.alter('remove_col', selection.start.col, amount);
    },
    disabled: function() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (!this.isColumnModificationAllowed()) {
        return true;
      }
      var entireRowSelection = [selected[0], 0, selected[0], this.countCols() - 1];
      var rowSelected = entireRowSelection.join(',') == selected.join(',');
      return (selected[1] < 0 || rowSelected);
    },
    hidden: function() {
      return !this.getSettings().allowRemoveColumn;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, UNDO, {
  value: {
    key: UNDO,
    name: 'Undo',
    callback: function() {
      this.undo();
    },
    disabled: function() {
      return this.undoRedo && !this.undoRedo.isUndoAvailable();
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, REDO, {
  value: {
    key: REDO,
    name: 'Redo',
    callback: function() {
      this.redo();
    },
    disabled: function() {
      return this.undoRedo && !this.undoRedo.isRedoAvailable();
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, READ_ONLY, {
  value: {
    key: READ_ONLY,
    name: function() {
      var $__3 = this;
      var label = 'Read only';
      var atLeastOneReadOnly = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
        return $__3.getCellMeta(row, col).readOnly;
      }));
      if (atLeastOneReadOnly) {
        label = markLabelAsSelected(label);
      }
      return label;
    },
    callback: function() {
      var $__3 = this;
      var range = this.getSelectedRange();
      var atLeastOneReadOnly = checkSelectionConsistency(range, (function(row, col) {
        return $__3.getCellMeta(row, col).readOnly;
      }));
      range.forAll((function(row, col) {
        $__3.getCellMeta(row, col).readOnly = atLeastOneReadOnly ? false : true;
      }));
      this.render();
    },
    disabled: function() {
      return this.getSelectedRange() ? false : true;
    }
  },
  configurable: true,
  enumerable: true,
  writable: true
}), Object.defineProperty($__4, ALIGNMENT, {
  value: {
    key: ALIGNMENT,
    name: 'Alignment',
    disabled: function() {
      return this.getSelectedRange() ? false : true;
    },
    submenu: {items: [{
        key: (ALIGNMENT + ":left"),
        name: function() {
          var $__3 = this;
          var label = 'Left';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htLeft') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'horizontal';
          var alignment = 'htLeft';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {
        key: (ALIGNMENT + ":center"),
        name: function() {
          var $__3 = this;
          var label = 'Center';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htCenter') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'horizontal';
          var alignment = 'htCenter';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {
        key: (ALIGNMENT + ":right"),
        name: function() {
          var $__3 = this;
          var label = 'Right';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htRight') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'horizontal';
          var alignment = 'htRight';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {
        key: (ALIGNMENT + ":justify"),
        name: function() {
          var $__3 = this;
          var label = 'Justify';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htJustify') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'horizontal';
          var alignment = 'htJustify';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {name: SEPARATOR}, {
        key: (ALIGNMENT + ":top"),
        name: function() {
          var $__3 = this;
          var label = 'Top';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htTop') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'vertical';
          var alignment = 'htTop';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {
        key: (ALIGNMENT + ":middle"),
        name: function() {
          var $__3 = this;
          var label = 'Middle';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htMiddle') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'vertical';
          var alignment = 'htMiddle';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }, {
        key: (ALIGNMENT + ":bottom"),
        name: function() {
          var $__3 = this;
          var label = 'Bottom';
          var hasClass = checkSelectionConsistency(this.getSelectedRange(), (function(row, col) {
            var className = $__3.getCellMeta(row, col).className;
            if (className && className.indexOf('htBottom') !== -1) {
              return true;
            }
          }));
          if (hasClass) {
            label = markLabelAsSelected(label);
          }
          return label;
        },
        callback: function() {
          var $__3 = this;
          var range = this.getSelectedRange();
          var stateBefore = getAlignmentClasses(range, (function(row, col) {
            return $__3.getCellMeta(row, col).className;
          }));
          var type = 'vertical';
          var alignment = 'htBottom';
          this.runHooks('beforeCellAlignment', stateBefore, range, type, alignment);
          align(range, type, alignment, (function(row, col) {
            return $__3.getCellMeta(row, col);
          }));
          this.render();
        },
        disabled: false
      }]}
  },
  configurable: true,
  enumerable: true,
  writable: true
}), $__4);

//# 
},{"helpers/number":40,"helpers/object":41,"utils":56}],56:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  normalizeSelection: {get: function() {
      return normalizeSelection;
    }},
  isSeparator: {get: function() {
      return isSeparator;
    }},
  hasSubMenu: {get: function() {
      return hasSubMenu;
    }},
  isDisabled: {get: function() {
      return isDisabled;
    }},
  isSelectionDisabled: {get: function() {
      return isSelectionDisabled;
    }},
  getValidSelection: {get: function() {
      return getValidSelection;
    }},
  prepareVerticalAlignClass: {get: function() {
      return prepareVerticalAlignClass;
    }},
  prepareHorizontalAlignClass: {get: function() {
      return prepareHorizontalAlignClass;
    }},
  getAlignmentClasses: {get: function() {
      return getAlignmentClasses;
    }},
  align: {get: function() {
      return align;
    }},
  checkSelectionConsistency: {get: function() {
      return checkSelectionConsistency;
    }},
  markLabelAsSelected: {get: function() {
      return markLabelAsSelected;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__;
var hasClass = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}).hasClass;
function normalizeSelection(selRange) {
  return {
    start: selRange.getTopLeftCorner(),
    end: selRange.getBottomRightCorner()
  };
}
function isSeparator(cell) {
  return hasClass(cell, 'htSeparator');
}
function hasSubMenu(cell) {
  return hasClass(cell, 'htSubmenu');
}
function isDisabled(cell) {
  return hasClass(cell, 'htDisabled');
}
function isSelectionDisabled(cell) {
  return hasClass(cell, 'htSelectionDisabled');
}
function getValidSelection(hot) {
  var selected = hot.getSelected();
  if (!selected) {
    return null;
  }
  if (selected[0] < 0) {
    return null;
  }
  if (hot.countRows() >= hot.getSettings().maxRows) {
    return null;
  }
  return selected;
}
function prepareVerticalAlignClass(className, alignment) {
  if (className.indexOf(alignment) != -1) {
    return className;
  }
  className = className.replace('htTop', '').replace('htMiddle', '').replace('htBottom', '').replace('  ', '');
  className += ' ' + alignment;
  return className;
}
function prepareHorizontalAlignClass(className, alignment) {
  if (className.indexOf(alignment) != -1) {
    return className;
  }
  className = className.replace('htLeft', '').replace('htCenter', '').replace('htRight', '').replace('htJustify', '').replace('  ', '');
  className += ' ' + alignment;
  return className;
}
function getAlignmentClasses(range, callback) {
  var classes = {};
  for (var row = range.from.row; row <= range.to.row; row++) {
    for (var col = range.from.col; col <= range.to.col; col++) {
      if (!classes[row]) {
        classes[row] = [];
      }
      classes[row][col] = callback(row, col);
    }
  }
  return classes;
}
function align(range, type, alignment, cellDescriptor) {
  if (range.from.row == range.to.row && range.from.col == range.to.col) {
    applyAlignClassName(range.from.row, range.from.col, type, alignment, cellDescriptor);
  } else {
    for (var row = range.from.row; row <= range.to.row; row++) {
      for (var col = range.from.col; col <= range.to.col; col++) {
        applyAlignClassName(row, col, type, alignment, cellDescriptor);
      }
    }
  }
}
function applyAlignClassName(row, col, type, alignment, cellDescriptor) {
  var cellMeta = cellDescriptor(row, col);
  var className = alignment;
  if (cellMeta.className) {
    if (type === 'vertical') {
      className = prepareVerticalAlignClass(cellMeta.className, alignment);
    } else {
      className = prepareHorizontalAlignClass(cellMeta.className, alignment);
    }
  }
  cellMeta.className = className;
}
function checkSelectionConsistency(range, comparator) {
  var result = false;
  if (range) {
    range.forAll(function(row, col) {
      if (comparator(row, col)) {
        result = true;
        return false;
      }
    });
  }
  return result;
}
function markLabelAsSelected(label) {
  return '<span class="selected">' + String.fromCharCode(10003) + '</span>' + label;
}

//# 
},{"helpers/dom/element":36}],57:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ContextMenuCopyPaste: {get: function() {
      return ContextMenuCopyPaste;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_helpers_47_array__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_plugins__,
    $___46__46__47__95_base__,
    $__zeroclipboard__;
var removeClass = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}).removeClass;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var EventManager = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).EventManager;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var BasePlugin = ($___46__46__47__95_base__ = require("_base"), $___46__46__47__95_base__ && $___46__46__47__95_base__.__esModule && $___46__46__47__95_base__ || {default: $___46__46__47__95_base__}).default;
var ZeroClipboard = ($__zeroclipboard__ = require("zeroclipboard"), $__zeroclipboard__ && $__zeroclipboard__.__esModule && $__zeroclipboard__ || {default: $__zeroclipboard__}).default;
var ContextMenuCopyPaste = function ContextMenuCopyPaste(hotInstance) {
  $traceurRuntime.superConstructor($ContextMenuCopyPaste).call(this, hotInstance);
  this.eventManager = new EventManager(this);
  this.swfPath = null;
  this.outsideClickDeselectsCache = null;
};
var $ContextMenuCopyPaste = ContextMenuCopyPaste;
($traceurRuntime.createClass)(ContextMenuCopyPaste, {
  isEnabled: function() {
    return this.hot.getSettings().contextMenuCopyPaste;
  },
  enablePlugin: function() {
    var $__6 = this;
    if (this.enabled) {
      return;
    }
    if (typeof this.hot.getSettings().contextMenuCopyPaste === 'object') {
      this.swfPath = this.hot.getSettings().contextMenuCopyPaste.swfPath;
    }
    if (typeof ZeroClipboard === 'undefined') {
      console.error('To be able to use the Copy/Paste feature from the context menu, you need to manually include ZeroClipboard.js file to your website.');
    }
    try {
      new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    } catch (exception) {
      if (typeof navigator.mimeTypes['application/x-shockwave-flash'] == 'undefined') {
        console.error('To be able to use the Copy/Paste feature from the context menu, your browser needs to have Flash Plugin installed.');
      }
    }
    if (this.swfPath) {
      ZeroClipboard.config({swfPath: this.swfPath});
    }
    this.hot.addHook('afterContextMenuShow', (function() {
      return $__6.onAfterContextMenuShow();
    }));
    this.hot.addHook('afterContextMenuDefaultOptions', (function(options) {
      return $__6.onAfterContextMenuDefaultOptions(options);
    }));
    this.registerEvents();
    $traceurRuntime.superGet(this, $ContextMenuCopyPaste.prototype, "enablePlugin").call(this);
  },
  disablePlugin: function() {
    $traceurRuntime.superGet(this, $ContextMenuCopyPaste.prototype, "disablePlugin").call(this);
  },
  registerEvents: function() {
    var $__6 = this;
    this.eventManager.addEventListener(document, 'mouseenter', (function() {
      return $__6.removeCurrentClass();
    }));
    this.eventManager.addEventListener(document, 'mouseleave', (function() {
      return $__6.removeZeroClipboardClass();
    }));
  },
  getCopyValue: function() {
    this.hot.copyPaste.setCopyableText();
    return this.hot.copyPaste.copyPasteInstance.elTextarea.value;
  },
  onAfterContextMenuDefaultOptions: function(defaultOptions) {
    defaultOptions.items.unshift({
      key: 'copy',
      name: 'Copy'
    }, {
      key: 'paste',
      name: 'Paste',
      callback: function() {
        this.copyPaste.triggerPaste();
      }
    }, Handsontable.plugins.ContextMenu.SEPARATOR);
  },
  onAfterContextMenuShow: function() {
    var $__6 = this;
    var contextMenu = this.hot.getPlugin('contextMenu');
    var data = contextMenu.menu.hotMenu.getData();
    arrayEach(data, (function(item, index) {
      if (item.key === 'copy') {
        var zeroClipboardInstance = new ZeroClipboard(contextMenu.menu.hotMenu.getCell(index, 0));
        zeroClipboardInstance.off();
        zeroClipboardInstance.on('copy', (function(event) {
          var clipboard = event.clipboardData;
          clipboard.setData('text/plain', $__6.getCopyValue());
          $__6.hot.getSettings().outsideClickDeselects = $__6.outsideClickDeselectsCache;
        }));
        return false;
      }
    }));
  },
  removeCurrentClass: function() {
    var contextMenu = this.hot.getPlugin('contextMenu');
    if (contextMenu.menu.isOpened()) {
      var element = contextMenu.menu.hotMenu.rootElement.querySelector('td.current');
      if (element) {
        removeClass(element, 'current');
      }
    }
    this.outsideClickDeselectsCache = this.hot.getSettings().outsideClickDeselects;
    this.hot.getSettings().outsideClickDeselects = false;
  },
  removeZeroClipboardClass: function() {
    var contextMenu = this.hot.getPlugin('contextMenu');
    if (contextMenu.menu.isOpened()) {
      var element = contextMenu.menu.hotMenu.rootElement.querySelector('td.zeroclipboard-is-hover');
      if (element) {
        removeClass(element, 'zeroclipboard-is-hover');
      }
    }
    this.hot.getSettings().outsideClickDeselects = this.outsideClickDeselectsCache;
  }
}, {}, BasePlugin);
;
registerPlugin('contextMenuCopyPaste', ContextMenuCopyPaste);

//# 
},{"_base":48,"eventManager":32,"helpers/array":33,"helpers/dom/element":36,"plugins":47,"zeroclipboard":undefined}],58:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  CopyPastePlugin: {get: function() {
      return CopyPastePlugin;
    }},
  __esModule: {value: true}
});
var $__copyPaste__,
    $__SheetClip__,
    $___46__46__47__46__46__47_helpers_47_unicode__,
    $___46__46__47__46__46__47_helpers_47_array__,
    $___46__46__47__46__46__47_helpers_47_number__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_helpers_47_function__,
    $___46__46__47__46__46__47_plugins__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__;
var copyPaste = ($__copyPaste__ = require("copyPaste"), $__copyPaste__ && $__copyPaste__.__esModule && $__copyPaste__ || {default: $__copyPaste__}).default;
var SheetClip = ($__SheetClip__ = require("SheetClip"), $__SheetClip__ && $__SheetClip__.__esModule && $__SheetClip__ || {default: $__SheetClip__}).default;
var $__2 = ($___46__46__47__46__46__47_helpers_47_unicode__ = require("helpers/unicode"), $___46__46__47__46__46__47_helpers_47_unicode__ && $___46__46__47__46__46__47_helpers_47_unicode__.__esModule && $___46__46__47__46__46__47_helpers_47_unicode__ || {default: $___46__46__47__46__46__47_helpers_47_unicode__}),
    KEY_CODES = $__2.KEY_CODES,
    isCtrlKey = $__2.isCtrlKey;
var arrayEach = ($___46__46__47__46__46__47_helpers_47_array__ = require("helpers/array"), $___46__46__47__46__46__47_helpers_47_array__ && $___46__46__47__46__46__47_helpers_47_array__.__esModule && $___46__46__47__46__46__47_helpers_47_array__ || {default: $___46__46__47__46__46__47_helpers_47_array__}).arrayEach;
var rangeEach = ($___46__46__47__46__46__47_helpers_47_number__ = require("helpers/number"), $___46__46__47__46__46__47_helpers_47_number__ && $___46__46__47__46__46__47_helpers_47_number__.__esModule && $___46__46__47__46__46__47_helpers_47_number__ || {default: $___46__46__47__46__46__47_helpers_47_number__}).rangeEach;
var stopImmediatePropagation = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}).stopImmediatePropagation;
var proxy = ($___46__46__47__46__46__47_helpers_47_function__ = require("helpers/function"), $___46__46__47__46__46__47_helpers_47_function__ && $___46__46__47__46__46__47_helpers_47_function__.__esModule && $___46__46__47__46__46__47_helpers_47_function__ || {default: $___46__46__47__46__46__47_helpers_47_function__}).proxy;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var WalkontableCellCoords = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ = require("3rdparty/walkontable/src/cell/range"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__}).WalkontableCellRange;
function CopyPastePlugin(instance) {
  var _this = this;
  this.copyPasteInstance = copyPaste();
  this.copyPasteInstance.onCut(onCut);
  this.copyPasteInstance.onPaste(onPaste);
  this.onPaste = onPaste;
  instance.addHook('beforeKeyDown', onBeforeKeyDown);
  function onCut() {
    if (!instance.isListening()) {
      return;
    }
    instance.selection.empty();
  }
  function onPaste(str) {
    var input,
        inputArray,
        selected,
        coordsFrom,
        coordsTo,
        cellRange,
        topLeftCorner,
        bottomRightCorner,
        areaStart,
        areaEnd;
    if (!instance.isListening() || !instance.selection.isSelected()) {
      return;
    }
    input = str;
    inputArray = SheetClip.parse(input);
    selected = instance.getSelected();
    coordsFrom = new WalkontableCellCoords(selected[0], selected[1]);
    coordsTo = new WalkontableCellCoords(selected[2], selected[3]);
    cellRange = new WalkontableCellRange(coordsFrom, coordsFrom, coordsTo);
    topLeftCorner = cellRange.getTopLeftCorner();
    bottomRightCorner = cellRange.getBottomRightCorner();
    areaStart = topLeftCorner;
    areaEnd = new WalkontableCellCoords(Math.max(bottomRightCorner.row, inputArray.length - 1 + topLeftCorner.row), Math.max(bottomRightCorner.col, inputArray[0].length - 1 + topLeftCorner.col));
    var isSelRowAreaCoverInputValue = coordsTo.row - coordsFrom.row >= inputArray.length - 1;
    var isSelColAreaCoverInputValue = coordsTo.col - coordsFrom.col >= inputArray[0].length - 1;
    instance.addHookOnce('afterChange', (function(changes, source) {
      var changesLength = changes ? changes.length : 0;
      if (changesLength) {
        var offset = {
          row: 0,
          col: 0
        };
        var highestColumnIndex = -1;
        arrayEach(changes, (function(change, index) {
          var nextChange = changesLength > index + 1 ? changes[index + 1] : null;
          if (nextChange) {
            if (!isSelRowAreaCoverInputValue) {
              offset.row = offset.row + Math.max(nextChange[0] - change[0] - 1, 0);
            }
            if (!isSelColAreaCoverInputValue && change[1] > highestColumnIndex) {
              highestColumnIndex = change[1];
              offset.col = offset.col + Math.max(nextChange[1] - change[1] - 1, 0);
            }
          }
        }));
        instance.selectCell(areaStart.row, areaStart.col, areaEnd.row + offset.row, areaEnd.col + offset.col);
      }
    }));
    instance.populateFromArray(areaStart.row, areaStart.col, inputArray, areaEnd.row, areaEnd.col, 'paste', instance.getSettings().pasteMode);
  }
  function onBeforeKeyDown(event) {
    if (!instance.getSelected()) {
      return;
    }
    if (instance.getActiveEditor() && instance.getActiveEditor().isOpened()) {
      return;
    }
    if (isCtrlKey(event.keyCode)) {
      _this.setCopyableText();
      stopImmediatePropagation(event);
      return;
    }
    var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (event.keyCode == KEY_CODES.A && ctrlDown) {
      instance._registerTimeout(setTimeout(proxy(_this.setCopyableText, _this), 0));
    }
  }
  this.destroy = function() {
    if (this.copyPasteInstance) {
      this.copyPasteInstance.removeCallback(onCut);
      this.copyPasteInstance.removeCallback(onPaste);
      this.copyPasteInstance.destroy();
      this.copyPasteInstance = null;
    }
    instance.removeHook('beforeKeyDown', onBeforeKeyDown);
  };
  instance.addHook('afterDestroy', proxy(this.destroy, this));
  this.triggerPaste = proxy(this.copyPasteInstance.triggerPaste, this.copyPasteInstance);
  this.triggerCut = proxy(this.copyPasteInstance.triggerCut, this.copyPasteInstance);
  this.setCopyableText = function() {
    var settings = instance.getSettings();
    var copyRowsLimit = settings.copyRowsLimit;
    var copyColsLimit = settings.copyColsLimit;
    var selRange = instance.getSelectedRange();
    var topLeft = selRange.getTopLeftCorner();
    var bottomRight = selRange.getBottomRightCorner();
    var startRow = topLeft.row;
    var startCol = topLeft.col;
    var endRow = bottomRight.row;
    var endCol = bottomRight.col;
    var finalEndRow = Math.min(endRow, startRow + copyRowsLimit - 1);
    var finalEndCol = Math.min(endCol, startCol + copyColsLimit - 1);
    var copyableRanges = [];
    copyableRanges.push({
      startRow: startRow,
      startCol: startCol,
      endRow: finalEndRow,
      endCol: finalEndCol
    });
    copyableRanges = Handsontable.hooks.run(instance, 'modifyCopyableRange', copyableRanges);
    var copyableData = this.getRangedCopyableData(copyableRanges);
    instance.copyPaste.copyPasteInstance.copyable(copyableData);
    if (endRow !== finalEndRow || endCol !== finalEndCol) {
      Handsontable.hooks.run(instance, 'afterCopyLimit', endRow - startRow + 1, endCol - startCol + 1, copyRowsLimit, copyColsLimit);
    }
  };
  this.getRangedCopyableData = function(ranges) {
    var dataSet = [];
    var copyableRows = [];
    var copyableColumns = [];
    arrayEach(ranges, (function(range) {
      rangeEach(range.startRow, range.endRow, (function(row) {
        if (copyableRows.indexOf(row) === -1) {
          copyableRows.push(row);
        }
      }));
      rangeEach(range.startCol, range.endCol, (function(column) {
        if (copyableColumns.indexOf(column) === -1) {
          copyableColumns.push(column);
        }
      }));
    }));
    arrayEach(copyableRows, (function(row) {
      var rowSet = [];
      arrayEach(copyableColumns, (function(column) {
        var tdItem = instance.getCell(row, column);
        rowSet.push(getDomHtml(tdItem));
      }));
      dataSet.push(rowSet);
    }));
    return SheetClip.stringify(dataSet);
    function getDomHtml(dom) {
      var tempContainer = $('<div></div>');
      tempContainer.append(dom.cloneNode(true));
      return tempContainer.html();
    }
  };
}
function init() {
  var instance = this,
      pluginEnabled = instance.getSettings().copyPaste !== false;
  if (pluginEnabled && !instance.copyPaste) {
    instance.copyPaste = new CopyPastePlugin(instance);
  } else if (!pluginEnabled && instance.copyPaste) {
    instance.copyPaste.destroy();
    instance.copyPaste = null;
  }
}
Handsontable.hooks.add('afterInit', init);
Handsontable.hooks.add('afterUpdateSettings', init);
Handsontable.hooks.register('afterCopyLimit');
Handsontable.hooks.register('modifyCopyableRange');
;

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"3rdparty/walkontable/src/cell/range":5,"SheetClip":"SheetClip","copyPaste":"copyPaste","helpers/array":33,"helpers/dom/event":37,"helpers/function":38,"helpers/number":40,"helpers/unicode":44,"plugins":47}],59:[function(require,module,exports){
"use strict";
var $___46__46__47__46__46__47_plugins__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var WalkontableCellRange = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ = require("3rdparty/walkontable/src/cell/range"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__}).WalkontableCellRange;
var WalkontableSelection = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__ = require("3rdparty/walkontable/src/selection"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_selection__}).WalkontableSelection;
function CustomBorders() {}
var instance;
var preCustomBorders = [];
var _setCellMeta = function(row, col, type, border) {
  preCustomBorders.push({
    row: row,
    col: col,
    type: type
  });
  this.setCellMeta(row, col, type, border);
};
var checkEnable = function(customBorders) {
  if (typeof customBorders === 'boolean') {
    if (customBorders === true) {
      return true;
    }
  }
  if (typeof customBorders === 'object') {
    if (customBorders.length > 0) {
      return true;
    }
  }
  return false;
};
var init = function() {
  if (checkEnable(this.getSettings().customBorders)) {
    if (!this.customBorders) {
      instance = this;
      this.customBorders = new CustomBorders();
    }
  }
};
var getSettingIndex = function(className) {
  for (var i = 0; i < instance.view.wt.selections.length; i++) {
    if (instance.view.wt.selections[i].settings.className == className) {
      return i;
    }
  }
  return -1;
};
var insertBorderIntoSettings = function(border) {
  var coordinates = {
    row: border.row,
    col: border.col
  };
  var selection = new WalkontableSelection(border, new WalkontableCellRange(coordinates, coordinates, coordinates));
  var index = getSettingIndex(border.className);
  if (index >= 0) {
    instance.view.wt.selections[index] = selection;
  } else {
    instance.view.wt.selections.push(selection);
  }
};
var prepareBorderFromCustomAdded = function(row, col, borderObj) {
  var border = createEmptyBorders(row, col);
  border = extendDefaultBorder(border, borderObj);
  _setCellMeta.call(this, row, col, 'borders', border);
  insertBorderIntoSettings(border);
};
var prepareBorderFromCustomAddedRange = function(rowObj) {
  var range = rowObj.range;
  for (var row = range.from.row; row <= range.to.row; row++) {
    for (var col = range.from.col; col <= range.to.col; col++) {
      var border = createEmptyBorders(row, col);
      var add = 0;
      if (row == range.from.row) {
        add++;
        if (rowObj.hasOwnProperty('top')) {
          border.top = rowObj.top;
        }
      }
      if (row == range.to.row) {
        add++;
        if (rowObj.hasOwnProperty('bottom')) {
          border.bottom = rowObj.bottom;
        }
      }
      if (col == range.from.col) {
        add++;
        if (rowObj.hasOwnProperty('left')) {
          border.left = rowObj.left;
        }
      }
      if (col == range.to.col) {
        add++;
        if (rowObj.hasOwnProperty('right')) {
          border.right = rowObj.right;
        }
      }
      if (rowObj.customBorderStyle) {
        border.customBorderStyle = rowObj.customBorderStyle;
      }
      if (add > 0) {
        _setCellMeta.call(this, row, col, 'borders', border);
        insertBorderIntoSettings(border);
      }
    }
  }
};
var createClassName = function(row, col) {
  return 'border_row' + row + 'col' + col;
};
var createDefaultCustomBorder = function() {
  return {
    width: 1,
    color: '#000'
  };
};
var createSingleEmptyBorder = function() {
  return {hide: true};
};
var createDefaultHtBorder = function() {
  return {
    width: 1,
    color: '#000',
    cornerVisible: false
  };
};
var createEmptyBorders = function(row, col) {
  return {
    className: createClassName(row, col),
    border: createDefaultHtBorder(),
    row: row,
    col: col,
    top: createSingleEmptyBorder(),
    right: createSingleEmptyBorder(),
    bottom: createSingleEmptyBorder(),
    left: createSingleEmptyBorder()
  };
};
var extendDefaultBorder = function(defaultBorder, customBorder) {
  if (customBorder.hasOwnProperty('border')) {
    defaultBorder.border = customBorder.border;
  }
  if (customBorder.hasOwnProperty('top')) {
    defaultBorder.top = customBorder.top;
  }
  if (customBorder.hasOwnProperty('right')) {
    defaultBorder.right = customBorder.right;
  }
  if (customBorder.hasOwnProperty('bottom')) {
    defaultBorder.bottom = customBorder.bottom;
  }
  if (customBorder.hasOwnProperty('left')) {
    defaultBorder.left = customBorder.left;
  }
  return defaultBorder;
};
var removeBordersFromDom = function(borderClassName) {
  var borders = document.querySelectorAll('.' + borderClassName);
  for (var i = 0; i < borders.length; i++) {
    if (borders[i]) {
      if (borders[i].nodeName != 'TD') {
        var parent = borders[i].parentNode;
        if (parent.parentNode) {
          parent.parentNode.removeChild(parent);
        }
      }
    }
  }
};
var removeAllBorders = function(row, col) {
  if (row != undefined) {
    var borderClassName = createClassName(row, col);
    removeBordersFromDom(borderClassName);
    this.removeCellMeta(row, col, 'borders');
  } else {
    for (var i = 0,
        l = preCustomBorders.length; i < l; i++) {
      var item = preCustomBorders[i];
      var borderClassName = createClassName(item.row, item.col);
      removeBordersFromDom(borderClassName);
      this.removeCellMeta(item.row, item.col, 'borders');
    }
  }
  preCustomBorders = [];
};
var setBorder = function(row, col, place, remove) {
  var bordersMeta = this.getCellMeta(row, col).borders;
  if (!bordersMeta || bordersMeta.border == undefined) {
    bordersMeta = createEmptyBorders(row, col);
  }
  if (remove) {
    bordersMeta[place] = createSingleEmptyBorder();
  } else {
    bordersMeta[place] = createDefaultCustomBorder();
  }
  _setCellMeta.call(this, row, col, 'borders', bordersMeta);
  var borderClassName = createClassName(row, col);
  removeBordersFromDom(borderClassName);
  insertBorderIntoSettings(bordersMeta);
  this.render();
};
var prepareBorder = function(range, place, remove) {
  if (range.from.row == range.to.row && range.from.col == range.to.col) {
    if (place == 'noBorders') {
      removeAllBorders.call(this, range.from.row, range.from.col);
    } else {
      setBorder.call(this, range.from.row, range.from.col, place, remove);
    }
  } else {
    switch (place) {
      case 'noBorders':
        for (var column = range.from.col; column <= range.to.col; column++) {
          for (var row = range.from.row; row <= range.to.row; row++) {
            removeAllBorders.call(this, row, column);
          }
        }
        break;
      case 'top':
        for (var topCol = range.from.col; topCol <= range.to.col; topCol++) {
          setBorder.call(this, range.from.row, topCol, place, remove);
        }
        break;
      case 'right':
        for (var rowRight = range.from.row; rowRight <= range.to.row; rowRight++) {
          setBorder.call(this, rowRight, range.to.col, place);
        }
        break;
      case 'bottom':
        for (var bottomCol = range.from.col; bottomCol <= range.to.col; bottomCol++) {
          setBorder.call(this, range.to.row, bottomCol, place);
        }
        break;
      case 'left':
        for (var rowLeft = range.from.row; rowLeft <= range.to.row; rowLeft++) {
          setBorder.call(this, rowLeft, range.from.col, place);
        }
        break;
    }
  }
};
var checkSelectionBorders = function(hot, direction) {
  var atLeastOneHasBorder = false;
  hot.getSelectedRange().forAll(function(r, c) {
    var metaBorders = hot.getCellMeta(r, c).borders;
    if (metaBorders) {
      if (direction) {
        if (!metaBorders[direction].hasOwnProperty('hide')) {
          atLeastOneHasBorder = true;
          return false;
        }
      } else {
        atLeastOneHasBorder = true;
        return false;
      }
    }
  });
  return atLeastOneHasBorder;
};
var markSelected = function(label) {
  return '<span class="selected">' + String.fromCharCode(10003) + '</span>' + label;
};
var addBordersOptionsToContextMenu = function(defaultOptions) {
  if (!this.getSettings().customBorders) {
    return;
  }
  defaultOptions.items.push(Handsontable.plugins.ContextMenu.SEPARATOR);
  defaultOptions.items.push({
    key: 'borders',
    name: 'Borders',
    submenu: {items: [{
        key: 'borders:top',
        name: function() {
          var label = 'Top';
          var hasBorder = checkSelectionBorders(this, 'top');
          if (hasBorder) {
            label = markSelected(label);
          }
          return label;
        },
        callback: function() {
          var hasBorder = checkSelectionBorders(this, 'top');
          prepareBorder.call(this, this.getSelectedRange(), 'top', hasBorder);
        },
        disabled: false
      }, {
        key: 'borders:right',
        name: function() {
          var label = 'Right';
          var hasBorder = checkSelectionBorders(this, 'right');
          if (hasBorder) {
            label = markSelected(label);
          }
          return label;
        },
        callback: function() {
          var hasBorder = checkSelectionBorders(this, 'right');
          prepareBorder.call(this, this.getSelectedRange(), 'right', hasBorder);
        },
        disabled: false
      }, {
        key: 'borders:bottom',
        name: function() {
          var label = 'Bottom';
          var hasBorder = checkSelectionBorders(this, 'bottom');
          if (hasBorder) {
            label = markSelected(label);
          }
          return label;
        },
        callback: function() {
          var hasBorder = checkSelectionBorders(this, 'bottom');
          prepareBorder.call(this, this.getSelectedRange(), 'bottom', hasBorder);
        },
        disabled: false
      }, {
        key: 'borders:left',
        name: function() {
          var label = 'Left';
          var hasBorder = checkSelectionBorders(this, 'left');
          if (hasBorder) {
            label = markSelected(label);
          }
          return label;
        },
        callback: function() {
          var hasBorder = checkSelectionBorders(this, 'left');
          prepareBorder.call(this, this.getSelectedRange(), 'left', hasBorder);
        },
        disabled: false
      }, {
        key: 'borders:no_borders',
        name: 'Remove border(s)',
        callback: function() {
          prepareBorder.call(this, this.getSelectedRange(), 'noBorders');
        },
        disabled: function() {
          return !checkSelectionBorders(this);
        }
      }]}
  });
};
Handsontable.hooks.add('beforeInit', init);
Handsontable.hooks.add('afterContextMenuDefaultOptions', addBordersOptionsToContextMenu);
Handsontable.hooks.add('afterInit', function() {
  var customBorders = this.getSettings().customBorders;
  if (customBorders) {
    for (var i = 0; i < customBorders.length; i++) {
      if (customBorders[i].range) {
        prepareBorderFromCustomAddedRange.call(this, customBorders[i]);
      } else {
        prepareBorderFromCustomAdded.call(this, customBorders[i].row, customBorders[i].col, customBorders[i]);
      }
    }
    this.view.wt.draw(true);
  }
});
Handsontable.hooks.add('afterUpdateSettings', function() {
  console.log('afterUpdateSettings');
  var customBorders = this.getSettings().customBorders;
  if (customBorders) {
    removeAllBorders.call(this);
    for (var i = 0; i < customBorders.length; i++) {
      if (customBorders[i].range) {
        prepareBorderFromCustomAddedRange.call(this, customBorders[i]);
      } else {
        prepareBorderFromCustomAdded.call(this, customBorders[i].row, customBorders[i].col, customBorders[i]);
      }
    }
    this.view.wt.draw(true);
  }
});
Handsontable.CustomBorders = CustomBorders;

//# 
},{"3rdparty/walkontable/src/cell/range":5,"3rdparty/walkontable/src/selection":17,"plugins":47}],60:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  DragToScroll: {get: function() {
      return DragToScroll;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_plugins__;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
;
Handsontable.plugins.DragToScroll = DragToScroll;
function DragToScroll() {
  this.boundaries = null;
  this.callback = null;
}
DragToScroll.prototype.setBoundaries = function(boundaries) {
  this.boundaries = boundaries;
};
DragToScroll.prototype.setCallback = function(callback) {
  this.callback = callback;
};
DragToScroll.prototype.check = function(x, y) {
  var diffX = 0;
  var diffY = 0;
  if (y < this.boundaries.top) {
    diffY = y - this.boundaries.top;
  } else if (y > this.boundaries.bottom) {
    diffY = y - this.boundaries.bottom;
  }
  if (x < this.boundaries.left) {
    diffX = x - this.boundaries.left;
  } else if (x > this.boundaries.right) {
    diffX = x - this.boundaries.right;
  }
  this.callback(diffX, diffY);
};
var dragToScroll;
var instance;
var setupListening = function(instance) {
  instance.dragToScrollListening = false;
  var scrollHandler = instance.view.wt.wtTable.holder;
  dragToScroll = new DragToScroll();
  if (scrollHandler === window) {
    return;
  } else {
    dragToScroll.setBoundaries(scrollHandler.getBoundingClientRect());
  }
  dragToScroll.setCallback(function(scrollX, scrollY) {
    if (scrollX < 0) {
      scrollHandler.scrollLeft -= 50;
    } else if (scrollX > 0) {
      scrollHandler.scrollLeft += 50;
    }
    if (scrollY < 0) {
      scrollHandler.scrollTop -= 20;
    } else if (scrollY > 0) {
      scrollHandler.scrollTop += 20;
    }
  });
  instance.dragToScrollListening = true;
};
Handsontable.hooks.add('afterInit', function() {
  var instance = this;
  var eventManager = eventManagerObject(this);
  eventManager.addEventListener(document, 'mouseup', function() {
    instance.dragToScrollListening = false;
  });
  eventManager.addEventListener(document, 'mousemove', function(event) {
    if (instance.dragToScrollListening) {
      dragToScroll.check(event.clientX, event.clientY);
    }
  });
});
Handsontable.hooks.add('afterDestroy', function() {
  eventManagerObject(this).clear();
});
Handsontable.hooks.add('afterOnCellMouseDown', function() {
  setupListening(this);
});
Handsontable.hooks.add('afterOnCellCornerMouseDown', function() {
  setupListening(this);
});
Handsontable.plugins.DragToScroll = DragToScroll;

//# 
},{"eventManager":32,"plugins":47}],61:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ManualColumnFreeze: {get: function() {
      return ManualColumnFreeze;
    }},
  __esModule: {value: true}
});
var $___46__46__47__95_base__,
    $___46__46__47__46__46__47_plugins__;
var BasePlugin = ($___46__46__47__95_base__ = require("_base"), $___46__46__47__95_base__ && $___46__46__47__95_base__.__esModule && $___46__46__47__95_base__ || {default: $___46__46__47__95_base__}).default;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var ManualColumnFreeze = function ManualColumnFreeze(hotInstance) {
  $traceurRuntime.superConstructor($ManualColumnFreeze).call(this, hotInstance);
};
var $ManualColumnFreeze = ManualColumnFreeze;
($traceurRuntime.createClass)(ManualColumnFreeze, {
  isEnabled: function() {
    return !!this.hot.getSettings().manualColumnFreeze;
  },
  enablePlugin: function() {
    var $__2 = this;
    if (this.enabled) {
      return;
    }
    this.addHook('modifyCol', (function(col) {
      return $__2.onModifyCol(col);
    }));
    this.addHook('afterContextMenuDefaultOptions', (function(defaultOptions) {
      return $__2.addContextMenuEntry(defaultOptions);
    }));
    $traceurRuntime.superGet(this, $ManualColumnFreeze.prototype, "enablePlugin").call(this);
  },
  disablePlugin: function() {
    $traceurRuntime.superGet(this, $ManualColumnFreeze.prototype, "disablePlugin").call(this);
  },
  init: function() {
    $traceurRuntime.superGet(this, $ManualColumnFreeze.prototype, "init").call(this);
    if (typeof this.hot.manualColumnPositionsPluginUsages === 'undefined') {
      this.hot.manualColumnPositionsPluginUsages = ['manualColumnFreeze'];
    } else {
      this.hot.manualColumnPositionsPluginUsages.push('manualColumnFreeze');
    }
    this.fixedColumnsCount = this.hot.getSettings().fixedColumnsLeft;
  },
  onModifyCol: function(column) {
    if (this.hot.manualColumnPositionsPluginUsages.length > 1) {
      return column;
    }
    return this.getModifiedColumnIndex(column);
  },
  getModifiedColumnIndex: function(column) {
    return this.hot.manualColumnPositions[column];
  },
  addContextMenuEntry: function(defaultOptions) {
    var _this = this;
    defaultOptions.items.push(Handsontable.plugins.ContextMenu.SEPARATOR, {
      key: 'freeze_column',
      name: function() {
        var selectedColumn = _this.hot.getSelected()[1];
        if (selectedColumn > _this.fixedColumnsCount - 1) {
          return 'Freeze this column';
        } else {
          return 'Unfreeze this column';
        }
      },
      disabled: function() {
        var selection = _this.hot.getSelected();
        return selection[1] !== selection[3];
      },
      callback: function() {
        var selectedColumn = _this.hot.getSelected()[1];
        if (selectedColumn > _this.fixedColumnsCount - 1) {
          _this.freezeColumn(selectedColumn);
        } else {
          _this.unfreezeColumn(selectedColumn);
        }
      }
    });
  },
  freezeColumn: function(column) {
    if (column <= this.fixedColumnsCount - 1) {
      return;
    }
    var modifiedColumn = this.getModifiedColumnIndex(column) || column;
    this.checkPositionData(modifiedColumn);
    this.modifyColumnOrder(modifiedColumn, column, null, 'freeze');
    this.addFixedColumn();
    this.hot.view.wt.wtOverlays.leftOverlay.refresh();
    this.hot.view.wt.wtOverlays.adjustElementsSize();
  },
  unfreezeColumn: function(column) {
    if (column > this.fixedColumnsCount - 1) {
      return;
    }
    var returnCol = this.getBestColumnReturnPosition(column);
    var modifiedColumn = this.getModifiedColumnIndex(column) || column;
    this.checkPositionData(modifiedColumn);
    this.modifyColumnOrder(modifiedColumn, column, returnCol, 'unfreeze');
    this.removeFixedColumn();
    this.hot.view.wt.wtOverlays.leftOverlay.refresh();
    this.hot.view.wt.wtOverlays.adjustElementsSize();
  },
  addFixedColumn: function() {
    this.hot.updateSettings({fixedColumnsLeft: this.fixedColumnsCount + 1});
    this.fixedColumnsCount++;
  },
  removeFixedColumn: function() {
    this.hot.updateSettings({fixedColumnsLeft: this.fixedColumnsCount - 1});
    this.fixedColumnsCount--;
  },
  checkPositionData: function(column) {
    if (!this.hot.manualColumnPositions || this.hot.manualColumnPositions.length === 0) {
      if (!this.hot.manualColumnPositions) {
        this.hot.manualColumnPositions = [];
      }
    }
    if (column) {
      if (!this.hot.manualColumnPositions[column]) {
        this.createPositionData(column + 1);
      }
    } else {
      this.createPositionData(this.hot.countCols());
    }
  },
  createPositionData: function(length) {
    if (this.hot.manualColumnPositions.length < length) {
      for (var i = this.hot.manualColumnPositions.length; i < length; i++) {
        this.hot.manualColumnPositions[i] = i;
      }
    }
  },
  modifyColumnOrder: function(column, actualColumn, returnColumn, action) {
    if (returnColumn == null) {
      returnColumn = column;
    }
    if (action === 'freeze') {
      this.hot.manualColumnPositions.splice(this.fixedColumnsCount, 0, this.hot.manualColumnPositions.splice(actualColumn, 1)[0]);
    } else if (action === 'unfreeze') {
      this.hot.manualColumnPositions.splice(returnColumn, 0, this.hot.manualColumnPositions.splice(actualColumn, 1)[0]);
    }
  },
  getBestColumnReturnPosition: function(column) {
    var i = this.fixedColumnsCount;
    var j = this.getModifiedColumnIndex(i);
    var initialCol = this.getModifiedColumnIndex(column);
    while (j < initialCol) {
      i++;
      j = this.getModifiedColumnIndex(i);
    }
    return i - 1;
  }
}, {}, BasePlugin);
;
registerPlugin('manualColumnFreeze', ManualColumnFreeze);

//# 
},{"_base":48,"plugins":47}],62:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ManualColumnMove: {get: function() {
      return ManualColumnMove;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_plugins__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    hasClass = $__0.hasClass,
    removeClass = $__0.removeClass;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var $__2 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    pageX = $__2.pageX,
    pageY = $__2.pageY;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
;
function ManualColumnMove() {
  var startCol,
      endCol,
      startX,
      startOffset,
      currentCol,
      instance,
      currentTH,
      handle = document.createElement('DIV'),
      guide = document.createElement('DIV'),
      eventManager = eventManagerObject(this);
  handle.className = 'manualColumnMover';
  guide.className = 'manualColumnMoverGuide';
  var saveManualColumnPositions = function() {
    var instance = this;
    Handsontable.hooks.run(instance, 'persistentStateSave', 'manualColumnPositions', instance.manualColumnPositions);
  };
  var loadManualColumnPositions = function() {
    var instance = this;
    var storedState = {};
    Handsontable.hooks.run(instance, 'persistentStateLoad', 'manualColumnPositions', storedState);
    return storedState.value;
  };
  function setupHandlePosition(TH) {
    instance = this;
    currentTH = TH;
    var col = this.view.wt.wtTable.getCoords(TH).col;
    if (col >= 0) {
      currentCol = col;
      var box = currentTH.getBoundingClientRect();
      startOffset = box.left;
      handle.style.top = box.top + 'px';
      handle.style.left = startOffset + 'px';
      instance.rootElement.appendChild(handle);
    }
  }
  function refreshHandlePosition(TH, delta) {
    var box = TH.getBoundingClientRect();
    var handleWidth = 6;
    if (delta > 0) {
      handle.style.left = (box.left + box.width - handleWidth) + 'px';
    } else {
      handle.style.left = box.left + 'px';
    }
  }
  function setupGuidePosition() {
    var instance = this;
    addClass(handle, 'active');
    addClass(guide, 'active');
    var box = currentTH.getBoundingClientRect();
    guide.style.width = box.width + 'px';
    guide.style.height = instance.view.maximumVisibleElementHeight(0) + 'px';
    guide.style.top = handle.style.top;
    guide.style.left = startOffset + 'px';
    instance.rootElement.appendChild(guide);
  }
  function refreshGuidePosition(diff) {
    guide.style.left = startOffset + diff + 'px';
  }
  function hideHandleAndGuide() {
    removeClass(handle, 'active');
    removeClass(guide, 'active');
  }
  var checkColumnHeader = function(element) {
    if (element.tagName != 'BODY') {
      if (element.parentNode.tagName == 'THEAD') {
        return true;
      } else {
        element = element.parentNode;
        return checkColumnHeader(element);
      }
    }
    return false;
  };
  var getTHFromTargetElement = function(element) {
    if (element.tagName != 'TABLE') {
      if (element.tagName == 'TH') {
        return element;
      } else {
        return getTHFromTargetElement(element.parentNode);
      }
    }
    return null;
  };
  var bindEvents = function() {
    var instance = this;
    var pressed;
    eventManager.addEventListener(instance.rootElement, 'mouseover', function(e) {
      if (checkColumnHeader(e.target)) {
        var th = getTHFromTargetElement(e.target);
        if (th) {
          if (pressed) {
            var col = instance.view.wt.wtTable.getCoords(th).col;
            if (col >= 0) {
              endCol = col;
              refreshHandlePosition(e.target, endCol - startCol);
            }
          } else {
            setupHandlePosition.call(instance, th);
          }
        }
      }
    });
    eventManager.addEventListener(instance.rootElement, 'mousedown', function(e) {
      if (hasClass(e.target, 'manualColumnMover')) {
        startX = pageX(e);
        setupGuidePosition.call(instance);
        pressed = instance;
        startCol = currentCol;
        endCol = currentCol;
      }
    });
    eventManager.addEventListener(window, 'mousemove', function(e) {
      if (pressed) {
        refreshGuidePosition(pageX(e) - startX);
      }
    });
    eventManager.addEventListener(window, 'mouseup', function(e) {
      if (pressed) {
        hideHandleAndGuide();
        pressed = false;
        createPositionData(instance.manualColumnPositions, instance.countCols());
        instance.manualColumnPositions.splice(endCol, 0, instance.manualColumnPositions.splice(startCol, 1)[0]);
        Handsontable.hooks.run(instance, 'beforeColumnMove', startCol, endCol);
        instance.forceFullRender = true;
        instance.view.render();
        saveManualColumnPositions.call(instance);
        Handsontable.hooks.run(instance, 'afterColumnMove', startCol, endCol);
        setupHandlePosition.call(instance, currentTH);
      }
    });
    instance.addHook('afterDestroy', unbindEvents);
  };
  var unbindEvents = function() {
    eventManager.clear();
  };
  var createPositionData = function(positionArr, len) {
    if (positionArr.length < len) {
      for (var i = positionArr.length; i < len; i++) {
        positionArr[i] = i;
      }
    }
  };
  this.beforeInit = function() {
    this.manualColumnPositions = [];
  };
  this.init = function(source) {
    var instance = this;
    var manualColMoveEnabled = !!(this.getSettings().manualColumnMove);
    if (manualColMoveEnabled) {
      var initialManualColumnPositions = this.getSettings().manualColumnMove;
      var loadedManualColumnPositions = loadManualColumnPositions.call(instance);
      if (typeof loadedManualColumnPositions != 'undefined') {
        this.manualColumnPositions = loadedManualColumnPositions;
      } else if (Array.isArray(initialManualColumnPositions)) {
        this.manualColumnPositions = initialManualColumnPositions;
      } else {
        this.manualColumnPositions = [];
      }
      if (source === 'afterInit' || source === 'afterUpdateSettings' && eventManager.context.eventListeners.length === 0) {
        if (typeof instance.manualColumnPositionsPluginUsages === 'undefined') {
          instance.manualColumnPositionsPluginUsages = ['manualColumnMove'];
        } else {
          instance.manualColumnPositionsPluginUsages.push('manualColumnMove');
        }
        bindEvents.call(this);
        if (this.manualColumnPositions.length > 0) {
          this.forceFullRender = true;
          this.render();
        }
      }
    } else {
      var pluginUsagesIndex = instance.manualColumnPositionsPluginUsages ? instance.manualColumnPositionsPluginUsages.indexOf('manualColumnMove') : -1;
      if (pluginUsagesIndex > -1) {
        unbindEvents.call(this);
        this.manualColumnPositions = [];
        instance.manualColumnPositionsPluginUsages[pluginUsagesIndex] = void 0;
      }
    }
  };
  this.modifyCol = function(col) {
    if (this.getSettings().manualColumnMove) {
      if (typeof this.manualColumnPositions[col] === 'undefined') {
        createPositionData(this.manualColumnPositions, col + 1);
      }
      return this.manualColumnPositions[col];
    }
    return col;
  };
  this.afterRemoveCol = function(index, amount) {
    if (!this.getSettings().manualColumnMove) {
      return;
    }
    var rmindx,
        colpos = this.manualColumnPositions;
    rmindx = colpos.splice(index, amount);
    colpos = colpos.map(function(colpos) {
      var i,
          newpos = colpos;
      for (i = 0; i < rmindx.length; i++) {
        if (colpos > rmindx[i]) {
          newpos--;
        }
      }
      return newpos;
    });
    this.manualColumnPositions = colpos;
  };
  this.afterCreateCol = function(index, amount) {
    if (!this.getSettings().manualColumnMove) {
      return;
    }
    var colpos = this.manualColumnPositions;
    if (!colpos.length) {
      return;
    }
    var addindx = [];
    for (var i = 0; i < amount; i++) {
      addindx.push(index + i);
    }
    if (index >= colpos.length) {
      colpos.concat(addindx);
    } else {
      colpos = colpos.map(function(colpos) {
        return (colpos >= index) ? (colpos + amount) : colpos;
      });
      colpos.splice.apply(colpos, [index, 0].concat(addindx));
    }
    this.manualColumnPositions = colpos;
  };
}
var htManualColumnMove = new ManualColumnMove();
Handsontable.hooks.add('beforeInit', htManualColumnMove.beforeInit);
Handsontable.hooks.add('afterInit', function() {
  htManualColumnMove.init.call(this, 'afterInit');
});
Handsontable.hooks.add('afterUpdateSettings', function() {
  htManualColumnMove.init.call(this, 'afterUpdateSettings');
});
Handsontable.hooks.add('modifyCol', htManualColumnMove.modifyCol);
Handsontable.hooks.add('afterRemoveCol', htManualColumnMove.afterRemoveCol);
Handsontable.hooks.add('afterCreateCol', htManualColumnMove.afterCreateCol);
Handsontable.hooks.register('beforeColumnMove');
Handsontable.hooks.register('afterColumnMove');

//# 
},{"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"plugins":47}],63:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ManualColumnResize: {get: function() {
      return ManualColumnResize;
    }},
  __esModule: {value: true}
});
var $___46__46__47__95_base_46_js__,
    $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_plugins__;
var BasePlugin = ($___46__46__47__95_base_46_js__ = require("_base.js"), $___46__46__47__95_base_46_js__ && $___46__46__47__95_base_46_js__.__esModule && $___46__46__47__95_base_46_js__ || {default: $___46__46__47__95_base_46_js__}).default;
var $__1 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__1.addClass,
    hasClass = $__1.hasClass,
    removeClass = $__1.removeClass;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var $__3 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    pageX = $__3.pageX,
    pageY = $__3.pageY;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var ManualColumnResize = function ManualColumnResize(hotInstance) {
  $traceurRuntime.superConstructor($ManualColumnResize).call(this, hotInstance);
  this.currentTH = null;
  this.currentCol = null;
  this.currentWidth = null;
  this.newSize = null;
  this.startY = null;
  this.startWidth = null;
  this.startOffset = null;
  this.handle = document.createElement('DIV');
  this.guide = document.createElement('DIV');
  this.eventManager = eventManagerObject(this);
  this.pressed = null;
  this.dblclick = 0;
  this.autoresizeTimeout = null;
  this.manualColumnWidths = [];
  addClass(this.handle, 'manualColumnResizer');
  addClass(this.guide, 'manualColumnResizerGuide');
};
var $ManualColumnResize = ManualColumnResize;
($traceurRuntime.createClass)(ManualColumnResize, {
  isEnabled: function() {
    return this.hot.getSettings().manualColumnResize;
  },
  enablePlugin: function() {
    var $__5 = this;
    if (this.enabled) {
      return;
    }
    this.manualColumnWidths = [];
    var initialColumnWidth = this.hot.getSettings().manualColumnResize;
    var loadedManualColumnWidths = this.loadManualColumnWidths();
    this.addHook('modifyColWidth', (function(width, col) {
      return $__5.onModifyColWidth(width, col);
    }));
    this.addHook('updateColWidthAfterAddCol', (function(index, amount) {
      return $__5.updateColWidthAfterAddCol(index, amount);
    }));
    this.addHook('updateColWidthAfterRemoveCol', (function(index, amount) {
      return $__5.updateColWidthAfterRemoveCol(index, amount);
    }));
    if (typeof loadedManualColumnWidths != 'undefined') {
      this.manualColumnWidths = loadedManualColumnWidths;
    } else if (Array.isArray(initialColumnWidth)) {
      this.manualColumnWidths = initialColumnWidth;
    } else {
      this.manualColumnWidths = [];
    }
    Handsontable.hooks.register('beforeColumnResize');
    Handsontable.hooks.register('afterColumnResize');
    this.bindEvents();
    $traceurRuntime.superGet(this, $ManualColumnResize.prototype, "enablePlugin").call(this);
  },
  updatePlugin: function() {
    var initialColumnWidth = this.hot.getSettings().manualColumnResize;
    if (Array.isArray(initialColumnWidth)) {
      this.manualColumnWidths = initialColumnWidth;
    } else {
      this.manualColumnWidths = [];
    }
  },
  disablePlugin: function() {
    $traceurRuntime.superGet(this, $ManualColumnResize.prototype, "disablePlugin").call(this);
  },
  saveManualColumnWidths: function() {
    this.hot.runHooks('persistentStateSave', 'manualColumnWidths', this.manualColumnWidths);
  },
  loadManualColumnWidths: function() {
    var storedState = {};
    this.hot.runHooks('persistentStateLoad', 'manualColumnWidths', storedState);
    return storedState.value;
  },
  setupHandlePosition: function(TH) {
    this.currentTH = TH;
    var col = this.hot.view.wt.wtTable.getCoords(TH).col;
    if (col >= 0) {
      var box = this.currentTH.getBoundingClientRect();
      this.currentCol = col;
      this.startOffset = box.left - 6;
      this.startWidth = parseInt(box.width, 10);
      this.handle.style.top = box.top + 'px';
      this.handle.style.left = this.startOffset + this.startWidth + 'px';
      this.hot.rootElement.appendChild(this.handle);
    }
  },
  refreshHandlePosition: function() {
    this.handle.style.left = this.startOffset + this.currentWidth + 'px';
  },
  setupGuidePosition: function() {
    addClass(this.handle, 'active');
    addClass(this.guide, 'active');
    this.guide.style.top = this.handle.style.top;
    this.guide.style.left = this.handle.style.left;
    this.guide.style.height = this.hot.view.maximumVisibleElementHeight(0) + 'px';
    this.hot.rootElement.appendChild(this.guide);
  },
  refreshGuidePosition: function() {
    this.guide.style.left = this.handle.style.left;
  },
  hideHandleAndGuide: function() {
    removeClass(this.handle, 'active');
    removeClass(this.guide, 'active');
  },
  checkIfColumnHeader: function(element) {
    if (element.tagName != 'BODY') {
      if (element.parentNode.tagName == 'THEAD') {
        return true;
      } else {
        element = element.parentNode;
        return this.checkIfColumnHeader(element);
      }
    }
    return false;
  },
  getTHFromTargetElement: function(element) {
    if (element.tagName != 'TABLE') {
      if (element.tagName == 'TH') {
        return element;
      } else {
        return this.getTHFromTargetElement(element.parentNode);
      }
    }
    return null;
  },
  onMouseOver: function(event) {
    if (this.checkIfColumnHeader(event.target)) {
      var th = this.getTHFromTargetElement(event.target);
      if (!th) {
        return;
      }
      var colspan = th.getAttribute('colspan');
      if (th && (colspan === null || colspan === 1)) {
        if (!this.pressed) {
          this.setupHandlePosition(th);
        }
      }
    }
  },
  afterMouseDownTimeout: function() {
    if (this.dblclick >= 2) {
      var hookNewSize = this.hot.runHooks('beforeColumnResize', this.currentCol, this.newSize, true);
      if (hookNewSize !== void 0) {
        this.newSize = hookNewSize;
      }
      this.setManualSize(this.currentCol, this.newSize);
      this.hot.forceFullRender = true;
      this.hot.view.render();
      this.hot.view.wt.wtOverlays.adjustElementsSize(true);
      this.hot.runHooks('afterColumnResize', this.currentCol, this.newSize, true);
    }
    this.dblclick = 0;
    this.autoresizeTimeout = null;
  },
  onMouseDown: function(event) {
    var $__5 = this;
    if (hasClass(event.target, 'manualColumnResizer')) {
      this.setupGuidePosition();
      this.pressed = this.hot;
      if (this.autoresizeTimeout === null) {
        this.autoresizeTimeout = setTimeout((function() {
          return $__5.afterMouseDownTimeout();
        }), 500);
        this.hot._registerTimeout(this.autoresizeTimeout);
      }
      this.dblclick++;
      this.startX = pageX(event);
      this.newSize = this.startWidth;
    }
  },
  onMouseMove: function(event) {
    if (this.pressed) {
      this.currentWidth = this.startWidth + (pageX(event) - this.startX);
      this.newSize = this.setManualSize(this.currentCol, this.currentWidth);
      this.refreshHandlePosition();
      this.refreshGuidePosition();
    }
  },
  onMouseUp: function(event) {
    if (this.pressed) {
      this.hideHandleAndGuide();
      this.pressed = false;
      if (this.newSize != this.startWidth) {
        this.hot.runHooks('beforeColumnResize', this.currentCol, this.newSize);
        this.hot.forceFullRender = true;
        this.hot.view.render();
        this.hot.view.wt.wtOverlays.adjustElementsSize(true);
        this.saveManualColumnWidths();
        this.hot.runHooks('afterColumnResize', this.currentCol, this.newSize);
      }
      this.setupHandlePosition(this.currentTH);
    }
  },
  bindEvents: function() {
    var $__5 = this;
    this.eventManager.addEventListener(this.hot.rootElement, 'mouseover', (function(e) {
      return $__5.onMouseOver(e);
    }));
    this.eventManager.addEventListener(this.hot.rootElement, 'mousedown', (function(e) {
      return $__5.onMouseDown(e);
    }));
    this.eventManager.addEventListener(window, 'mousemove', (function(e) {
      return $__5.onMouseMove(e);
    }));
    this.eventManager.addEventListener(window, 'mouseup', (function(e) {
      return $__5.onMouseUp(e);
    }));
  },
  setManualSize: function(column, width) {
    width = Math.max(width, 20);
    column = this.hot.runHooks('modifyCol', column);
    this.manualColumnWidths[column] = width;
    return width;
  },
  updateColWidthAfterRemoveCol: function(index, amount) {
    if (this.manualColumnWidths.length > index) {
      this.manualColumnWidths.splice(index, amount);
    }
  },
  updateColWidthAfterAddCol: function(index, amount) {
    if (this.manualColumnWidths.length > index) {
      for (var i = 0; i < amount; i++) {
        this.manualColumnWidths.splice(index, 0, undefined);
      }
    }
  },
  onModifyColWidth: function(width, column) {
    if (this.enabled) {
      column = this.hot.runHooks('modifyCol', column);
      if (this.hot.getSettings().manualColumnResize && this.manualColumnWidths[column]) {
        return this.manualColumnWidths[column];
      }
    }
    return width;
  }
}, {}, BasePlugin);
;
registerPlugin('manualColumnResize', ManualColumnResize);

//# 
},{"_base.js":48,"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"plugins":47}],64:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ManualRowMove: {get: function() {
      return ManualRowMove;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_plugins__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    hasClass = $__0.hasClass,
    removeClass = $__0.removeClass;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var $__2 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    pageX = $__2.pageX,
    pageY = $__2.pageY;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
;
function ManualRowMove() {
  var startRow,
      endRow,
      startY,
      startOffset,
      currentRow,
      currentTH,
      handle = document.createElement('DIV'),
      guide = document.createElement('DIV'),
      eventManager = eventManagerObject(this);
  handle.className = 'manualRowMover';
  guide.className = 'manualRowMoverGuide';
  var saveManualRowPositions = function() {
    var instance = this;
    Handsontable.hooks.run(instance, 'persistentStateSave', 'manualRowPositions', instance.manualRowPositions);
  };
  var loadManualRowPositions = function() {
    var instance = this,
        storedState = {};
    Handsontable.hooks.run(instance, 'persistentStateLoad', 'manualRowPositions', storedState);
    return storedState.value;
  };
  function setupHandlePosition(TH) {
    var instance = this;
    currentTH = TH;
    var row = this.view.wt.wtTable.getCoords(TH).row;
    if (row >= 0) {
      currentRow = row;
      var box = currentTH.getBoundingClientRect();
      startOffset = box.top;
      handle.style.top = startOffset + 'px';
      handle.style.left = box.left + 'px';
      instance.rootElement.appendChild(handle);
    }
  }
  function refreshHandlePosition(TH, delta) {
    var box = TH.getBoundingClientRect();
    var handleHeight = 6;
    if (delta > 0) {
      handle.style.top = (box.top + box.height - handleHeight) + 'px';
    } else {
      handle.style.top = box.top + 'px';
    }
  }
  function setupGuidePosition() {
    var instance = this;
    addClass(handle, 'active');
    addClass(guide, 'active');
    var box = currentTH.getBoundingClientRect();
    guide.style.width = instance.view.maximumVisibleElementWidth(0) + 'px';
    guide.style.height = box.height + 'px';
    guide.style.top = startOffset + 'px';
    guide.style.left = handle.style.left;
    instance.rootElement.appendChild(guide);
  }
  function refreshGuidePosition(diff) {
    guide.style.top = startOffset + diff + 'px';
  }
  function hideHandleAndGuide() {
    removeClass(handle, 'active');
    removeClass(guide, 'active');
  }
  var checkRowHeader = function(element) {
    if (element.tagName != 'BODY') {
      if (element.parentNode.tagName == 'TBODY') {
        return true;
      } else {
        element = element.parentNode;
        return checkRowHeader(element);
      }
    }
    return false;
  };
  var getTHFromTargetElement = function(element) {
    if (element.tagName != 'TABLE') {
      if (element.tagName == 'TH') {
        return element;
      } else {
        return getTHFromTargetElement(element.parentNode);
      }
    }
    return null;
  };
  var bindEvents = function() {
    var instance = this;
    var pressed;
    eventManager.addEventListener(instance.rootElement, 'mouseover', function(e) {
      if (checkRowHeader(e.target)) {
        var th = getTHFromTargetElement(e.target);
        if (th) {
          if (pressed) {
            endRow = instance.view.wt.wtTable.getCoords(th).row;
            refreshHandlePosition(th, endRow - startRow);
          } else {
            setupHandlePosition.call(instance, th);
          }
        }
      }
    });
    eventManager.addEventListener(instance.rootElement, 'mousedown', function(e) {
      if (hasClass(e.target, 'manualRowMover')) {
        startY = pageY(e);
        setupGuidePosition.call(instance);
        pressed = instance;
        startRow = currentRow;
        endRow = currentRow;
      }
    });
    eventManager.addEventListener(window, 'mousemove', function(e) {
      if (pressed) {
        refreshGuidePosition(pageY(e) - startY);
      }
    });
    eventManager.addEventListener(window, 'mouseup', function(e) {
      if (pressed) {
        hideHandleAndGuide();
        pressed = false;
        createPositionData(instance.manualRowPositions, instance.countRows());
        instance.manualRowPositions.splice(endRow, 0, instance.manualRowPositions.splice(startRow, 1)[0]);
        Handsontable.hooks.run(instance, 'beforeRowMove', startRow, endRow);
        instance.forceFullRender = true;
        instance.view.render();
        saveManualRowPositions.call(instance);
        Handsontable.hooks.run(instance, 'afterRowMove', startRow, endRow);
        setupHandlePosition.call(instance, currentTH);
      }
    });
    instance.addHook('afterDestroy', unbindEvents);
  };
  var unbindEvents = function() {
    eventManager.clear();
  };
  var createPositionData = function(positionArr, len) {
    if (positionArr.length < len) {
      for (var i = positionArr.length; i < len; i++) {
        positionArr[i] = i;
      }
    }
  };
  this.beforeInit = function() {
    this.manualRowPositions = [];
  };
  this.init = function(source) {
    var instance = this;
    var manualRowMoveEnabled = !!(instance.getSettings().manualRowMove);
    if (manualRowMoveEnabled) {
      var initialManualRowPositions = instance.getSettings().manualRowMove;
      var loadedManualRowPostions = loadManualRowPositions.call(instance);
      if (typeof instance.manualRowPositionsPluginUsages === 'undefined') {
        instance.manualRowPositionsPluginUsages = ['manualColumnMove'];
      } else {
        instance.manualRowPositionsPluginUsages.push('manualColumnMove');
      }
      if (typeof loadedManualRowPostions != 'undefined') {
        this.manualRowPositions = loadedManualRowPostions;
      } else if (Array.isArray(initialManualRowPositions)) {
        this.manualRowPositions = initialManualRowPositions;
      } else {
        this.manualRowPositions = [];
      }
      if (source === 'afterInit' || source === 'afterUpdateSettings' && eventManager.context.eventListeners.length === 0) {
        bindEvents.call(this);
        if (this.manualRowPositions.length > 0) {
          instance.forceFullRender = true;
          instance.render();
        }
      }
    } else {
      var pluginUsagesIndex = instance.manualRowPositionsPluginUsages ? instance.manualRowPositionsPluginUsages.indexOf('manualColumnMove') : -1;
      if (pluginUsagesIndex > -1) {
        unbindEvents.call(this);
        instance.manualRowPositions = [];
        instance.manualRowPositionsPluginUsages[pluginUsagesIndex] = void 0;
      }
    }
  };
  this.modifyRow = function(row) {
    var instance = this;
    if (instance.getSettings().manualRowMove) {
      if (typeof instance.manualRowPositions[row] === 'undefined') {
        createPositionData(this.manualRowPositions, row + 1);
      }
      return instance.manualRowPositions[row];
    }
    return row;
  };
}
var htManualRowMove = new ManualRowMove();
Handsontable.hooks.add('beforeInit', htManualRowMove.beforeInit);
Handsontable.hooks.add('afterInit', function() {
  htManualRowMove.init.call(this, 'afterInit');
});
Handsontable.hooks.add('afterUpdateSettings', function() {
  htManualRowMove.init.call(this, 'afterUpdateSettings');
});
Handsontable.hooks.add('modifyRow', htManualRowMove.modifyRow);
Handsontable.hooks.register('beforeRowMove');
Handsontable.hooks.register('afterRowMove');

//# 
},{"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"plugins":47}],65:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ManualRowResize: {get: function() {
      return ManualRowResize;
    }},
  __esModule: {value: true}
});
var $___46__46__47__95_base_46_js__,
    $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_plugins__;
var BasePlugin = ($___46__46__47__95_base_46_js__ = require("_base.js"), $___46__46__47__95_base_46_js__ && $___46__46__47__95_base_46_js__.__esModule && $___46__46__47__95_base_46_js__ || {default: $___46__46__47__95_base_46_js__}).default;
var $__1 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__1.addClass,
    hasClass = $__1.hasClass,
    removeClass = $__1.removeClass;
var eventManagerObject = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).eventManager;
var $__3 = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}),
    pageX = $__3.pageX,
    pageY = $__3.pageY;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var ManualRowResize = function ManualRowResize(hotInstance) {
  $traceurRuntime.superConstructor($ManualRowResize).call(this, hotInstance);
  this.currentTH = null;
  this.currentRow = null;
  this.currentHeight = null;
  this.newSize = null;
  this.startY = null;
  this.startHeight = null;
  this.startOffset = null;
  this.handle = document.createElement('DIV');
  this.guide = document.createElement('DIV');
  this.eventManager = eventManagerObject(this);
  this.pressed = null;
  this.dblclick = 0;
  this.autoresizeTimeout = null;
  this.manualRowHeights = [];
  addClass(this.handle, 'manualRowResizer');
  addClass(this.guide, 'manualRowResizerGuide');
};
var $ManualRowResize = ManualRowResize;
($traceurRuntime.createClass)(ManualRowResize, {
  isEnabled: function() {
    return this.hot.getSettings().manualRowResize;
  },
  enablePlugin: function() {
    var $__5 = this;
    if (this.enabled) {
      return;
    }
    this.manualRowHeights = [];
    var initialRowHeights = this.hot.getSettings().manualRowResize;
    var loadedManualRowHeights = this.loadManualRowHeights();
    if (typeof loadedManualRowHeights != 'undefined') {
      this.manualRowHeights = loadedManualRowHeights;
    } else if (Array.isArray(initialRowHeights)) {
      this.manualRowHeights = initialRowHeights;
    } else {
      this.manualRowHeights = [];
    }
    this.addHook('modifyRowHeight', (function(height, row) {
      return $__5.onModifyRowHeight(height, row);
    }));
    this.addHook('updateRowHeightAfterAddRow', (function(index, amount) {
      return $__5.updateRowHeightAfterAddRow(index, amount);
    }));
    this.addHook('updateRowHeightAfterRemoveRow', (function(index, amount) {
      return $__5.updateRowHeightAfterRemoveRow(index, amount);
    }));
    Handsontable.hooks.register('beforeRowResize');
    Handsontable.hooks.register('afterRowResize');
    this.bindEvents();
    $traceurRuntime.superGet(this, $ManualRowResize.prototype, "enablePlugin").call(this);
  },
  updatePlugin: function() {
    var initialRowHeights = this.hot.getSettings().manualRowResize;
    if (Array.isArray(initialRowHeights)) {
      this.manualRowHeights = initialRowHeights;
    } else {
      this.manualRowHeights = [];
    }
  },
  disablePlugin: function() {
    $traceurRuntime.superGet(this, $ManualRowResize.prototype, "disablePlugin").call(this);
  },
  saveManualRowHeights: function() {
    this.hot.runHooks('persistentStateSave', 'manualRowHeights', this.manualRowHeights);
  },
  loadManualRowHeights: function() {
    var storedState = {};
    this.hot.runHooks('persistentStateLoad', 'manualRowHeights', storedState);
    return storedState.value;
  },
  setupHandlePosition: function(TH) {
    this.currentTH = TH;
    var row = this.hot.view.wt.wtTable.getCoords(TH).row;
    if (row >= 0) {
      var box = this.currentTH.getBoundingClientRect();
      this.currentRow = row;
      this.startOffset = box.top - 6;
      this.startHeight = parseInt(box.height, 10);
      this.handle.style.left = box.left + 'px';
      this.handle.style.top = this.startOffset + this.startHeight + 'px';
      this.hot.rootElement.appendChild(this.handle);
    }
  },
  refreshHandlePosition: function() {
    this.handle.style.top = this.startOffset + this.currentHeight + 'px';
  },
  setupGuidePosition: function() {
    addClass(this.handle, 'active');
    addClass(this.guide, 'active');
    this.guide.style.top = this.handle.style.top;
    this.guide.style.left = this.handle.style.left;
    this.guide.style.width = this.hot.view.maximumVisibleElementWidth(0) + 'px';
    this.hot.rootElement.appendChild(this.guide);
  },
  refreshGuidePosition: function() {
    this.guide.style.top = this.handle.style.top;
  },
  hideHandleAndGuide: function() {
    removeClass(this.handle, 'active');
    removeClass(this.guide, 'active');
  },
  checkIfRowHeader: function(element) {
    if (element.tagName != 'BODY') {
      if (element.parentNode.tagName == 'TBODY') {
        return true;
      } else {
        element = element.parentNode;
        return this.checkIfRowHeader(element);
      }
    }
    return false;
  },
  getTHFromTargetElement: function(element) {
    if (element.tagName != 'TABLE') {
      if (element.tagName == 'TH') {
        return element;
      } else {
        return this.getTHFromTargetElement(element.parentNode);
      }
    }
    return null;
  },
  onMouseOver: function(event) {
    if (this.checkIfRowHeader(event.target)) {
      var th = this.getTHFromTargetElement(event.target);
      if (th) {
        if (!this.pressed) {
          this.setupHandlePosition(th);
        }
      }
    }
  },
  afterMouseDownTimeout: function() {
    if (this.dblclick >= 2) {
      var hookNewSize = this.hot.runHooks('beforeRowResize', this.currentRow, this.newSize, true);
      if (hookNewSize !== void 0) {
        this.newSize = hookNewSize;
      }
      this.setManualSize(this.currentRow, this.newSize);
      this.hot.forceFullRender = true;
      this.hot.view.render();
      this.hot.view.wt.wtOverlays.adjustElementsSize(true);
      this.hot.runHooks('afterRowResize', this.currentRow, this.newSize, true);
    }
    this.dblclick = 0;
    this.autoresizeTimeout = null;
  },
  onMouseDown: function(event) {
    var $__5 = this;
    if (hasClass(event.target, 'manualRowResizer')) {
      this.setupGuidePosition();
      this.pressed = this.hot;
      if (this.autoresizeTimeout == null) {
        this.autoresizeTimeout = setTimeout((function() {
          return $__5.afterMouseDownTimeout();
        }), 500);
        this.hot._registerTimeout(this.autoresizeTimeout);
      }
      this.dblclick++;
      this.startY = pageY(event);
      this.newSize = this.startHeight;
    }
  },
  onMouseMove: function(event) {
    if (this.pressed) {
      this.currentHeight = this.startHeight + (pageY(event) - this.startY);
      this.newSize = this.setManualSize(this.currentRow, this.currentHeight);
      this.refreshHandlePosition();
      this.refreshGuidePosition();
    }
  },
  onMouseUp: function(event) {
    if (this.pressed) {
      this.hideHandleAndGuide();
      this.pressed = false;
      if (this.newSize != this.startHeight) {
        this.hot.runHooks('beforeRowResize', this.currentRow, this.newSize);
        this.hot.forceFullRender = true;
        this.hot.view.render();
        this.hot.view.wt.wtOverlays.adjustElementsSize(true);
        this.saveManualRowHeights();
        this.hot.runHooks('afterRowResize', this.currentRow, this.newSize);
      }
      this.setupHandlePosition(this.currentTH);
    }
  },
  bindEvents: function() {
    var $__5 = this;
    this.eventManager.addEventListener(this.hot.rootElement, 'mouseover', (function(e) {
      return $__5.onMouseOver(e);
    }));
    this.eventManager.addEventListener(this.hot.rootElement, 'mousedown', (function(e) {
      return $__5.onMouseDown(e);
    }));
    this.eventManager.addEventListener(window, 'mousemove', (function(e) {
      return $__5.onMouseMove(e);
    }));
    this.eventManager.addEventListener(window, 'mouseup', (function(e) {
      return $__5.onMouseUp(e);
    }));
  },
  setManualSize: function(row, height) {
    row = this.hot.runHooks('modifyRow', row);
    this.manualRowHeights[row] = height;
    return height;
  },
  updateRowHeightAfterRemoveRow: function(index, amount) {
    if (this.manualRowHeights.length > index) {
      this.manualRowHeights.splice(index, amount);
    }
  },
  updateRowHeightAfterAddRow: function(index, amount) {
    if (this.manualRowHeights.length > index) {
      for (var i = 0; i < amount; i++) {
        this.manualRowHeights.splice(index, 0, undefined);
      }
    }
  },
  onModifyRowHeight: function(height, row) {
    if (this.enabled) {
      var autoRowSizePlugin = this.hot.getPlugin('autoRowSize');
      var autoRowHeightResult = autoRowSizePlugin ? autoRowSizePlugin.heights[row] : null;
      row = this.hot.runHooks('modifyRow', row);
      var manualRowHeight = this.manualRowHeights[row];
      if (manualRowHeight !== void 0 && (manualRowHeight === autoRowHeightResult || !autoRowSizePlugin || !autoRowSizePlugin.enabled)) {
        return manualRowHeight;
      }
    }
    return height;
  }
}, {}, BasePlugin);
;
registerPlugin('manualRowResize', ManualRowResize);

//# 
},{"_base.js":48,"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37,"plugins":47}],66:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  MergeCells: {get: function() {
      return MergeCells;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_plugins__,
    $___46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__,
    $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var stopImmediatePropagation = ($___46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_event__}).stopImmediatePropagation;
var WalkontableCellCoords = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ = require("3rdparty/walkontable/src/cell/range"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_cell_47_range__}).WalkontableCellRange;
var WalkontableTable = ($___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__ = require("3rdparty/walkontable/src/table"), $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__ && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__.__esModule && $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__ || {default: $___46__46__47__46__46__47_3rdparty_47_walkontable_47_src_47_table__}).WalkontableTable;
;
function CellInfoCollection() {
  var collection = [];
  collection.getInfo = function(row, col) {
    for (var i = 0,
        ilen = this.length; i < ilen; i++) {
      if (this[i].row <= row && this[i].row + this[i].rowspan - 1 >= row && this[i].col <= col && this[i].col + this[i].colspan - 1 >= col) {
        return this[i];
      }
    }
  };
  collection.setInfo = function(info) {
    for (var i = 0,
        ilen = this.length; i < ilen; i++) {
      if (this[i].row === info.row && this[i].col === info.col) {
        this[i] = info;
        return;
      }
    }
    this.push(info);
  };
  collection.removeInfo = function(row, col) {
    for (var i = 0,
        ilen = this.length; i < ilen; i++) {
      if (this[i].row === row && this[i].col === col) {
        this.splice(i, 1);
        break;
      }
    }
  };
  return collection;
}
function MergeCells(mergeCellsSetting) {
  this.mergedCellInfoCollection = new CellInfoCollection();
  if (Array.isArray(mergeCellsSetting)) {
    for (var i = 0,
        ilen = mergeCellsSetting.length; i < ilen; i++) {
      this.mergedCellInfoCollection.setInfo(mergeCellsSetting[i]);
    }
  }
}
MergeCells.prototype.canMergeRange = function(cellRange) {
  return !cellRange.isSingle();
};
MergeCells.prototype.mergeRange = function(cellRange) {
  if (!this.canMergeRange(cellRange)) {
    return;
  }
  var topLeft = cellRange.getTopLeftCorner();
  var bottomRight = cellRange.getBottomRightCorner();
  var mergeParent = {};
  mergeParent.row = topLeft.row;
  mergeParent.col = topLeft.col;
  mergeParent.rowspan = bottomRight.row - topLeft.row + 1;
  mergeParent.colspan = bottomRight.col - topLeft.col + 1;
  this.mergedCellInfoCollection.setInfo(mergeParent);
};
MergeCells.prototype.mergeOrUnmergeSelection = function(cellRange) {
  var info = this.mergedCellInfoCollection.getInfo(cellRange.from.row, cellRange.from.col);
  if (info) {
    this.unmergeSelection(cellRange.from);
  } else {
    this.mergeSelection(cellRange);
  }
};
MergeCells.prototype.mergeSelection = function(cellRange) {
  this.mergeRange(cellRange);
};
MergeCells.prototype.unmergeSelection = function(cellRange) {
  var info = this.mergedCellInfoCollection.getInfo(cellRange.row, cellRange.col);
  this.mergedCellInfoCollection.removeInfo(info.row, info.col);
};
MergeCells.prototype.applySpanProperties = function(TD, row, col) {
  var info = this.mergedCellInfoCollection.getInfo(row, col);
  if (info) {
    if (info.row === row && info.col === col) {
      TD.setAttribute('rowspan', info.rowspan);
      TD.setAttribute('colspan', info.colspan);
    } else {
      TD.removeAttribute('rowspan');
      TD.removeAttribute('colspan');
      TD.style.display = 'none';
    }
  } else {
    TD.removeAttribute('rowspan');
    TD.removeAttribute('colspan');
  }
};
MergeCells.prototype.modifyTransform = function(hook, currentSelectedRange, delta) {
  var sameRowspan = function(merged, coords) {
    if (coords.row >= merged.row && coords.row <= (merged.row + merged.rowspan - 1)) {
      return true;
    }
    return false;
  },
      sameColspan = function(merged, coords) {
        if (coords.col >= merged.col && coords.col <= (merged.col + merged.colspan - 1)) {
          return true;
        }
        return false;
      },
      getNextPosition = function(newDelta) {
        return new WalkontableCellCoords(currentSelectedRange.to.row + newDelta.row, currentSelectedRange.to.col + newDelta.col);
      };
  var newDelta = {
    row: delta.row,
    col: delta.col
  };
  if (hook == 'modifyTransformStart') {
    if (!this.lastDesiredCoords) {
      this.lastDesiredCoords = new WalkontableCellCoords(null, null);
    }
    var currentPosition = new WalkontableCellCoords(currentSelectedRange.highlight.row, currentSelectedRange.highlight.col),
        mergedParent = this.mergedCellInfoCollection.getInfo(currentPosition.row, currentPosition.col),
        currentRangeContainsMerge;
    for (var i = 0,
        mergesLength = this.mergedCellInfoCollection.length; i < mergesLength; i++) {
      var range = this.mergedCellInfoCollection[i];
      range = new WalkontableCellCoords(range.row + range.rowspan - 1, range.col + range.colspan - 1);
      if (currentSelectedRange.includes(range)) {
        currentRangeContainsMerge = true;
        break;
      }
    }
    if (mergedParent) {
      var mergeTopLeft = new WalkontableCellCoords(mergedParent.row, mergedParent.col),
          mergeBottomRight = new WalkontableCellCoords(mergedParent.row + mergedParent.rowspan - 1, mergedParent.col + mergedParent.colspan - 1),
          mergeRange = new WalkontableCellRange(mergeTopLeft, mergeTopLeft, mergeBottomRight);
      if (!mergeRange.includes(this.lastDesiredCoords)) {
        this.lastDesiredCoords = new WalkontableCellCoords(null, null);
      }
      newDelta.row = this.lastDesiredCoords.row ? this.lastDesiredCoords.row - currentPosition.row : newDelta.row;
      newDelta.col = this.lastDesiredCoords.col ? this.lastDesiredCoords.col - currentPosition.col : newDelta.col;
      if (delta.row > 0) {
        newDelta.row = mergedParent.row + mergedParent.rowspan - 1 - currentPosition.row + delta.row;
      } else if (delta.row < 0) {
        newDelta.row = currentPosition.row - mergedParent.row + delta.row;
      }
      if (delta.col > 0) {
        newDelta.col = mergedParent.col + mergedParent.colspan - 1 - currentPosition.col + delta.col;
      } else if (delta.col < 0) {
        newDelta.col = currentPosition.col - mergedParent.col + delta.col;
      }
    }
    var nextPosition = new WalkontableCellCoords(currentSelectedRange.highlight.row + newDelta.row, currentSelectedRange.highlight.col + newDelta.col),
        nextParentIsMerged = this.mergedCellInfoCollection.getInfo(nextPosition.row, nextPosition.col);
    if (nextParentIsMerged) {
      this.lastDesiredCoords = nextPosition;
      newDelta = {
        row: nextParentIsMerged.row - currentPosition.row,
        col: nextParentIsMerged.col - currentPosition.col
      };
    }
  } else if (hook == 'modifyTransformEnd') {
    for (var i = 0,
        mergesLength = this.mergedCellInfoCollection.length; i < mergesLength; i++) {
      var currentMerge = this.mergedCellInfoCollection[i],
          mergeTopLeft = new WalkontableCellCoords(currentMerge.row, currentMerge.col),
          mergeBottomRight = new WalkontableCellCoords(currentMerge.row + currentMerge.rowspan - 1, currentMerge.col + currentMerge.colspan - 1),
          mergedRange = new WalkontableCellRange(mergeTopLeft, mergeTopLeft, mergeBottomRight),
          sharedBorders = currentSelectedRange.getBordersSharedWith(mergedRange);
      if (mergedRange.isEqual(currentSelectedRange)) {
        currentSelectedRange.setDirection('NW-SE');
      } else if (sharedBorders.length > 0) {
        var mergeHighlighted = (currentSelectedRange.highlight.isEqual(mergedRange.from));
        if (sharedBorders.indexOf('top') > -1) {
          if (currentSelectedRange.to.isSouthEastOf(mergedRange.from) && mergeHighlighted) {
            currentSelectedRange.setDirection('NW-SE');
          } else if (currentSelectedRange.to.isSouthWestOf(mergedRange.from) && mergeHighlighted) {
            currentSelectedRange.setDirection('NE-SW');
          }
        } else if (sharedBorders.indexOf('bottom') > -1) {
          if (currentSelectedRange.to.isNorthEastOf(mergedRange.from) && mergeHighlighted) {
            currentSelectedRange.setDirection('SW-NE');
          } else if (currentSelectedRange.to.isNorthWestOf(mergedRange.from) && mergeHighlighted) {
            currentSelectedRange.setDirection('SE-NW');
          }
        }
      }
      var nextPosition = getNextPosition(newDelta),
          withinRowspan = sameRowspan(currentMerge, nextPosition),
          withinColspan = sameColspan(currentMerge, nextPosition);
      if (currentSelectedRange.includesRange(mergedRange) && (mergedRange.includes(nextPosition) || withinRowspan || withinColspan)) {
        if (withinRowspan) {
          if (newDelta.row < 0) {
            newDelta.row -= currentMerge.rowspan - 1;
          } else if (newDelta.row > 0) {
            newDelta.row += currentMerge.rowspan - 1;
          }
        }
        if (withinColspan) {
          if (newDelta.col < 0) {
            newDelta.col -= currentMerge.colspan - 1;
          } else if (newDelta.col > 0) {
            newDelta.col += currentMerge.colspan - 1;
          }
        }
      }
    }
  }
  if (newDelta.row !== 0) {
    delta.row = newDelta.row;
  }
  if (newDelta.col !== 0) {
    delta.col = newDelta.col;
  }
};
MergeCells.prototype.shiftCollection = function(direction, index, count) {
  var shiftVector = [0, 0];
  switch (direction) {
    case 'right':
      shiftVector[0] += 1;
      break;
    case 'left':
      shiftVector[0] -= 1;
      break;
    case 'down':
      shiftVector[1] += 1;
      break;
    case 'up':
      shiftVector[1] -= 1;
      break;
  }
  for (var i = 0; i < this.mergedCellInfoCollection.length; i++) {
    var currentMerge = this.mergedCellInfoCollection[i];
    if (direction === 'right' || direction === 'left') {
      if (index <= currentMerge.col) {
        currentMerge.col += shiftVector[0];
      }
    } else {
      if (index <= currentMerge.row) {
        currentMerge.row += shiftVector[1];
      }
    }
  }
};
var beforeInit = function() {
  var instance = this;
  var mergeCellsSetting = instance.getSettings().mergeCells;
  if (mergeCellsSetting) {
    if (!instance.mergeCells) {
      instance.mergeCells = new MergeCells(mergeCellsSetting);
    }
  }
};
var afterInit = function() {
  var instance = this;
  if (instance.mergeCells) {
    instance.view.wt.wtTable.getCell = function(coords) {
      if (instance.getSettings().mergeCells) {
        var mergeParent = instance.mergeCells.mergedCellInfoCollection.getInfo(coords.row, coords.col);
        if (mergeParent) {
          coords = mergeParent;
        }
      }
      return WalkontableTable.prototype.getCell.call(this, coords);
    };
  }
};
var afterUpdateSettings = function() {
  var instance = this;
  var mergeCellsSetting = instance.getSettings().mergeCells;
  if (mergeCellsSetting) {
    if (instance.mergeCells) {
      instance.mergeCells.mergedCellInfoCollection = new CellInfoCollection();
      if (Array.isArray(mergeCellsSetting)) {
        for (var i = 0,
            ilen = mergeCellsSetting.length; i < ilen; i++) {
          instance.mergeCells.mergedCellInfoCollection.setInfo(mergeCellsSetting[i]);
        }
      }
    } else {
      instance.mergeCells = new MergeCells(mergeCellsSetting);
    }
  } else {
    if (instance.mergeCells) {
      instance.mergeCells.mergedCellInfoCollection = new CellInfoCollection();
    }
  }
};
var onBeforeKeyDown = function(event) {
  if (!this.mergeCells) {
    return;
  }
  var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey;
  if (ctrlDown) {
    if (event.keyCode === 77) {
      this.mergeCells.mergeOrUnmergeSelection(this.getSelectedRange());
      this.render();
      stopImmediatePropagation(event);
    }
  }
};
var addMergeActionsToContextMenu = function(defaultOptions) {
  if (!this.getSettings().mergeCells) {
    return;
  }
  defaultOptions.items.push(Handsontable.plugins.ContextMenu.SEPARATOR);
  defaultOptions.items.push({
    key: 'mergeCells',
    name: function() {
      var sel = this.getSelected();
      var info = this.mergeCells.mergedCellInfoCollection.getInfo(sel[0], sel[1]);
      if (info) {
        return 'Unmerge cells';
      } else {
        return 'Merge cells';
      }
    },
    callback: function() {
      this.mergeCells.mergeOrUnmergeSelection(this.getSelectedRange());
      this.render();
    },
    disabled: function() {
      return false;
    }
  });
};
var afterRenderer = function(TD, row, col, prop, value, cellProperties) {
  if (this.mergeCells) {
    this.mergeCells.applySpanProperties(TD, row, col);
  }
};
var modifyTransformFactory = function(hook) {
  return function(delta) {
    var mergeCellsSetting = this.getSettings().mergeCells;
    if (mergeCellsSetting) {
      var currentSelectedRange = this.getSelectedRange();
      this.mergeCells.modifyTransform(hook, currentSelectedRange, delta);
      if (hook === 'modifyTransformEnd') {
        var totalRows = this.countRows();
        var totalCols = this.countCols();
        if (currentSelectedRange.from.row < 0) {
          currentSelectedRange.from.row = 0;
        } else if (currentSelectedRange.from.row > 0 && currentSelectedRange.from.row >= totalRows) {
          currentSelectedRange.from.row = currentSelectedRange.from - 1;
        }
        if (currentSelectedRange.from.col < 0) {
          currentSelectedRange.from.col = 0;
        } else if (currentSelectedRange.from.col > 0 && currentSelectedRange.from.col >= totalCols) {
          currentSelectedRange.from.col = totalCols - 1;
        }
      }
    }
  };
};
var beforeSetRangeEnd = function(coords) {
  this.lastDesiredCoords = null;
  var mergeCellsSetting = this.getSettings().mergeCells;
  if (mergeCellsSetting) {
    var selRange = this.getSelectedRange();
    selRange.highlight = new WalkontableCellCoords(selRange.highlight.row, selRange.highlight.col);
    selRange.to = coords;
    var rangeExpanded = false;
    do {
      rangeExpanded = false;
      for (var i = 0,
          ilen = this.mergeCells.mergedCellInfoCollection.length; i < ilen; i++) {
        var cellInfo = this.mergeCells.mergedCellInfoCollection[i];
        var mergedCellTopLeft = new WalkontableCellCoords(cellInfo.row, cellInfo.col);
        var mergedCellBottomRight = new WalkontableCellCoords(cellInfo.row + cellInfo.rowspan - 1, cellInfo.col + cellInfo.colspan - 1);
        var mergedCellRange = new WalkontableCellRange(mergedCellTopLeft, mergedCellTopLeft, mergedCellBottomRight);
        if (selRange.expandByRange(mergedCellRange)) {
          coords.row = selRange.to.row;
          coords.col = selRange.to.col;
          rangeExpanded = true;
        }
      }
    } while (rangeExpanded);
  }
};
var beforeDrawAreaBorders = function(corners, className) {
  if (className && className == 'area') {
    var mergeCellsSetting = this.getSettings().mergeCells;
    if (mergeCellsSetting) {
      var selRange = this.getSelectedRange();
      var startRange = new WalkontableCellRange(selRange.from, selRange.from, selRange.from);
      var stopRange = new WalkontableCellRange(selRange.to, selRange.to, selRange.to);
      for (var i = 0,
          ilen = this.mergeCells.mergedCellInfoCollection.length; i < ilen; i++) {
        var cellInfo = this.mergeCells.mergedCellInfoCollection[i];
        var mergedCellTopLeft = new WalkontableCellCoords(cellInfo.row, cellInfo.col);
        var mergedCellBottomRight = new WalkontableCellCoords(cellInfo.row + cellInfo.rowspan - 1, cellInfo.col + cellInfo.colspan - 1);
        var mergedCellRange = new WalkontableCellRange(mergedCellTopLeft, mergedCellTopLeft, mergedCellBottomRight);
        if (startRange.expandByRange(mergedCellRange)) {
          corners[0] = startRange.from.row;
          corners[1] = startRange.from.col;
        }
        if (stopRange.expandByRange(mergedCellRange)) {
          corners[2] = stopRange.from.row;
          corners[3] = stopRange.from.col;
        }
      }
    }
  }
};
var afterGetCellMeta = function(row, col, cellProperties) {
  var mergeCellsSetting = this.getSettings().mergeCells;
  if (mergeCellsSetting) {
    var mergeParent = this.mergeCells.mergedCellInfoCollection.getInfo(row, col);
    if (mergeParent && (mergeParent.row != row || mergeParent.col != col)) {
      cellProperties.copyable = false;
    }
  }
};
var afterViewportRowCalculatorOverride = function(calc) {
  var mergeCellsSetting = this.getSettings().mergeCells;
  if (mergeCellsSetting) {
    var colCount = this.countCols();
    var mergeParent;
    for (var c = 0; c < colCount; c++) {
      mergeParent = this.mergeCells.mergedCellInfoCollection.getInfo(calc.startRow, c);
      if (mergeParent) {
        if (mergeParent.row < calc.startRow) {
          calc.startRow = mergeParent.row;
          return afterViewportRowCalculatorOverride.call(this, calc);
        }
      }
      mergeParent = this.mergeCells.mergedCellInfoCollection.getInfo(calc.endRow, c);
      if (mergeParent) {
        var mergeEnd = mergeParent.row + mergeParent.rowspan - 1;
        if (mergeEnd > calc.endRow) {
          calc.endRow = mergeEnd;
          return afterViewportRowCalculatorOverride.call(this, calc);
        }
      }
    }
  }
};
var afterViewportColumnCalculatorOverride = function(calc) {
  var mergeCellsSetting = this.getSettings().mergeCells;
  if (mergeCellsSetting) {
    var rowCount = this.countRows();
    var mergeParent;
    for (var r = 0; r < rowCount; r++) {
      mergeParent = this.mergeCells.mergedCellInfoCollection.getInfo(r, calc.startColumn);
      if (mergeParent) {
        if (mergeParent.col < calc.startColumn) {
          calc.startColumn = mergeParent.col;
          return afterViewportColumnCalculatorOverride.call(this, calc);
        }
      }
      mergeParent = this.mergeCells.mergedCellInfoCollection.getInfo(r, calc.endColumn);
      if (mergeParent) {
        var mergeEnd = mergeParent.col + mergeParent.colspan - 1;
        if (mergeEnd > calc.endColumn) {
          calc.endColumn = mergeEnd;
          return afterViewportColumnCalculatorOverride.call(this, calc);
        }
      }
    }
  }
};
var isMultipleSelection = function(isMultiple) {
  if (isMultiple && this.mergeCells) {
    var mergedCells = this.mergeCells.mergedCellInfoCollection,
        selectionRange = this.getSelectedRange();
    for (var group in mergedCells) {
      if (selectionRange.highlight.row == mergedCells[group].row && selectionRange.highlight.col == mergedCells[group].col && selectionRange.to.row == mergedCells[group].row + mergedCells[group].rowspan - 1 && selectionRange.to.col == mergedCells[group].col + mergedCells[group].colspan - 1) {
        return false;
      }
    }
  }
  return isMultiple;
};
function afterAutofillApplyValues(select, drag) {
  var mergeCellsSetting = this.getSettings().mergeCells;
  if (!mergeCellsSetting || this.selection.isMultiple()) {
    return;
  }
  var info = this.mergeCells.mergedCellInfoCollection.getInfo(select[0], select[1]);
  if (info) {
    select[0] = info.row;
    select[1] = info.col;
    select[2] = info.row + info.rowspan - 1;
    select[3] = info.col + info.colspan - 1;
  }
}
function onAfterCreateCol(col, count) {
  if (this.mergeCells) {
    this.mergeCells.shiftCollection('right', col, count);
  }
}
function onAfterRemoveCol(col, count) {
  if (this.mergeCells) {
    this.mergeCells.shiftCollection('left', col, count);
  }
}
function onAfterCreateRow(row, count) {
  if (this.mergeCells) {
    this.mergeCells.shiftCollection('down', row, count);
  }
}
function onAfterRemoveRow(row, count) {
  if (this.mergeCells) {
    this.mergeCells.shiftCollection('up', row, count);
  }
}
Handsontable.hooks.add('beforeInit', beforeInit);
Handsontable.hooks.add('afterInit', afterInit);
Handsontable.hooks.add('afterUpdateSettings', afterUpdateSettings);
Handsontable.hooks.add('beforeKeyDown', onBeforeKeyDown);
Handsontable.hooks.add('modifyTransformStart', modifyTransformFactory('modifyTransformStart'));
Handsontable.hooks.add('modifyTransformEnd', modifyTransformFactory('modifyTransformEnd'));
Handsontable.hooks.add('beforeSetRangeEnd', beforeSetRangeEnd);
Handsontable.hooks.add('beforeDrawBorders', beforeDrawAreaBorders);
Handsontable.hooks.add('afterIsMultipleSelection', isMultipleSelection);
Handsontable.hooks.add('afterRenderer', afterRenderer);
Handsontable.hooks.add('afterContextMenuDefaultOptions', addMergeActionsToContextMenu);
Handsontable.hooks.add('afterGetCellMeta', afterGetCellMeta);
Handsontable.hooks.add('afterViewportRowCalculatorOverride', afterViewportRowCalculatorOverride);
Handsontable.hooks.add('afterViewportColumnCalculatorOverride', afterViewportColumnCalculatorOverride);
Handsontable.hooks.add('afterAutofillApplyValues', afterAutofillApplyValues);
Handsontable.hooks.add('afterCreateCol', onAfterCreateCol);
Handsontable.hooks.add('afterRemoveCol', onAfterRemoveCol);
Handsontable.hooks.add('afterCreateRow', onAfterCreateRow);
Handsontable.hooks.add('afterRemoveRow', onAfterRemoveRow);
Handsontable.MergeCells = MergeCells;

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"3rdparty/walkontable/src/cell/range":5,"3rdparty/walkontable/src/table":19,"helpers/dom/event":37,"plugins":47}],67:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  MultipleSelectionHandles: {get: function() {
      return MultipleSelectionHandles;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__95_base__,
    $___46__46__47__46__46__47_eventManager__,
    $___46__46__47__46__46__47_plugins__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getWindowScrollTop = $__0.getWindowScrollTop,
    hasClass = $__0.hasClass,
    getWindowScrollLeft = $__0.getWindowScrollLeft;
var BasePlugin = ($___46__46__47__95_base__ = require("_base"), $___46__46__47__95_base__ && $___46__46__47__95_base__.__esModule && $___46__46__47__95_base__ || {default: $___46__46__47__95_base__}).default;
var EventManager = ($___46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47_eventManager__}).EventManager;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var MultipleSelectionHandles = function MultipleSelectionHandles(hotInstance) {
  $traceurRuntime.superConstructor($MultipleSelectionHandles).call(this, hotInstance);
  this.dragged = [];
  this.eventManager = null;
  this.lastSetCell = null;
};
var $MultipleSelectionHandles = MultipleSelectionHandles;
($traceurRuntime.createClass)(MultipleSelectionHandles, {
  isEnabled: function() {
    return Handsontable.mobileBrowser;
  },
  enablePlugin: function() {
    if (this.enabled) {
      return;
    }
    if (!this.eventManager) {
      this.eventManager = new EventManager(this);
    }
    this.registerListeners();
    $traceurRuntime.superGet(this, $MultipleSelectionHandles.prototype, "enablePlugin").call(this);
  },
  registerListeners: function() {
    var _this = this;
    function removeFromDragged(query) {
      if (_this.dragged.length === 1) {
        _this.dragged.splice(0, _this.dragged.length);
        return true;
      }
      var entryPosition = _this.dragged.indexOf(query);
      if (entryPosition == -1) {
        return false;
      } else if (entryPosition === 0) {
        _this.dragged = _this.dragged.slice(0, 1);
      } else if (entryPosition == 1) {
        _this.dragged = _this.dragged.slice(-1);
      }
    }
    this.eventManager.addEventListener(this.hot.rootElement, 'touchstart', function(event) {
      var selectedRange;
      if (hasClass(event.target, 'topLeftSelectionHandle-HitArea')) {
        selectedRange = _this.hot.getSelectedRange();
        _this.dragged.push('topLeft');
        _this.touchStartRange = {
          width: selectedRange.getWidth(),
          height: selectedRange.getHeight(),
          direction: selectedRange.getDirection()
        };
        event.preventDefault();
        return false;
      } else if (hasClass(event.target, 'bottomRightSelectionHandle-HitArea')) {
        selectedRange = _this.hot.getSelectedRange();
        _this.dragged.push('bottomRight');
        _this.touchStartRange = {
          width: selectedRange.getWidth(),
          height: selectedRange.getHeight(),
          direction: selectedRange.getDirection()
        };
        event.preventDefault();
        return false;
      }
    });
    this.eventManager.addEventListener(this.hot.rootElement, 'touchend', function(event) {
      if (hasClass(event.target, 'topLeftSelectionHandle-HitArea')) {
        removeFromDragged.call(_this, 'topLeft');
        _this.touchStartRange = void 0;
        event.preventDefault();
        return false;
      } else if (hasClass(event.target, 'bottomRightSelectionHandle-HitArea')) {
        removeFromDragged.call(_this, 'bottomRight');
        _this.touchStartRange = void 0;
        event.preventDefault();
        return false;
      }
    });
    this.eventManager.addEventListener(this.hot.rootElement, 'touchmove', function(event) {
      var scrollTop = getWindowScrollTop(),
          scrollLeft = getWindowScrollLeft(),
          endTarget,
          targetCoords,
          selectedRange,
          rangeWidth,
          rangeHeight,
          rangeDirection,
          newRangeCoords;
      if (_this.dragged.length === 0) {
        return;
      }
      endTarget = document.elementFromPoint(event.touches[0].screenX - scrollLeft, event.touches[0].screenY - scrollTop);
      if (!endTarget || endTarget === _this.lastSetCell) {
        return;
      }
      if (endTarget.nodeName == 'TD' || endTarget.nodeName == 'TH') {
        targetCoords = _this.hot.getCoords(endTarget);
        if (targetCoords.col == -1) {
          targetCoords.col = 0;
        }
        selectedRange = _this.hot.getSelectedRange();
        rangeWidth = selectedRange.getWidth();
        rangeHeight = selectedRange.getHeight();
        rangeDirection = selectedRange.getDirection();
        if (rangeWidth == 1 && rangeHeight == 1) {
          _this.hot.selection.setRangeEnd(targetCoords);
        }
        newRangeCoords = _this.getCurrentRangeCoords(selectedRange, targetCoords, _this.touchStartRange.direction, rangeDirection, _this.dragged[0]);
        if (newRangeCoords.start !== null) {
          _this.hot.selection.setRangeStart(newRangeCoords.start);
        }
        _this.hot.selection.setRangeEnd(newRangeCoords.end);
        _this.lastSetCell = endTarget;
      }
      event.preventDefault();
    });
  },
  getCurrentRangeCoords: function(selectedRange, currentTouch, touchStartDirection, currentDirection, draggedHandle) {
    var topLeftCorner = selectedRange.getTopLeftCorner(),
        bottomRightCorner = selectedRange.getBottomRightCorner(),
        bottomLeftCorner = selectedRange.getBottomLeftCorner(),
        topRightCorner = selectedRange.getTopRightCorner();
    var newCoords = {
      start: null,
      end: null
    };
    switch (touchStartDirection) {
      case 'NE-SW':
        switch (currentDirection) {
          case 'NE-SW':
          case 'NW-SE':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: new WalkontableCellCoords(currentTouch.row, selectedRange.highlight.col),
                end: new WalkontableCellCoords(bottomLeftCorner.row, currentTouch.col)
              };
            } else {
              newCoords = {
                start: new WalkontableCellCoords(selectedRange.highlight.row, currentTouch.col),
                end: new WalkontableCellCoords(currentTouch.row, topLeftCorner.col)
              };
            }
            break;
          case 'SE-NW':
            if (draggedHandle == 'bottomRight') {
              newCoords = {
                start: new WalkontableCellCoords(bottomRightCorner.row, currentTouch.col),
                end: new WalkontableCellCoords(currentTouch.row, topLeftCorner.col)
              };
            }
            break;
        }
        break;
      case 'NW-SE':
        switch (currentDirection) {
          case 'NE-SW':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: currentTouch,
                end: bottomLeftCorner
              };
            } else {
              newCoords.end = currentTouch;
            }
            break;
          case 'NW-SE':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: currentTouch,
                end: bottomRightCorner
              };
            } else {
              newCoords.end = currentTouch;
            }
            break;
          case 'SE-NW':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: currentTouch,
                end: topLeftCorner
              };
            } else {
              newCoords.end = currentTouch;
            }
            break;
          case 'SW-NE':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: currentTouch,
                end: topRightCorner
              };
            } else {
              newCoords.end = currentTouch;
            }
            break;
        }
        break;
      case 'SW-NE':
        switch (currentDirection) {
          case 'NW-SE':
            if (draggedHandle == 'bottomRight') {
              newCoords = {
                start: new WalkontableCellCoords(currentTouch.row, topLeftCorner.col),
                end: new WalkontableCellCoords(bottomLeftCorner.row, currentTouch.col)
              };
            } else {
              newCoords = {
                start: new WalkontableCellCoords(topLeftCorner.row, currentTouch.col),
                end: new WalkontableCellCoords(currentTouch.row, bottomRightCorner.col)
              };
            }
            break;
          case 'SW-NE':
            if (draggedHandle == 'topLeft') {
              newCoords = {
                start: new WalkontableCellCoords(selectedRange.highlight.row, currentTouch.col),
                end: new WalkontableCellCoords(currentTouch.row, bottomRightCorner.col)
              };
            } else {
              newCoords = {
                start: new WalkontableCellCoords(currentTouch.row, topLeftCorner.col),
                end: new WalkontableCellCoords(topLeftCorner.row, currentTouch.col)
              };
            }
            break;
          case 'SE-NW':
            if (draggedHandle == 'bottomRight') {
              newCoords = {
                start: new WalkontableCellCoords(currentTouch.row, topRightCorner.col),
                end: new WalkontableCellCoords(topLeftCorner.row, currentTouch.col)
              };
            } else if (draggedHandle == 'topLeft') {
              newCoords = {
                start: bottomLeftCorner,
                end: currentTouch
              };
            }
            break;
        }
        break;
      case 'SE-NW':
        switch (currentDirection) {
          case 'NW-SE':
          case 'NE-SW':
          case 'SW-NE':
            if (draggedHandle == 'topLeft') {
              newCoords.end = currentTouch;
            }
            break;
          case 'SE-NW':
            if (draggedHandle == 'topLeft') {
              newCoords.end = currentTouch;
            } else {
              newCoords = {
                start: currentTouch,
                end: topLeftCorner
              };
            }
            break;
        }
        break;
    }
    return newCoords;
  },
  isDragged: function() {
    return this.dragged.length > 0;
  }
}, {}, BasePlugin);
;
registerPlugin('multipleSelectionHandles', MultipleSelectionHandles);

//# 
},{"_base":48,"eventManager":32,"helpers/dom/element":36,"plugins":47}],68:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  HandsontablePersistentState: {get: function() {
      return HandsontablePersistentState;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_plugins__;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
;
function Storage(prefix) {
  var savedKeys;
  var saveSavedKeys = function() {
    window.localStorage[prefix + '__' + 'persistentStateKeys'] = JSON.stringify(savedKeys);
  };
  var loadSavedKeys = function() {
    var keysJSON = window.localStorage[prefix + '__' + 'persistentStateKeys'];
    var keys = typeof keysJSON == 'string' ? JSON.parse(keysJSON) : void 0;
    savedKeys = keys ? keys : [];
  };
  var clearSavedKeys = function() {
    savedKeys = [];
    saveSavedKeys();
  };
  loadSavedKeys();
  this.saveValue = function(key, value) {
    window.localStorage[prefix + '_' + key] = JSON.stringify(value);
    if (savedKeys.indexOf(key) == -1) {
      savedKeys.push(key);
      saveSavedKeys();
    }
  };
  this.loadValue = function(key, defaultValue) {
    key = typeof key === 'undefined' ? defaultValue : key;
    var value = window.localStorage[prefix + '_' + key];
    return typeof value == 'undefined' ? void 0 : JSON.parse(value);
  };
  this.reset = function(key) {
    window.localStorage.removeItem(prefix + '_' + key);
  };
  this.resetAll = function() {
    for (var index = 0; index < savedKeys.length; index++) {
      window.localStorage.removeItem(prefix + '_' + savedKeys[index]);
    }
    clearSavedKeys();
  };
}
function HandsontablePersistentState() {
  var plugin = this;
  this.init = function() {
    var instance = this,
        pluginSettings = instance.getSettings().persistentState;
    plugin.enabled = !!(pluginSettings);
    if (!plugin.enabled) {
      removeHooks.call(instance);
      return;
    }
    if (!instance.storage) {
      instance.storage = new Storage(instance.rootElement.id);
    }
    instance.resetState = plugin.resetValue;
    addHooks.call(instance);
  };
  this.saveValue = function(key, value) {
    var instance = this;
    instance.storage.saveValue(key, value);
  };
  this.loadValue = function(key, saveTo) {
    var instance = this;
    saveTo.value = instance.storage.loadValue(key);
  };
  this.resetValue = function(key) {
    var instance = this;
    if (typeof key === 'undefined') {
      instance.storage.resetAll();
    } else {
      instance.storage.reset(key);
    }
  };
  var hooks = {
    persistentStateSave: plugin.saveValue,
    persistentStateLoad: plugin.loadValue,
    persistentStateReset: plugin.resetValue
  };
  for (var hookName in hooks) {
    if (hooks.hasOwnProperty(hookName)) {
      Handsontable.hooks.register(hookName);
    }
  }
  function addHooks() {
    var instance = this;
    for (var hookName in hooks) {
      if (hooks.hasOwnProperty(hookName)) {
        instance.addHook(hookName, hooks[hookName]);
      }
    }
  }
  function removeHooks() {
    var instance = this;
    for (var hookName in hooks) {
      if (hooks.hasOwnProperty(hookName)) {
        instance.removeHook(hookName, hooks[hookName]);
      }
    }
  }
}
var htPersistentState = new HandsontablePersistentState();
Handsontable.hooks.add('beforeInit', htPersistentState.init);
Handsontable.hooks.add('afterUpdateSettings', htPersistentState.init);

//# 
},{"plugins":47}],69:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  TouchScroll: {get: function() {
      return TouchScroll;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__95_base__,
    $___46__46__47__46__46__47_plugins__;
var $__0 = ($___46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    removeClass = $__0.removeClass;
var BasePlugin = ($___46__46__47__95_base__ = require("_base"), $___46__46__47__95_base__ && $___46__46__47__95_base__.__esModule && $___46__46__47__95_base__ || {default: $___46__46__47__95_base__}).default;
var registerPlugin = ($___46__46__47__46__46__47_plugins__ = require("plugins"), $___46__46__47__46__46__47_plugins__ && $___46__46__47__46__46__47_plugins__.__esModule && $___46__46__47__46__46__47_plugins__ || {default: $___46__46__47__46__46__47_plugins__}).registerPlugin;
var TouchScroll = function TouchScroll(hotInstance) {
  var $__3 = this;
  $traceurRuntime.superConstructor($TouchScroll).call(this, hotInstance);
  this.hot.addHook('afterInit', (function() {
    return $__3.afterInit();
  }));
  this.hot.addHook('afterUpdateSettings', (function() {
    return $__3.onAfterUpdateSettings();
  }));
  this.scrollbars = [];
  this.clones = [];
};
var $TouchScroll = TouchScroll;
($traceurRuntime.createClass)(TouchScroll, {
  afterInit: function() {
    this.registerEvents();
    this.onAfterUpdateSettings();
  },
  onAfterUpdateSettings: function() {
    var _this = this;
    this.hot.addHookOnce('afterRender', function() {
      var wtOverlays = _this.hot.view.wt.wtOverlays;
      _this.scrollbars = [];
      _this.scrollbars.push(wtOverlays.topOverlay);
      if (wtOverlays.bottomOverlay.clone) {
        _this.scrollbars.push(wtOverlays.bottomOverlay);
      }
      _this.scrollbars.push(wtOverlays.leftOverlay);
      if (wtOverlays.topLeftCornerOverlay) {
        _this.scrollbars.push(wtOverlays.topLeftCornerOverlay);
      }
      if (wtOverlays.bottomLeftCornerOverlay && wtOverlays.bottomLeftCornerOverlay.clone) {
        _this.scrollbars.push(wtOverlays.bottomLeftCornerOverlay);
      }
      _this.clones = [];
      if (wtOverlays.topOverlay.needFullRender) {
        _this.clones.push(wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
      }
      if (wtOverlays.bottomOverlay.needFullRender) {
        _this.clones.push(wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
      }
      if (wtOverlays.leftOverlay.needFullRender) {
        _this.clones.push(wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
      }
      if (wtOverlays.topLeftCornerOverlay) {
        _this.clones.push(wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
      }
      if (wtOverlays.bottomLeftCornerOverlay && wtOverlays.bottomLeftCornerOverlay.clone) {
        _this.clones.push(wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
      }
    });
  },
  registerEvents: function() {
    var $__3 = this;
    this.hot.addHook('beforeTouchScroll', (function() {
      return $__3.onBeforeTouchScroll();
    }));
    this.hot.addHook('afterMomentumScroll', (function() {
      return $__3.onAfterMomentumScroll();
    }));
  },
  onBeforeTouchScroll: function() {
    Handsontable.freezeOverlays = true;
    for (var i = 0,
        cloneCount = this.clones.length; i < cloneCount; i++) {
      addClass(this.clones[i], 'hide-tween');
    }
  },
  onAfterMomentumScroll: function() {
    Handsontable.freezeOverlays = false;
    var _that = this;
    for (var i = 0,
        cloneCount = this.clones.length; i < cloneCount; i++) {
      removeClass(this.clones[i], 'hide-tween');
    }
    for (var i$__5 = 0,
        cloneCount$__6 = this.clones.length; i$__5 < cloneCount$__6; i$__5++) {
      addClass(this.clones[i$__5], 'show-tween');
    }
    setTimeout(function() {
      for (var i = 0,
          cloneCount = _that.clones.length; i < cloneCount; i++) {
        removeClass(_that.clones[i], 'show-tween');
      }
    }, 400);
    for (var i$__7 = 0,
        cloneCount$__8 = this.scrollbars.length; i$__7 < cloneCount$__8; i$__7++) {
      this.scrollbars[i$__7].refresh();
      this.scrollbars[i$__7].resetFixedPosition();
    }
    this.hot.view.wt.wtOverlays.syncScrollWithMaster();
  }
}, {}, BasePlugin);
;
registerPlugin('touchScroll', TouchScroll);

//# 
},{"_base":48,"helpers/dom/element":36,"plugins":47}],70:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  registerRenderer: {get: function() {
      return registerRenderer;
    }},
  getRenderer: {get: function() {
      return getRenderer;
    }},
  hasRenderer: {get: function() {
      return hasRenderer;
    }},
  __esModule: {value: true}
});
var $__helpers_47_string__;
var toUpperCaseFirst = ($__helpers_47_string__ = require("helpers/string"), $__helpers_47_string__ && $__helpers_47_string__.__esModule && $__helpers_47_string__ || {default: $__helpers_47_string__}).toUpperCaseFirst;
var registeredRenderers = {};
Handsontable.renderers = Handsontable.renderers || {};
Handsontable.renderers.registerRenderer = registerRenderer;
Handsontable.renderers.getRenderer = getRenderer;
function registerRenderer(rendererName, rendererFunction) {
  var registerName;
  registeredRenderers[rendererName] = rendererFunction;
  registerName = toUpperCaseFirst(rendererName) + 'Renderer';
  Handsontable.renderers[registerName] = rendererFunction;
  Handsontable[registerName] = rendererFunction;
}
function getRenderer(rendererName) {
  if (typeof rendererName == 'function') {
    return rendererName;
  }
  if (typeof rendererName != 'string') {
    throw Error('Only strings and functions can be passed as "renderer" parameter');
  }
  if (!(rendererName in registeredRenderers)) {
    throw Error('No editor registered under name "' + rendererName + '"');
  }
  return registeredRenderers[rendererName];
}
function hasRenderer(rendererName) {
  return rendererName in registeredRenderers;
}
;

//# 
},{"helpers/string":43}],71:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  cellDecorator: {get: function() {
      return cellDecorator;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_dom_47_element__,
    $___46__46__47_renderers__;
var $__0 = ($___46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47_helpers_47_dom_47_element__ && $___46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47_helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    removeClass = $__0.removeClass;
var registerRenderer = ($___46__46__47_renderers__ = require("renderers"), $___46__46__47_renderers__ && $___46__46__47_renderers__.__esModule && $___46__46__47_renderers__ || {default: $___46__46__47_renderers__}).registerRenderer;
;
registerRenderer('base', cellDecorator);
Handsontable.renderers.cellDecorator = cellDecorator;
function cellDecorator(instance, TD, row, col, prop, value, cellProperties) {
  if (cellProperties.className) {
    if (TD.className) {
      TD.className = TD.className + ' ' + cellProperties.className;
    } else {
      TD.className = cellProperties.className;
    }
  }
  if (cellProperties.readOnly) {
    addClass(TD, cellProperties.readOnlyCellClassName);
  }
  if (cellProperties.valid === false && cellProperties.invalidCellClassName) {
    addClass(TD, cellProperties.invalidCellClassName);
  } else {
    removeClass(TD, cellProperties.invalidCellClassName);
  }
  if (cellProperties.wordWrap === false && cellProperties.noWordWrapClassName) {
    addClass(TD, cellProperties.noWordWrapClassName);
  }
  if (!value && cellProperties.placeholder) {
    addClass(TD, cellProperties.placeholderCellClassName);
  }
}

//# 
},{"helpers/dom/element":36,"renderers":70}],72:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  textRenderer: {get: function() {
      return textRenderer;
    }},
  __esModule: {value: true}
});
var $___46__46__47_helpers_47_dom_47_element__,
    $___46__46__47_helpers_47_mixed__,
    $___46__46__47_renderers__;
var $__0 = ($___46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47_helpers_47_dom_47_element__ && $___46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47_helpers_47_dom_47_element__}),
    empty = $__0.empty,
    fastInnerText = $__0.fastInnerText;
var stringify = ($___46__46__47_helpers_47_mixed__ = require("helpers/mixed"), $___46__46__47_helpers_47_mixed__ && $___46__46__47_helpers_47_mixed__.__esModule && $___46__46__47_helpers_47_mixed__ || {default: $___46__46__47_helpers_47_mixed__}).stringify;
var $__2 = ($___46__46__47_renderers__ = require("renderers"), $___46__46__47_renderers__ && $___46__46__47_renderers__.__esModule && $___46__46__47_renderers__ || {default: $___46__46__47_renderers__}),
    getRenderer = $__2.getRenderer,
    registerRenderer = $__2.registerRenderer;
function textRenderer(instance, TD, row, col, prop, value, cellProperties) {
  getRenderer('base').apply(this, arguments);
  if (!value && cellProperties.placeholder) {
    value = cellProperties.placeholder;
  }
  var escaped = stringify(value);
  if (!instance.getSettings().trimWhitespace) {
    escaped = escaped.replace(/ /g, String.fromCharCode(160));
  }
  if (cellProperties.rendererTemplate) {
    empty(TD);
    var TEMPLATE = document.createElement('TEMPLATE');
    TEMPLATE.setAttribute('bind', '{{}}');
    TEMPLATE.innerHTML = cellProperties.rendererTemplate;
    HTMLTemplateElement.decorate(TEMPLATE);
    TEMPLATE.model = instance.getSourceDataAtRow(row);
    TD.appendChild(TEMPLATE);
  } else {
    fastInnerText(TD, escaped);
  }
}
;
registerRenderer('text', textRenderer);

//# 
},{"helpers/dom/element":36,"helpers/mixed":39,"renderers":70}],73:[function(require,module,exports){
"use strict";
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function isPrivateName(s) {
    return privateNames[s];
  }
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isShimSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isShimSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  freeze(SymbolValue.prototype);
  function isSymbolString(s) {
    return symbolValues[s] || privateNames[s];
  }
  function toProperty(name) {
    if (isShimSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function removeSymbolKeys(array) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
      if (!isSymbolString(array[i])) {
        rv.push(array[i]);
      }
    }
    return rv;
  }
  function getOwnPropertyNames(object) {
    return removeSymbolKeys($getOwnPropertyNames(object));
  }
  function keys(object) {
    return removeSymbolKeys($keys(object));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol) {
        rv.push(symbol);
      }
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function defineProperty(object, name, descriptor) {
    if (isShimSymbol(name)) {
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    $defineProperty(Object, 'keys', {value: keys});
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (isSymbolString(name))
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function polyfillSymbol(global, Symbol) {
    if (!global.Symbol) {
      global.Symbol = Symbol;
      Object.getOwnPropertySymbols = getOwnPropertySymbols;
    }
    if (!global.Symbol.iterator) {
      global.Symbol.iterator = Symbol('Symbol.iterator');
    }
  }
  function setupGlobals(global) {
    polyfillSymbol(global, Symbol);
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    checkObjectCoercible: checkObjectCoercible,
    createPrivateName: createPrivateName,
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    isObject: isObject,
    isPrivateName: isPrivateName,
    isSymbolString: isSymbolString,
    keys: $keys,
    setupGlobals: setupGlobals,
    toObject: toObject,
    toProperty: toProperty,
    typeof: typeOf
  };
})(window);
(function() {
  'use strict';
  var $toProperty = $traceurRuntime.toProperty;
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getPrototypeOf = Object.getPrototypeOf;
  var $toProperty = $traceurRuntime.toProperty;
  var $__0 = Object,
      getOwnPropertyNames = $__0.getOwnPropertyNames,
      getOwnPropertySymbols = $__0.getOwnPropertySymbols;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  function getDescriptors(object) {
    var descriptors = {};
    var names = getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    var symbols = getOwnPropertySymbols(object);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      descriptors[$toProperty(symbol)] = $getOwnPropertyDescriptor(object, $toProperty(symbol));
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();

//# 
},{}],74:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  TableView: {get: function() {
      return TableView;
    }},
  __esModule: {value: true}
});
var $__helpers_47_dom_47_element__,
    $__eventManager__,
    $__helpers_47_dom_47_event__,
    $__3rdparty_47_walkontable_47_src_47_cell_47_coords__,
    $__3rdparty_47_walkontable_47_src_47_selection__,
    $__3rdparty_47_walkontable_47_src_47_core__;
var $__0 = ($__helpers_47_dom_47_element__ = require("helpers/dom/element"), $__helpers_47_dom_47_element__ && $__helpers_47_dom_47_element__.__esModule && $__helpers_47_dom_47_element__ || {default: $__helpers_47_dom_47_element__}),
    addClass = $__0.addClass,
    empty = $__0.empty,
    fastInnerHTML = $__0.fastInnerHTML,
    fastInnerText = $__0.fastInnerText,
    getScrollbarWidth = $__0.getScrollbarWidth,
    hasClass = $__0.hasClass,
    isChildOf = $__0.isChildOf,
    isInput = $__0.isInput,
    isOutsideInput = $__0.isOutsideInput;
var eventManagerObject = ($__eventManager__ = require("eventManager"), $__eventManager__ && $__eventManager__.__esModule && $__eventManager__ || {default: $__eventManager__}).eventManager;
var $__2 = ($__helpers_47_dom_47_event__ = require("helpers/dom/event"), $__helpers_47_dom_47_event__ && $__helpers_47_dom_47_event__.__esModule && $__helpers_47_dom_47_event__ || {default: $__helpers_47_dom_47_event__}),
    stopPropagation = $__2.stopPropagation,
    isImmediatePropagationStopped = $__2.isImmediatePropagationStopped;
var WalkontableCellCoords = ($__3rdparty_47_walkontable_47_src_47_cell_47_coords__ = require("3rdparty/walkontable/src/cell/coords"), $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__.__esModule && $__3rdparty_47_walkontable_47_src_47_cell_47_coords__ || {default: $__3rdparty_47_walkontable_47_src_47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableSelection = ($__3rdparty_47_walkontable_47_src_47_selection__ = require("3rdparty/walkontable/src/selection"), $__3rdparty_47_walkontable_47_src_47_selection__ && $__3rdparty_47_walkontable_47_src_47_selection__.__esModule && $__3rdparty_47_walkontable_47_src_47_selection__ || {default: $__3rdparty_47_walkontable_47_src_47_selection__}).WalkontableSelection;
var Walkontable = ($__3rdparty_47_walkontable_47_src_47_core__ = require("3rdparty/walkontable/src/core"), $__3rdparty_47_walkontable_47_src_47_core__ && $__3rdparty_47_walkontable_47_src_47_core__.__esModule && $__3rdparty_47_walkontable_47_src_47_core__ || {default: $__3rdparty_47_walkontable_47_src_47_core__}).Walkontable;
Handsontable.TableView = TableView;
function TableView(instance) {
  var that = this;
  this.eventManager = eventManagerObject(instance);
  this.instance = instance;
  this.settings = instance.getSettings();
  var originalStyle = instance.rootElement.getAttribute('style');
  if (originalStyle) {
    instance.rootElement.setAttribute('data-originalstyle', originalStyle);
  }
  addClass(instance.rootElement, 'handsontable');
  var table = document.createElement('TABLE');
  addClass(table, 'htCore');
  if (instance.getSettings().tableClassName) {
    addClass(table, instance.getSettings().tableClassName);
  }
  this.THEAD = document.createElement('THEAD');
  table.appendChild(this.THEAD);
  this.TBODY = document.createElement('TBODY');
  table.appendChild(this.TBODY);
  instance.table = table;
  instance.container.insertBefore(table, instance.container.firstChild);
  this.eventManager.addEventListener(instance.rootElement, 'mousedown', function(event) {
    if (!that.isTextSelectionAllowed(event.target)) {
      clearTextSelection();
      event.preventDefault();
      window.focus();
    }
  });
  this.eventManager.addEventListener(document.documentElement, 'keyup', function(event) {
    if (instance.selection.isInProgress() && !event.shiftKey) {
      instance.selection.finish();
    }
  });
  var isMouseDown;
  this.isMouseDown = function() {
    return isMouseDown;
  };
  this.eventManager.addEventListener(document.documentElement, 'mouseup', function(event) {
    if (instance.selection.isInProgress() && event.which === 1) {
      instance.selection.finish();
    }
    isMouseDown = false;
    if (isOutsideInput(document.activeElement)) {
      instance.unlisten();
    }
  });
  this.eventManager.addEventListener(document.documentElement, 'mousedown', function(event) {
    var next = event.target;
    var eventX = event.x || event.clientX;
    var eventY = event.y || event.clientY;
    if (isMouseDown || !instance.rootElement || (that.settings.outsideClickIgnore && that.settings.outsideClickIgnore(event))) {
      return;
    }
    if (next === instance.view.wt.wtTable.holder) {
      var scrollbarWidth = getScrollbarWidth();
      if (document.elementFromPoint(eventX + scrollbarWidth, eventY) !== instance.view.wt.wtTable.holder || document.elementFromPoint(eventX, eventY + scrollbarWidth) !== instance.view.wt.wtTable.holder) {
        return;
      }
    } else {
      while (next !== document.documentElement) {
        if (next === null) {
          if (event.isTargetWebComponent) {
            break;
          }
          return;
        }
        if (next === instance.rootElement) {
          return;
        }
        next = next.parentNode;
      }
    }
    if (that.settings.outsideClickDeselects) {
      instance.deselectCell();
    } else {
      instance.destroyEditor();
    }
  });
  this.eventManager.addEventListener(table, 'selectstart', function(event) {
    if (that.settings.fragmentSelection) {
      return;
    }
    event.preventDefault();
  });
  var clearTextSelection = function() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      document.selection.empty();
    }
  };
  var selections = [new WalkontableSelection({
    className: 'current',
    border: {
      width: 2,
      color: '#5292F7',
      cornerVisible: function() {
        return that.settings.fillHandle && !that.isCellEdited() && !instance.selection.isMultiple();
      },
      multipleSelectionHandlesVisible: function() {
        return !that.isCellEdited() && !instance.selection.isMultiple();
      }
    }
  }), new WalkontableSelection({
    className: 'area',
    border: {
      width: 1,
      color: '#89AFF9',
      cornerVisible: function() {
        return that.settings.fillHandle && !that.isCellEdited() && instance.selection.isMultiple();
      },
      multipleSelectionHandlesVisible: function() {
        return !that.isCellEdited() && instance.selection.isMultiple();
      }
    }
  }), new WalkontableSelection({
    className: 'highlight',
    highlightRowClassName: that.settings.currentRowClassName,
    highlightColumnClassName: that.settings.currentColClassName
  }), new WalkontableSelection({
    className: 'fill',
    border: {
      width: 1,
      color: 'red'
    }
  })];
  selections.current = selections[0];
  selections.area = selections[1];
  selections.highlight = selections[2];
  selections.fill = selections[3];
  var walkontableConfig = {
    debug: function() {
      return that.settings.debug;
    },
    externalRowCalculator: this.instance.getPlugin('autoRowSize') && this.instance.getPlugin('autoRowSize').isEnabled(),
    table: table,
    stretchH: this.settings.stretchH,
    data: instance.getDataAtCell,
    totalRows: instance.countRows,
    totalColumns: instance.countCols,
    fixedColumnsLeft: function() {
      return that.settings.fixedColumnsLeft;
    },
    fixedRowsTop: function() {
      return that.settings.fixedRowsTop;
    },
    fixedRowsBottom: function() {
      return that.settings.fixedRowsBottom;
    },
    minSpareRows: function() {
      return that.settings.minSpareRows;
    },
    renderAllRows: that.settings.renderAllRows,
    rowHeaders: function() {
      var arr = [];
      if (instance.hasRowHeaders()) {
        arr.push(function(index, TH) {
          that.appendRowHeader(index, TH);
        });
      }
      Handsontable.hooks.run(instance, 'afterGetRowHeaderRenderers', arr);
      return arr;
    },
    columnHeaders: function() {
      var arr = [];
      if (instance.hasColHeaders()) {
        arr.push(function(index, TH) {
          that.appendColHeader(index, TH);
        });
      }
      Handsontable.hooks.run(instance, 'afterGetColumnHeaderRenderers', arr);
      return arr;
    },
    columnWidth: instance.getColWidth,
    rowHeight: instance.getRowHeight,
    cellRenderer: function(row, col, TD) {
      var prop = that.instance.colToProp(col),
          cellProperties = that.instance.getCellMeta(row, col),
          renderer = that.instance.getCellRenderer(cellProperties);
      var value = that.instance.getDataAtRowProp(row, prop);
      renderer(that.instance, TD, row, col, prop, value, cellProperties);
      Handsontable.hooks.run(that.instance, 'afterRenderer', TD, row, col, prop, value, cellProperties);
    },
    selections: selections,
    hideBorderOnMouseDownOver: function() {
      return that.settings.fragmentSelection;
    },
    onCellMouseDown: function(event, coords, TD, wt) {
      var colspanOffset;
      var TR = TD.parentNode;
      var THEAD = TR.parentNode;
      var headerLevel;
      var headerColspan;
      instance.listen();
      that.activeWt = wt;
      isMouseDown = true;
      Handsontable.hooks.run(instance, 'beforeOnCellMouseDown', event, coords, TD);
      instance.selection.setSelectedHeaders(false, false);
      if (!isImmediatePropagationStopped(event)) {
        if (event.button === 2 && instance.selection.inInSelection(coords)) {
          var nothing = 1;
        } else if (event.shiftKey) {
          if (coords.row >= 0 && coords.col >= 0) {
            instance.selection.setRangeEnd(coords);
          }
        } else {
          if ((coords.row < 0 || coords.col < 0) && (coords.row >= 0 || coords.col >= 0)) {
            if (coords.row < 0) {
              headerLevel = THEAD.childNodes.length - Array.prototype.indexOf.call(THEAD.childNodes, TR) - 1;
              headerColspan = instance.getHeaderColspan(coords.col, headerLevel);
              instance.selection.setSelectedHeaders(false, true);
              instance.selectCell(0, coords.col, instance.countRows() - 1, coords.col + Math.max(0, headerColspan - 1));
            }
            if (coords.col < 0) {
              instance.selection.setSelectedHeaders(true, false);
              instance.selectCell(coords.row, 0, coords.row, instance.countCols() - 1);
            }
          } else {
            coords.row = coords.row < 0 ? 0 : coords.row;
            coords.col = coords.col < 0 ? 0 : coords.col;
            instance.selection.setRangeStart(coords);
          }
        }
        Handsontable.hooks.run(instance, 'afterOnCellMouseDown', event, coords, TD);
        that.activeWt = that.wt;
      }
    },
    onCellMouseOver: function(event, coords, TD, wt) {
      that.activeWt = wt;
      if (coords.row >= 0 && coords.col >= 0) {
        if (isMouseDown) {
          instance.selection.setRangeEnd(coords);
        }
      } else {
        if (isMouseDown) {
          if (coords.row < 0) {
            if (instance.selection.selectedHeader.cols) {
              instance.selection.setRangeEnd(new WalkontableCellCoords(instance.countRows() - 1, coords.col));
              instance.selection.setSelectedHeaders(false, true);
            } else {
              instance.selection.setRangeEnd(new WalkontableCellCoords(coords.row, coords.col));
            }
          }
          if (coords.col < 0) {
            if (instance.selection.selectedHeader.rows) {
              instance.selection.setRangeEnd(new WalkontableCellCoords(coords.row, instance.countCols() - 1));
              instance.selection.setSelectedHeaders(true, false);
            } else {
              instance.selection.setRangeEnd(new WalkontableCellCoords(coords.row, coords.col));
            }
          }
        }
      }
      Handsontable.hooks.run(instance, 'afterOnCellMouseOver', event, coords, TD);
      that.activeWt = that.wt;
    },
    onCellCornerMouseDown: function(event) {
      event.preventDefault();
      Handsontable.hooks.run(instance, 'afterOnCellCornerMouseDown', event);
    },
    beforeDraw: function(force) {
      that.beforeRender(force);
    },
    onDraw: function(force) {
      that.onDraw(force);
    },
    onScrollVertically: function() {
      instance.runHooks('afterScrollVertically');
    },
    onScrollHorizontally: function() {
      instance.runHooks('afterScrollHorizontally');
    },
    onBeforeDrawBorders: function(corners, borderClassName) {
      instance.runHooks('beforeDrawBorders', corners, borderClassName);
    },
    onBeforeTouchScroll: function() {
      instance.runHooks('beforeTouchScroll');
    },
    onAfterMomentumScroll: function() {
      instance.runHooks('afterMomentumScroll');
    },
    viewportRowCalculatorOverride: function(calc) {
      var rows = instance.countRows();
      var viewportOffset = that.settings.viewportRowRenderingOffset;
      if (viewportOffset === 'auto' && that.settings.fixedRowsTop) {
        viewportOffset = 10;
      }
      if (typeof viewportOffset === 'number') {
        calc.startRow = Math.max(calc.startRow - viewportOffset, 0);
        calc.endRow = Math.min(calc.endRow + viewportOffset, rows - 1);
      }
      if (viewportOffset === 'auto') {
        var center = calc.startRow + calc.endRow - calc.startRow;
        var offset = Math.ceil(center / rows * 12);
        calc.startRow = Math.max(calc.startRow - offset, 0);
        calc.endRow = Math.min(calc.endRow + offset, rows - 1);
      }
      instance.runHooks('afterViewportRowCalculatorOverride', calc);
    },
    viewportColumnCalculatorOverride: function(calc) {
      var cols = instance.countCols();
      var viewportOffset = that.settings.viewportColumnRenderingOffset;
      if (viewportOffset === 'auto' && that.settings.fixedColumnsLeft) {
        viewportOffset = 10;
      }
      if (typeof viewportOffset === 'number') {
        calc.startColumn = Math.max(calc.startColumn - viewportOffset, 0);
        calc.endColumn = Math.min(calc.endColumn + viewportOffset, cols - 1);
      }
      if (viewportOffset === 'auto') {
        var center = calc.startColumn + calc.endColumn - calc.startColumn;
        var offset = Math.ceil(center / cols * 12);
        calc.startRow = Math.max(calc.startColumn - offset, 0);
        calc.endColumn = Math.min(calc.endColumn + offset, cols - 1);
      }
      instance.runHooks('afterViewportColumnCalculatorOverride', calc);
    }
  };
  Handsontable.hooks.run(instance, 'beforeInitWalkontable', walkontableConfig);
  this.wt = new Walkontable(walkontableConfig);
  this.activeWt = this.wt;
  this.eventManager.addEventListener(that.wt.wtTable.spreader, 'mousedown', function(event) {
    if (event.target === that.wt.wtTable.spreader && event.which === 3) {
      stopPropagation(event);
    }
  });
  this.eventManager.addEventListener(that.wt.wtTable.spreader, 'contextmenu', function(event) {
    if (event.target === that.wt.wtTable.spreader && event.which === 3) {
      stopPropagation(event);
    }
  });
  this.eventManager.addEventListener(document.documentElement, 'click', function() {
    if (that.settings.observeDOMVisibility) {
      if (that.wt.drawInterrupted) {
        that.instance.forceFullRender = true;
        that.render();
      }
    }
  });
}
TableView.prototype.isTextSelectionAllowed = function(el) {
  if (isInput(el)) {
    return true;
  }
  if (this.settings.fragmentSelection && isChildOf(el, this.TBODY)) {
    return true;
  }
  return false;
};
TableView.prototype.isCellEdited = function() {
  var activeEditor = this.instance.getActiveEditor();
  return activeEditor && activeEditor.isOpened();
};
TableView.prototype.beforeRender = function(force) {
  if (force) {
    Handsontable.hooks.run(this.instance, 'beforeRender', this.instance.forceFullRender);
  }
};
TableView.prototype.onDraw = function(force) {
  if (force) {
    Handsontable.hooks.run(this.instance, 'afterRender', this.instance.forceFullRender);
  }
};
TableView.prototype.render = function() {
  this.wt.draw(!this.instance.forceFullRender);
  this.instance.forceFullRender = false;
  this.instance.renderCall = false;
};
TableView.prototype.getCellAtCoords = function(coords, topmost) {
  var td = this.wt.getCell(coords, topmost);
  if (td < 0) {
    return null;
  } else {
    return td;
  }
};
TableView.prototype.scrollViewport = function(coords) {
  this.wt.scrollViewport(coords);
};
TableView.prototype.appendRowHeader = function(row, TH) {
  if (TH.firstChild) {
    var container = TH.firstChild;
    if (!hasClass(container, 'relative')) {
      empty(TH);
      this.appendRowHeader(row, TH);
      return;
    }
    this.updateCellHeader(container.querySelector('.rowHeader'), row, this.instance.getRowHeader);
  } else {
    var div = document.createElement('div');
    var span = document.createElement('span');
    div.className = 'relative';
    span.className = 'rowHeader';
    this.updateCellHeader(span, row, this.instance.getRowHeader);
    div.appendChild(span);
    TH.appendChild(div);
  }
  Handsontable.hooks.run(this.instance, 'afterGetRowHeader', row, TH);
};
TableView.prototype.appendColHeader = function(col, TH) {
  if (TH.firstChild) {
    var container = TH.firstChild;
    if (!hasClass(container, 'relative')) {
      empty(TH);
      this.appendRowHeader(col, TH);
      return;
    }
    this.updateCellHeader(container.querySelector('.colHeader'), col, this.instance.getColHeader);
  } else {
    var div = document.createElement('div');
    var span = document.createElement('span');
    div.className = 'relative';
    span.className = 'colHeader';
    this.updateCellHeader(span, col, this.instance.getColHeader);
    div.appendChild(span);
    TH.appendChild(div);
  }
  Handsontable.hooks.run(this.instance, 'afterGetColHeader', col, TH);
};
TableView.prototype.updateCellHeader = function(element, index, content) {
  if (index > -1) {
    fastInnerHTML(element, content(index));
  } else {
    fastInnerText(element, String.fromCharCode(160));
    addClass(element, 'cornerHeader');
  }
};
TableView.prototype.maximumVisibleElementWidth = function(leftOffset) {
  var workspaceWidth = this.wt.wtViewport.getWorkspaceWidth();
  var maxWidth = workspaceWidth - leftOffset;
  return maxWidth > 0 ? maxWidth : 0;
};
TableView.prototype.maximumVisibleElementHeight = function(topOffset) {
  var workspaceHeight = this.wt.wtViewport.getWorkspaceHeight();
  var maxHeight = workspaceHeight - topOffset;
  return maxHeight > 0 ? maxHeight : 0;
};
TableView.prototype.mainViewIsActive = function() {
  return this.wt === this.activeWt;
};
TableView.prototype.destroy = function() {
  this.wt.destroy();
  this.eventManager.destroy();
};
;

//# 
},{"3rdparty/walkontable/src/cell/coords":4,"3rdparty/walkontable/src/core":6,"3rdparty/walkontable/src/selection":17,"eventManager":32,"helpers/dom/element":36,"helpers/dom/event":37}],"SheetClip":[function(require,module,exports){
"use strict";
(function(global) {
  "use strict";
  function countQuotes(str) {
    return str.split('"').length - 1;
  }
  var SheetClip = {
    parse: function(str) {
      var r,
          rLen,
          rows,
          arr = [],
          a = 0,
          c,
          cLen,
          multiline,
          last;
      rows = str.split('\n');
      if (rows.length > 1 && rows[rows.length - 1] === '') {
        rows.pop();
      }
      for (r = 0, rLen = rows.length; r < rLen; r += 1) {
        rows[r] = rows[r].split('\t');
        for (c = 0, cLen = rows[r].length; c < cLen; c += 1) {
          if (!arr[a]) {
            arr[a] = [];
          }
          if (multiline && c === 0) {
            last = arr[a].length - 1;
            arr[a][last] = arr[a][last] + '\n' + rows[r][0];
            if (multiline && (countQuotes(rows[r][0]) & 1)) {
              multiline = false;
              arr[a][last] = arr[a][last].substring(0, arr[a][last].length - 1).replace(/""/g, '"');
            }
          } else {
            if (c === cLen - 1 && rows[r][c].indexOf('"') === 0 && (countQuotes(rows[r][c]) & 1)) {
              arr[a].push(rows[r][c].substring(1).replace(/""/g, '"'));
              multiline = true;
            } else {
              arr[a].push(rows[r][c].replace(/""/g, '"'));
              multiline = false;
            }
          }
        }
        if (!multiline) {
          a += 1;
        }
      }
      return arr;
    },
    stringify: function(arr) {
      var r,
          rLen,
          c,
          cLen,
          str = '',
          val;
      for (r = 0, rLen = arr.length; r < rLen; r += 1) {
        cLen = arr[r].length;
        for (c = 0; c < cLen; c += 1) {
          if (c > 0) {
            str += '\t';
          }
          val = arr[r][c];
          if (typeof val === 'string') {
            if (val.indexOf('\n') > -1) {
              str += '"' + val.replace(/"/g, '""') + '"';
            } else {
              str += val;
            }
          } else if (val === null || val === void 0) {
            str += '';
          } else {
            str += val;
          }
        }
        str += '\n';
      }
      return str;
    }
  };
  if (typeof exports !== 'undefined') {
    exports.parse = SheetClip.parse;
    exports.stringify = SheetClip.stringify;
  } else {
    global.SheetClip = SheetClip;
  }
}(window));

//# 
},{}],"autoResize":[function(require,module,exports){
"use strict";
function autoResize() {
  var defaults = {
    minHeight: 200,
    maxHeight: 300,
    minWidth: 100,
    maxWidth: 300
  },
      el,
      body = document.body,
      text = document.createTextNode(''),
      span = document.createElement('SPAN'),
      observe = function(element, event, handler) {
        if (window.attachEvent) {
          element.attachEvent('on' + event, handler);
        } else {
          element.addEventListener(event, handler, false);
        }
      },
      unObserve = function(element, event, handler) {
        if (window.removeEventListener) {
          element.removeEventListener(event, handler, false);
        } else {
          element.detachEvent('on' + event, handler);
        }
      },
      resize = function(newChar) {
        var width,
            scrollHeight;
        if (!newChar) {
          newChar = "";
        } else if (!/^[a-zA-Z \.,\\\/\|0-9]$/.test(newChar)) {
          newChar = ".";
        }
        if (text.textContent !== void 0) {
          text.textContent = el.value + newChar;
        } else {
          text.data = el.value + newChar;
        }
        span.style.fontSize = Handsontable.Dom.getComputedStyle(el).fontSize;
        span.style.fontFamily = Handsontable.Dom.getComputedStyle(el).fontFamily;
        span.style.whiteSpace = "pre";
        body.appendChild(span);
        width = span.clientWidth + 2;
        body.removeChild(span);
        el.style.height = defaults.minHeight + 'px';
        if (defaults.minWidth > width) {
          el.style.width = defaults.minWidth + 'px';
        } else if (width > defaults.maxWidth) {
          el.style.width = defaults.maxWidth + 'px';
        } else {
          el.style.width = width + 'px';
        }
        scrollHeight = el.scrollHeight ? el.scrollHeight - 1 : 0;
        if (defaults.minHeight > scrollHeight) {
          el.style.height = defaults.minHeight + 'px';
        } else if (defaults.maxHeight < scrollHeight) {
          el.style.height = defaults.maxHeight + 'px';
          el.style.overflowY = 'visible';
        } else {
          el.style.height = scrollHeight + 'px';
        }
      },
      delayedResize = function() {
        window.setTimeout(resize, 0);
      },
      extendDefaults = function(config) {
        if (config && config.minHeight) {
          if (config.minHeight == 'inherit') {
            defaults.minHeight = el.clientHeight;
          } else {
            var minHeight = parseInt(config.minHeight);
            if (!isNaN(minHeight)) {
              defaults.minHeight = minHeight;
            }
          }
        }
        if (config && config.maxHeight) {
          if (config.maxHeight == 'inherit') {
            defaults.maxHeight = el.clientHeight;
          } else {
            var maxHeight = parseInt(config.maxHeight);
            if (!isNaN(maxHeight)) {
              defaults.maxHeight = maxHeight;
            }
          }
        }
        if (config && config.minWidth) {
          if (config.minWidth == 'inherit') {
            defaults.minWidth = el.clientWidth;
          } else {
            var minWidth = parseInt(config.minWidth);
            if (!isNaN(minWidth)) {
              defaults.minWidth = minWidth;
            }
          }
        }
        if (config && config.maxWidth) {
          if (config.maxWidth == 'inherit') {
            defaults.maxWidth = el.clientWidth;
          } else {
            var maxWidth = parseInt(config.maxWidth);
            if (!isNaN(maxWidth)) {
              defaults.maxWidth = maxWidth;
            }
          }
        }
        if (!span.firstChild) {
          span.className = "autoResize";
          span.style.display = 'inline-block';
          span.appendChild(text);
        }
      },
      init = function(el_, config, doObserve) {
        el = el_;
        extendDefaults(config);
        if (el.nodeName == 'TEXTAREA') {
          el.style.resize = 'none';
          el.style.overflowY = '';
          el.style.height = defaults.minHeight + 'px';
          el.style.minWidth = defaults.minWidth + 'px';
          el.style.maxWidth = defaults.maxWidth + 'px';
          el.style.overflowY = 'hidden';
        }
        if (doObserve) {
          observe(el, 'change', resize);
          observe(el, 'cut', delayedResize);
          observe(el, 'paste', delayedResize);
          observe(el, 'drop', delayedResize);
          observe(el, 'keydown', delayedResize);
        }
        resize();
      };
  return {
    init: function(el_, config, doObserve) {
      init(el_, config, doObserve);
    },
    unObserve: function() {
      unObserve(el, 'change', resize);
      unObserve(el, 'cut', delayedResize);
      unObserve(el, 'paste', delayedResize);
      unObserve(el, 'drop', delayedResize);
      unObserve(el, 'keydown', delayedResize);
    },
    resize: resize
  };
}
if (typeof exports !== 'undefined') {
  module.exports = autoResize;
}

//# 
},{}],"copyPaste":[function(require,module,exports){
"use strict";
var $__SheetClip__;
var SheetClip = ($__SheetClip__ = require("SheetClip"), $__SheetClip__ && $__SheetClip__.__esModule && $__SheetClip__ || {default: $__SheetClip__}).default;
var instance;
function copyPaste() {
  if (!instance) {
    instance = new CopyPasteClass();
  } else if (instance.hasBeenDestroyed()) {
    instance.init();
  }
  instance.refCounter++;
  return instance;
}
if (typeof exports !== 'undefined') {
  module.exports = copyPaste;
}
function CopyPasteClass() {
  this.refCounter = 0;
  this.init();
}
CopyPasteClass.prototype.init = function() {
  var style,
      parent;
  this.copyCallbacks = [];
  this.cutCallbacks = [];
  this.pasteCallbacks = [];
  parent = document.body;
  if (document.getElementById('CopyPasteDiv')) {
    this.elDiv = document.getElementById('CopyPasteDiv');
    this.elTextarea = this.elDiv.firstChild;
  } else {
    this.elDiv = document.createElement('div');
    this.elDiv.id = 'CopyPasteDiv';
    style = this.elDiv.style;
    style.position = 'fixed';
    style.top = '-10000px';
    style.left = '-10000px';
    parent.appendChild(this.elDiv);
    this.elTextarea = document.createElement('textarea');
    this.elTextarea.className = 'copyPaste';
    this.elTextarea.onpaste = function(event) {
      var clipboardContents,
          clipboardHtml,
          temp;
      if ('WebkitAppearance' in document.documentElement.style) {
        clipboardContents = event.clipboardData.getData("text/plain");
        clipboardHtml = event.clipboardData.getData("text/table");
        if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
          temp = clipboardContents.split('\n');
          if (temp[temp.length - 1] === '') {
            temp.pop();
          }
          clipboardContents = temp.join('\n');
        }
        this.value = clipboardContents;
        this.htmlValue = clipboardHtml;
        return false;
      }
    };
    this.elTextarea.oncopy = function(event) {
      event.clipboardData.setData('text/plain', this.value);
      event.clipboardData.setData('text/table', this.htmlValue);
      return false;
    };
    style = this.elTextarea.style;
    style.width = '10000px';
    style.height = '10000px';
    style.overflow = 'hidden';
    this.elDiv.appendChild(this.elTextarea);
    if (typeof style.opacity !== 'undefined') {
      style.opacity = 0;
    }
  }
  this.onKeyDownRef = this.onKeyDown.bind(this);
  document.documentElement.addEventListener('keydown', this.onKeyDownRef, false);
};
CopyPasteClass.prototype.onKeyDown = function(event) {
  var _this = this,
      isCtrlDown = false;
  function isActiveElementEditable() {
    var element = document.activeElement;
    if (element.shadowRoot && element.shadowRoot.activeElement) {
      element = element.shadowRoot.activeElement;
    }
    return ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(element.nodeName) > -1 || element.contentEditable === 'true';
  }
  if (event.metaKey) {
    isCtrlDown = true;
  } else if (event.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) {
    isCtrlDown = true;
  }
  if (isCtrlDown) {
    if (document.activeElement !== this.elTextarea && (this.getSelectionText() !== '' || isActiveElementEditable())) {
      return;
    }
    this.selectNodeText(this.elTextarea);
    setTimeout(function() {
      if (document.activeElement !== _this.elTextarea) {
        _this.selectNodeText(_this.elTextarea);
      }
    }, 0);
  }
  if (isCtrlDown && (event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 88)) {
    if (event.keyCode === 88) {
      setTimeout(function() {
        _this.triggerCut(event);
      }, 0);
    } else if (event.keyCode === 86) {
      setTimeout(function() {
        _this.triggerPaste(event);
      }, 0);
    }
  }
};
CopyPasteClass.prototype.selectNodeText = function(element) {
  if (element) {
    element.select();
  }
};
CopyPasteClass.prototype.getSelectionText = function() {
  var text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
};
CopyPasteClass.prototype.copyable = function(string) {
  if (typeof string !== 'string' && string.toString === void 0) {
    throw new Error('copyable requires string parameter');
  }
  var parsedStr = SheetClip.parse(string),
      rowItem,
      rowSet,
      dataSet = [];
  for (var row = 0,
      l = parsedStr.length; row < l; row++) {
    rowSet = [];
    for (var col = 0,
        len = parsedStr[row].length; col < len; col++) {
      rowItem = $(parsedStr[row][col]).text();
      rowSet.push(rowItem);
    }
    dataSet.push(rowSet);
  }
  this.elTextarea.htmlValue = string;
  this.elTextarea.value = SheetClip.stringify(dataSet);
  this.selectNodeText(this.elTextarea);
};
CopyPasteClass.prototype.onCut = function(callback) {
  this.cutCallbacks.push(callback);
};
CopyPasteClass.prototype.onPaste = function(callback) {
  this.pasteCallbacks.push(callback);
};
CopyPasteClass.prototype.removeCallback = function(callback) {
  var i,
      len;
  for (i = 0, len = this.copyCallbacks.length; i < len; i++) {
    if (this.copyCallbacks[i] === callback) {
      this.copyCallbacks.splice(i, 1);
      return true;
    }
  }
  for (i = 0, len = this.cutCallbacks.length; i < len; i++) {
    if (this.cutCallbacks[i] === callback) {
      this.cutCallbacks.splice(i, 1);
      return true;
    }
  }
  for (i = 0, len = this.pasteCallbacks.length; i < len; i++) {
    if (this.pasteCallbacks[i] === callback) {
      this.pasteCallbacks.splice(i, 1);
      return true;
    }
  }
  return false;
};
CopyPasteClass.prototype.triggerCut = function(event) {
  var _this = this;
  if (_this.cutCallbacks) {
    setTimeout(function() {
      for (var i = 0,
          len = _this.cutCallbacks.length; i < len; i++) {
        _this.cutCallbacks[i](event);
      }
    }, 50);
  }
};
CopyPasteClass.prototype.triggerPaste = function(event, string) {
  var _this = this;
  if (_this.pasteCallbacks) {
    setTimeout(function() {
      var copiedVal = _this.elTextarea.htmlValue || _this.elTextarea.value,
          val;
      val = string || copiedVal;
      for (var i = 0,
          len = _this.pasteCallbacks.length; i < len; i++) {
        _this.pasteCallbacks[i](val, event);
      }
    }, 50);
  }
};
CopyPasteClass.prototype.destroy = function() {
  if (!this.hasBeenDestroyed() && --this.refCounter === 0) {
    if (this.elDiv && this.elDiv.parentNode) {
      this.elDiv.parentNode.removeChild(this.elDiv);
      this.elDiv = null;
      this.elTextarea = null;
    }
    document.documentElement.removeEventListener('keydown', this.onKeyDownRef);
    this.onKeyDownRef = null;
  }
};
CopyPasteClass.prototype.hasBeenDestroyed = function() {
  return !this.refCounter;
};

//# 
},{"SheetClip":"SheetClip"}],"es6collections":[function(require,module,exports){
"use strict";
(function(exports) {
  'use strict';
  var i;
  var defineProperty = Object.defineProperty,
      is = function(a, b) {
        return isNaN(a) ? isNaN(b) : a === b;
      };
  if (typeof WeakMap == 'undefined') {
    exports.WeakMap = createCollection({
      'delete': sharedDelete,
      clear: sharedClear,
      get: sharedGet,
      has: mapHas,
      set: sharedSet
    }, true);
  }
  if (typeof Map == 'undefined') {
    exports.Map = createCollection({
      'delete': sharedDelete,
      has: mapHas,
      get: sharedGet,
      set: sharedSet,
      keys: sharedKeys,
      values: sharedValues,
      entries: mapEntries,
      forEach: sharedForEach,
      clear: sharedClear
    });
  }
  if (typeof Set == 'undefined') {
    exports.Set = createCollection({
      has: setHas,
      add: sharedAdd,
      'delete': sharedDelete,
      clear: sharedClear,
      keys: sharedValues,
      values: sharedValues,
      entries: setEntries,
      forEach: sharedForEach
    });
  }
  if (typeof WeakSet == 'undefined') {
    exports.WeakSet = createCollection({
      'delete': sharedDelete,
      add: sharedAdd,
      clear: sharedClear,
      has: setHas
    }, true);
  }
  function createCollection(proto, objectOnly) {
    function Collection(a) {
      if (!this || this.constructor !== Collection)
        return new Collection(a);
      this._keys = [];
      this._values = [];
      this._itp = [];
      this.objectOnly = objectOnly;
      if (a)
        init.call(this, a);
    }
    if (!objectOnly) {
      defineProperty(proto, 'size', {get: sharedSize});
    }
    proto.constructor = Collection;
    Collection.prototype = proto;
    return Collection;
  }
  function init(a) {
    var i;
    if (this.add)
      a.forEach(this.add, this);
    else
      a.forEach(function(a) {
        this.set(a[0], a[1]);
      }, this);
  }
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
      this._itp.forEach(function(p) {
        if (i < p[0])
          p[0]--;
      });
    }
    return -1 < i;
  }
  ;
  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }
  function has(list, key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("Invalid value used as weak collection key");
    if (key != key || key === 0)
      for (i = list.length; i-- && !is(list[i], key); ) {}
    else
      i = list.indexOf(key);
    return -1 < i;
  }
  function setHas(value) {
    return has.call(this, this._values, value);
  }
  function mapHas(value) {
    return has.call(this, this._keys, value);
  }
  function sharedSet(key, value) {
    this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value;
    return this;
  }
  function sharedAdd(value) {
    if (!this.has(value))
      this._values.push(value);
    return this;
  }
  function sharedClear() {
    this._values.length = 0;
  }
  function sharedKeys() {
    return sharedIterator(this._itp, this._keys);
  }
  function sharedValues() {
    return sharedIterator(this._itp, this._values);
  }
  function mapEntries() {
    return sharedIterator(this._itp, this._keys, this._values);
  }
  function setEntries() {
    return sharedIterator(this._itp, this._values, this._values);
  }
  function sharedIterator(itp, array, array2) {
    var p = [0],
        done = false;
    itp.push(p);
    return {next: function() {
        var v,
            k = p[0];
        if (!done && k < array.length) {
          v = array2 ? [array[k], array2[k]] : array[k];
          p[0]++;
        } else {
          done = true;
          itp.splice(itp.indexOf(p), 1);
        }
        return {
          done: done,
          value: v
        };
      }};
  }
  function sharedSize() {
    return this._values.length;
  }
  function sharedForEach(callback, context) {
    var it = this.entries();
    for (; ; ) {
      var r = it.next();
      if (r.done)
        break;
      callback.call(context, r.value[1], r.value[0], this);
    }
  }
})(typeof exports != 'undefined' && typeof global != 'undefined' ? global : window);

//# 
},{}],"jsonpatch":[function(require,module,exports){
"use strict";
var jsonpatch;
(function(jsonpatch) {
  var objOps = {
    add: function(obj, key) {
      obj[key] = this.value;
      return true;
    },
    remove: function(obj, key) {
      delete obj[key];
      return true;
    },
    replace: function(obj, key) {
      obj[key] = this.value;
      return true;
    },
    move: function(obj, key, tree) {
      var temp = {
        op: "_get",
        path: this.from
      };
      apply(tree, [temp]);
      apply(tree, [{
        op: "remove",
        path: this.from
      }]);
      apply(tree, [{
        op: "add",
        path: this.path,
        value: temp.value
      }]);
      return true;
    },
    copy: function(obj, key, tree) {
      var temp = {
        op: "_get",
        path: this.from
      };
      apply(tree, [temp]);
      apply(tree, [{
        op: "add",
        path: this.path,
        value: temp.value
      }]);
      return true;
    },
    test: function(obj, key) {
      return (JSON.stringify(obj[key]) === JSON.stringify(this.value));
    },
    _get: function(obj, key) {
      this.value = obj[key];
    }
  };
  var arrOps = {
    add: function(arr, i) {
      arr.splice(i, 0, this.value);
      return true;
    },
    remove: function(arr, i) {
      arr.splice(i, 1);
      return true;
    },
    replace: function(arr, i) {
      arr[i] = this.value;
      return true;
    },
    move: objOps.move,
    copy: objOps.copy,
    test: objOps.test,
    _get: objOps._get
  };
  var observeOps = {
    add: function(patches, path) {
      var patch = {
        op: "add",
        path: path + escapePathComponent(this.name),
        value: this.object[this.name]
      };
      patches.push(patch);
    },
    'delete': function(patches, path) {
      var patch = {
        op: "remove",
        path: path + escapePathComponent(this.name)
      };
      patches.push(patch);
    },
    update: function(patches, path) {
      var patch = {
        op: "replace",
        path: path + escapePathComponent(this.name),
        value: this.object[this.name]
      };
      patches.push(patch);
    }
  };
  function escapePathComponent(str) {
    if (str.indexOf('/') === -1 && str.indexOf('~') === -1) {
      return str;
    }
    return str.replace(/~/g, '~0').replace(/\//g, '~1');
  }
  function _getPathRecursive(root, obj) {
    var found;
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        if (root[key] === obj) {
          return escapePathComponent(key) + '/';
        } else if (typeof root[key] === 'object') {
          found = _getPathRecursive(root[key], obj);
          if (found != '') {
            return escapePathComponent(key) + '/' + found;
          }
        }
      }
    }
    return '';
  }
  function getPath(root, obj) {
    if (root === obj) {
      return '/';
    }
    var path = _getPathRecursive(root, obj);
    if (path === '') {
      throw new Error("Object not found in root");
    }
    return '/' + path;
  }
  var beforeDict = [];
  jsonpatch.intervals;
  var Mirror = (function() {
    function Mirror(obj) {
      this.observers = [];
      this.obj = obj;
    }
    return Mirror;
  })();
  var ObserverInfo = (function() {
    function ObserverInfo(callback, observer) {
      this.callback = callback;
      this.observer = observer;
    }
    return ObserverInfo;
  })();
  function getMirror(obj) {
    for (var i = 0,
        ilen = beforeDict.length; i < ilen; i++) {
      if (beforeDict[i].obj === obj) {
        return beforeDict[i];
      }
    }
  }
  function removeMirror(obj) {
    for (var i = 0,
        ilen = beforeDict.length; i < ilen; i++) {
      if (beforeDict[i] === obj) {
        beforeDict.splice(i, 1);
      }
    }
  }
  function getObserverFromMirror(mirror, callback) {
    for (var j = 0,
        jlen = mirror.observers.length; j < jlen; j++) {
      if (mirror.observers[j].callback === callback) {
        return mirror.observers[j].observer;
      }
    }
  }
  function removeObserverFromMirror(mirror, observer) {
    for (var j = 0,
        jlen = mirror.observers.length; j < jlen; j++) {
      if (mirror.observers[j].observer === observer) {
        mirror.observers.splice(j, 1);
        if (!mirror.observers.length) {
          removeMirror(mirror);
        }
        return;
      }
    }
  }
  function unobserve(root, observer) {
    generate(observer);
    if (Object.observe) {
      _unobserve(observer, root);
    } else {
      clearTimeout(observer.next);
    }
    var mirror = getMirror(root);
    removeObserverFromMirror(mirror, observer);
  }
  jsonpatch.unobserve = unobserve;
  function observe(obj, callback) {
    var patches = [];
    var root = obj;
    var observer;
    var mirror = getMirror(obj);
    if (!mirror) {
      mirror = new Mirror(obj);
      beforeDict.push(mirror);
    } else {
      observer = getObserverFromMirror(mirror, callback);
    }
    if (observer) {
      return observer;
    }
    if (Object.observe) {
      observer = function(arr) {
        _unobserve(observer, obj);
        _observe(observer, obj);
        var a = 0,
            alen = arr.length;
        while (a < alen) {
          if (!(arr[a].name === 'length' && _isArray(arr[a].object)) && !(arr[a].name === '__Jasmine_been_here_before__')) {
            var type = arr[a].type;
            switch (type) {
              case 'new':
                type = 'add';
                break;
              case 'deleted':
                type = 'delete';
                break;
              case 'updated':
                type = 'update';
                break;
            }
            observeOps[type].call(arr[a], patches, getPath(root, arr[a].object));
          }
          a++;
        }
        if (patches) {
          if (callback) {
            callback(patches);
          }
        }
        observer.patches = patches;
        patches = [];
      };
    } else {
      observer = {};
      mirror.value = JSON.parse(JSON.stringify(obj));
      if (callback) {
        observer.callback = callback;
        observer.next = null;
        var intervals = this.intervals || [100, 1000, 10000, 60000];
        var currentInterval = 0;
        var dirtyCheck = function() {
          generate(observer);
        };
        var fastCheck = function() {
          clearTimeout(observer.next);
          observer.next = setTimeout(function() {
            dirtyCheck();
            currentInterval = 0;
            observer.next = setTimeout(slowCheck, intervals[currentInterval++]);
          }, 0);
        };
        var slowCheck = function() {
          dirtyCheck();
          if (currentInterval == intervals.length) {
            currentInterval = intervals.length - 1;
          }
          observer.next = setTimeout(slowCheck, intervals[currentInterval++]);
        };
        if (typeof window !== 'undefined') {
          if (window.addEventListener) {
            window.addEventListener('mousedown', fastCheck);
            window.addEventListener('mouseup', fastCheck);
            window.addEventListener('keydown', fastCheck);
          } else {
            window.attachEvent('onmousedown', fastCheck);
            window.attachEvent('onmouseup', fastCheck);
            window.attachEvent('onkeydown', fastCheck);
          }
        }
        observer.next = setTimeout(slowCheck, intervals[currentInterval++]);
      }
    }
    observer.patches = patches;
    observer.object = obj;
    mirror.observers.push(new ObserverInfo(callback, observer));
    return _observe(observer, obj);
  }
  jsonpatch.observe = observe;
  function _observe(observer, obj) {
    if (Object.observe) {
      Object.observe(obj, observer);
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var v = obj[key];
          if (v && typeof(v) === "object") {
            _observe(observer, v);
          }
        }
      }
    }
    return observer;
  }
  function _unobserve(observer, obj) {
    if (Object.observe) {
      Object.unobserve(obj, observer);
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var v = obj[key];
          if (v && typeof(v) === "object") {
            _unobserve(observer, v);
          }
        }
      }
    }
    return observer;
  }
  function generate(observer) {
    if (Object.observe) {
      Object.deliverChangeRecords(observer);
    } else {
      var mirror;
      for (var i = 0,
          ilen = beforeDict.length; i < ilen; i++) {
        if (beforeDict[i].obj === observer.object) {
          mirror = beforeDict[i];
          break;
        }
      }
      if (mirror) {
        _generate(mirror.value, observer.object, observer.patches, "");
      }
    }
    var temp = observer.patches;
    if (temp.length > 0) {
      observer.patches = [];
      if (observer.callback) {
        observer.callback(temp);
      }
    }
    return temp;
  }
  jsonpatch.generate = generate;
  var _objectKeys;
  if (Object.keys) {
    _objectKeys = Object.keys;
  } else {
    _objectKeys = function(obj) {
      var keys = [];
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          keys.push(o);
        }
      }
      return keys;
    };
  }
  function _generate(mirror, obj, patches, path) {
    var newKeys = _objectKeys(obj);
    var oldKeys = _objectKeys(mirror);
    var changed = false;
    var deleted = false;
    for (var t = oldKeys.length - 1; t >= 0; t--) {
      var key = oldKeys[t];
      var oldVal = mirror[key];
      if (obj.hasOwnProperty(key)) {
        var newVal = obj[key];
        if (oldVal instanceof Object) {
          _generate(oldVal, newVal, patches, path + "/" + escapePathComponent(key));
        } else {
          if (oldVal != newVal) {
            changed = true;
            patches.push({
              op: "replace",
              path: path + "/" + escapePathComponent(key),
              value: newVal
            });
            mirror[key] = newVal;
          }
        }
      } else {
        patches.push({
          op: "remove",
          path: path + "/" + escapePathComponent(key)
        });
        delete mirror[key];
        deleted = true;
      }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
      return;
    }
    for (var t = 0; t < newKeys.length; t++) {
      var key = newKeys[t];
      if (!mirror.hasOwnProperty(key)) {
        patches.push({
          op: "add",
          path: path + "/" + escapePathComponent(key),
          value: obj[key]
        });
        mirror[key] = JSON.parse(JSON.stringify(obj[key]));
      }
    }
  }
  var _isArray;
  if (Array.isArray) {
    _isArray = Array.isArray;
  } else {
    _isArray = function(obj) {
      return obj.push && typeof obj.length === 'number';
    };
  }
  function apply(tree, patches) {
    var result = false,
        p = 0,
        plen = patches.length,
        patch;
    while (p < plen) {
      patch = patches[p];
      var keys = patch.path.split('/');
      var obj = tree;
      var t = 1;
      var len = keys.length;
      while (true) {
        if (_isArray(obj)) {
          var index = parseInt(keys[t], 10);
          t++;
          if (t >= len) {
            result = arrOps[patch.op].call(patch, obj, index, tree);
            break;
          }
          obj = obj[index];
        } else {
          var key = keys[t];
          if (key.indexOf('~') != -1) {
            key = key.replace(/~1/g, '/').replace(/~0/g, '~');
          }
          t++;
          if (t >= len) {
            result = objOps[patch.op].call(patch, obj, key, tree);
            break;
          }
          obj = obj[key];
        }
      }
      p++;
    }
    return result;
  }
  jsonpatch.apply = apply;
})(jsonpatch || (jsonpatch = {}));
if (typeof exports !== "undefined") {
  exports.apply = jsonpatch.apply;
  exports.observe = jsonpatch.observe;
  exports.unobserve = jsonpatch.unobserve;
  exports.generate = jsonpatch.generate;
}

//# 
},{}],"numeral":[function(require,module,exports){
"use strict";
(function() {
  var numeral,
      VERSION = '1.5.3',
      languages = {},
      currentLanguage = 'en',
      zeroFormat = null,
      defaultFormat = '0,0',
      hasModule = (typeof module !== 'undefined' && module.exports);
  function Numeral(number) {
    this._value = number;
  }
  function toFixed(value, precision, roundingFunction, optionals) {
    var power = Math.pow(10, precision),
        optionalsRegExp,
        output;
    output = (roundingFunction(value * power) / power).toFixed(precision);
    if (optionals) {
      optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
      output = output.replace(optionalsRegExp, '');
    }
    return output;
  }
  function formatNumeral(n, format, roundingFunction) {
    var output;
    if (format.indexOf('$') > -1) {
      output = formatCurrency(n, format, roundingFunction);
    } else if (format.indexOf('%') > -1) {
      output = formatPercentage(n, format, roundingFunction);
    } else if (format.indexOf(':') > -1) {
      output = formatTime(n, format);
    } else {
      output = formatNumber(n._value, format, roundingFunction);
    }
    return output;
  }
  function unformatNumeral(n, string) {
    var stringOriginal = string,
        thousandRegExp,
        millionRegExp,
        billionRegExp,
        trillionRegExp,
        suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bytesMultiplier = false,
        power;
    if (string.indexOf(':') > -1) {
      n._value = unformatTime(string);
    } else {
      if (string === zeroFormat) {
        n._value = 0;
      } else {
        if (languages[currentLanguage].delimiters.decimal !== '.') {
          string = string.replace(/\./g, '').replace(languages[currentLanguage].delimiters.decimal, '.');
        }
        thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
        millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
        billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
        trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
        for (power = 0; power <= suffixes.length; power++) {
          bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;
          if (bytesMultiplier) {
            break;
          }
        }
        n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2) ? 1 : -1) * Number(string.replace(/[^0-9\.]+/g, ''));
        n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
      }
    }
    return n._value;
  }
  function formatCurrency(n, format, roundingFunction) {
    var symbolIndex = format.indexOf('$'),
        openParenIndex = format.indexOf('('),
        minusSignIndex = format.indexOf('-'),
        space = '',
        spliceIndex,
        output;
    if (format.indexOf(' $') > -1) {
      space = ' ';
      format = format.replace(' $', '');
    } else if (format.indexOf('$ ') > -1) {
      space = ' ';
      format = format.replace('$ ', '');
    } else {
      format = format.replace('$', '');
    }
    output = formatNumber(n._value, format, roundingFunction);
    if (symbolIndex <= 1) {
      if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
        output = output.split('');
        spliceIndex = 1;
        if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
          spliceIndex = 0;
        }
        output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
        output = output.join('');
      } else {
        output = languages[currentLanguage].currency.symbol + space + output;
      }
    } else {
      if (output.indexOf(')') > -1) {
        output = output.split('');
        output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
        output = output.join('');
      } else {
        output = output + space + languages[currentLanguage].currency.symbol;
      }
    }
    return output;
  }
  function formatPercentage(n, format, roundingFunction) {
    var space = '',
        output,
        value = n._value * 100;
    if (format.indexOf(' %') > -1) {
      space = ' ';
      format = format.replace(' %', '');
    } else {
      format = format.replace('%', '');
    }
    output = formatNumber(value, format, roundingFunction);
    if (output.indexOf(')') > -1) {
      output = output.split('');
      output.splice(-1, 0, space + '%');
      output = output.join('');
    } else {
      output = output + space + '%';
    }
    return output;
  }
  function formatTime(n) {
    var hours = Math.floor(n._value / 60 / 60),
        minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),
        seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
    return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
  }
  function unformatTime(string) {
    var timeArray = string.split(':'),
        seconds = 0;
    if (timeArray.length === 3) {
      seconds = seconds + (Number(timeArray[0]) * 60 * 60);
      seconds = seconds + (Number(timeArray[1]) * 60);
      seconds = seconds + Number(timeArray[2]);
    } else if (timeArray.length === 2) {
      seconds = seconds + (Number(timeArray[0]) * 60);
      seconds = seconds + Number(timeArray[1]);
    }
    return Number(seconds);
  }
  function formatNumber(value, format, roundingFunction) {
    var negP = false,
        signed = false,
        optDec = false,
        abbr = '',
        abbrK = false,
        abbrM = false,
        abbrB = false,
        abbrT = false,
        abbrForce = false,
        bytes = '',
        ord = '',
        abs = Math.abs(value),
        suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        min,
        max,
        power,
        w,
        precision,
        thousands,
        d = '',
        neg = false;
    if (value === 0 && zeroFormat !== null) {
      return zeroFormat;
    } else {
      if (format.indexOf('(') > -1) {
        negP = true;
        format = format.slice(1, -1);
      } else if (format.indexOf('+') > -1) {
        signed = true;
        format = format.replace(/\+/g, '');
      }
      if (format.indexOf('a') > -1) {
        abbrK = format.indexOf('aK') >= 0;
        abbrM = format.indexOf('aM') >= 0;
        abbrB = format.indexOf('aB') >= 0;
        abbrT = format.indexOf('aT') >= 0;
        abbrForce = abbrK || abbrM || abbrB || abbrT;
        if (format.indexOf(' a') > -1) {
          abbr = ' ';
          format = format.replace(' a', '');
        } else {
          format = format.replace('a', '');
        }
        if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
          abbr = abbr + languages[currentLanguage].abbreviations.trillion;
          value = value / Math.pow(10, 12);
        } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
          abbr = abbr + languages[currentLanguage].abbreviations.billion;
          value = value / Math.pow(10, 9);
        } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
          abbr = abbr + languages[currentLanguage].abbreviations.million;
          value = value / Math.pow(10, 6);
        } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
          abbr = abbr + languages[currentLanguage].abbreviations.thousand;
          value = value / Math.pow(10, 3);
        }
      }
      if (format.indexOf('b') > -1) {
        if (format.indexOf(' b') > -1) {
          bytes = ' ';
          format = format.replace(' b', '');
        } else {
          format = format.replace('b', '');
        }
        for (power = 0; power <= suffixes.length; power++) {
          min = Math.pow(1024, power);
          max = Math.pow(1024, power + 1);
          if (value >= min && value < max) {
            bytes = bytes + suffixes[power];
            if (min > 0) {
              value = value / min;
            }
            break;
          }
        }
      }
      if (format.indexOf('o') > -1) {
        if (format.indexOf(' o') > -1) {
          ord = ' ';
          format = format.replace(' o', '');
        } else {
          format = format.replace('o', '');
        }
        ord = ord + languages[currentLanguage].ordinal(value);
      }
      if (format.indexOf('[.]') > -1) {
        optDec = true;
        format = format.replace('[.]', '.');
      }
      w = value.toString().split('.')[0];
      precision = format.split('.')[1];
      thousands = format.indexOf(',');
      if (precision) {
        if (precision.indexOf('[') > -1) {
          precision = precision.replace(']', '');
          precision = precision.split('[');
          d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
        } else {
          d = toFixed(value, precision.length, roundingFunction);
        }
        w = d.split('.')[0];
        if (d.split('.')[1].length) {
          d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
        } else {
          d = '';
        }
        if (optDec && Number(d.slice(1)) === 0) {
          d = '';
        }
      } else {
        w = toFixed(value, null, roundingFunction);
      }
      if (w.indexOf('-') > -1) {
        w = w.slice(1);
        neg = true;
      }
      if (thousands > -1) {
        w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
      }
      if (format.indexOf('.') === 0) {
        w = '';
      }
      return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
    }
  }
  numeral = function(input) {
    if (numeral.isNumeral(input)) {
      input = input.value();
    } else if (input === 0 || typeof input === 'undefined') {
      input = 0;
    } else if (!Number(input)) {
      input = numeral.fn.unformat(input);
    }
    return new Numeral(Number(input));
  };
  numeral.version = VERSION;
  numeral.isNumeral = function(obj) {
    return obj instanceof Numeral;
  };
  numeral.language = function(key, values) {
    if (!key) {
      return currentLanguage;
    }
    if (key && !values) {
      if (!languages[key]) {
        throw new Error('Unknown language : ' + key);
      }
      currentLanguage = key;
    }
    if (values || !languages[key]) {
      loadLanguage(key, values);
    }
    return numeral;
  };
  numeral.languageData = function(key) {
    if (!key) {
      return languages[currentLanguage];
    }
    if (!languages[key]) {
      throw new Error('Unknown language : ' + key);
    }
    return languages[key];
  };
  numeral.language('en', {
    delimiters: {
      thousands: ',',
      decimal: '.'
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function(number) {
      var b = number % 10;
      return (~~(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
    },
    currency: {symbol: '$'}
  });
  numeral.zeroFormat = function(format) {
    zeroFormat = typeof(format) === 'string' ? format : null;
  };
  numeral.defaultFormat = function(format) {
    defaultFormat = typeof(format) === 'string' ? format : '0.0';
  };
  numeral.validate = function(val, culture) {
    var _decimalSep,
        _thousandSep,
        _currSymbol,
        _valArray,
        _abbrObj,
        _thousandRegEx,
        languageData,
        temp;
    if (typeof val !== 'string') {
      val += '';
      if (console.warn) {
        console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
      }
    }
    val = val.trim();
    if (val === '') {
      return false;
    }
    val = val.replace(/^[+-]?/, '');
    try {
      languageData = numeral.languageData(culture);
    } catch (e) {
      languageData = numeral.languageData(numeral.language());
    }
    _currSymbol = languageData.currency.symbol;
    _abbrObj = languageData.abbreviations;
    _decimalSep = languageData.delimiters.decimal;
    if (languageData.delimiters.thousands === '.') {
      _thousandSep = '\\.';
    } else {
      _thousandSep = languageData.delimiters.thousands;
    }
    temp = val.match(/^[^\d\.\,]+/);
    if (temp !== null) {
      val = val.substr(1);
      if (temp[0] !== _currSymbol) {
        return false;
      }
    }
    temp = val.match(/[^\d]+$/);
    if (temp !== null) {
      val = val.slice(0, -1);
      if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
        return false;
      }
    }
    if (!!val.match(/^\d+$/)) {
      return true;
    }
    _thousandRegEx = new RegExp(_thousandSep + '{2}');
    if (!val.match(/[^\d.,]/g)) {
      _valArray = val.split(_decimalSep);
      if (_valArray.length > 2) {
        return false;
      } else {
        if (_valArray.length < 2) {
          return (!!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
        } else {
          if (_valArray[0] === '') {
            return (!_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/));
          } else if (_valArray[0].length === 1) {
            return (!!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/));
          } else {
            return (!!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/));
          }
        }
      }
    }
    return false;
  };
  function loadLanguage(key, values) {
    languages[key] = values;
  }
  if ('function' !== typeof Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, opt_initialValue) {
      'use strict';
      if (null === this || 'undefined' === typeof this) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function');
      }
      var index,
          value,
          length = this.length >>> 0,
          isValueSet = false;
      if (1 < arguments.length) {
        value = opt_initialValue;
        isValueSet = true;
      }
      for (index = 0; length > index; ++index) {
        if (this.hasOwnProperty(index)) {
          if (isValueSet) {
            value = callback(value, this[index], index, this);
          } else {
            value = this[index];
            isValueSet = true;
          }
        }
      }
      if (!isValueSet) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      return value;
    };
  }
  function multiplier(x) {
    var parts = x.toString().split('.');
    if (parts.length < 2) {
      return 1;
    }
    return Math.pow(10, parts[1].length);
  }
  function correctionFactor() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prev, next) {
      var mp = multiplier(prev),
          mn = multiplier(next);
      return mp > mn ? mp : mn;
    }, -Infinity);
  }
  numeral.fn = Numeral.prototype = {
    clone: function() {
      return numeral(this);
    },
    format: function(inputString, roundingFunction) {
      return formatNumeral(this, inputString ? inputString : defaultFormat, (roundingFunction !== undefined) ? roundingFunction : Math.round);
    },
    unformat: function(inputString) {
      if (Object.prototype.toString.call(inputString) === '[object Number]') {
        return inputString;
      }
      return unformatNumeral(this, inputString ? inputString : defaultFormat);
    },
    value: function() {
      return this._value;
    },
    valueOf: function() {
      return this._value;
    },
    set: function(value) {
      this._value = Number(value);
      return this;
    },
    add: function(value) {
      var corrFactor = correctionFactor.call(null, this._value, value);
      function cback(accum, curr, currI, O) {
        return accum + corrFactor * curr;
      }
      this._value = [this._value, value].reduce(cback, 0) / corrFactor;
      return this;
    },
    subtract: function(value) {
      var corrFactor = correctionFactor.call(null, this._value, value);
      function cback(accum, curr, currI, O) {
        return accum - corrFactor * curr;
      }
      this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
      return this;
    },
    multiply: function(value) {
      function cback(accum, curr, currI, O) {
        var corrFactor = correctionFactor(accum, curr);
        return (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
      }
      this._value = [this._value, value].reduce(cback, 1);
      return this;
    },
    divide: function(value) {
      function cback(accum, curr, currI, O) {
        var corrFactor = correctionFactor(accum, curr);
        return (accum * corrFactor) / (curr * corrFactor);
      }
      this._value = [this._value, value].reduce(cback);
      return this;
    },
    difference: function(value) {
      return Math.abs(numeral(this._value).subtract(value).value());
    }
  };
  if (hasModule) {
    module.exports = numeral;
  }
  if (typeof ender === 'undefined') {
    this['numeral'] = numeral;
  }
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return numeral;
    });
  }
}).call(window);

//# 
},{}]},{},[23,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,29,31,30])("numeral")
});