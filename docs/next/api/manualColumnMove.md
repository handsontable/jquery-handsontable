---
title: ManualColumnMove
permalink: /next/api/manual-column-move
canonicalUrl: /api/manual-column-move
editLink: false
---

# ManualColumnMove

[[toc]]

## Description


This plugin allows to change columns order. To make columns order persistent the [Options#persistentState](./options/#persistentstate)
plugin should be enabled.

API:
- `moveColumn` - move single column to the new position.
- `moveColumns` - move many columns (as an array of indexes) to the new position.
- `dragColumn` - drag single column to the new position.
- `dragColumns` - drag many columns (as an array of indexes) to the new position.

[Documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove) explain differences between drag and move actions. Please keep in mind that if you want apply visual changes,
you have to call manually the `render` method on the instance of Handsontable.

The plugin creates additional components to make moving possibly using user interface:
- backlight - highlight of selected columns.
- guideline - line which shows where columns has been moved.


## Methods:

### destroy

_manualColumnMove.destroy()_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L721)

Destroys the plugin instance.



### disablePlugin

_manualColumnMove.disablePlugin()_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L147)

Disables the plugin functionality for this Handsontable instance.



### dragColumn

_manualColumnMove.dragColumn(column, dropIndex) ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L214)

Drag a single column to drop index position.

**Emits**: <code>Hooks#event:beforeColumnMove</code>, <code>Hooks#event:afterColumnMove</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | `number` | Visual column index to be dragged. |
| dropIndex | `number` | Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements. To check visualization of drop index please take a look at [documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove). |



### dragColumns

_manualColumnMove.dragColumns(columns, dropIndex) ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L228)

Drag multiple columns to drop index position.

**Emits**: <code>Hooks#event:beforeColumnMove</code>, <code>Hooks#event:afterColumnMove</code>  

| Param | Type | Description |
| --- | --- | --- |
| columns | `Array` | Array of visual column indexes to be dragged. |
| dropIndex | `number` | Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements. To check visualization of drop index please take a look at [documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove). |



### enablePlugin

_manualColumnMove.enablePlugin()_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L111)

Enables the plugin functionality for this Handsontable instance.



### isEnabled

_manualColumnMove.isEnabled() ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L104)

Checks if the plugin is enabled in the handsontable settings. This method is executed in [Hooks#beforeInit](./hooks/#beforeInit)
hook and if it returns `true` than the [ManualColumnMove#enablePlugin](./manual-column-move/#enableplugin) method is called.



### isMovePossible

_manualColumnMove.isMovePossible(movedColumns, finalIndex) ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L245)

Indicates if it's possible to move columns to the desired position. Some of the actions aren't possible, i.e. You can’t move more than one element to the last position.


| Param | Type | Description |
| --- | --- | --- |
| movedColumns | `Array` | Array of visual column indexes to be moved. |
| finalIndex | `number` | Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action. To check the visualization of the final index, please take a look at [documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove). |



### moveColumn

_manualColumnMove.moveColumn(column, finalIndex) ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L167)

Moves a single column.

**Emits**: <code>Hooks#event:beforeColumnMove</code>, <code>Hooks#event:afterColumnMove</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | `number` | Visual column index to be moved. |
| finalIndex | `number` | Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action. To check the visualization of the final index, please take a look at [documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove). |



### moveColumns

_manualColumnMove.moveColumns(columns, finalIndex) ⇒ boolean_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L181)

Moves a multiple columns.

**Emits**: <code>Hooks#event:beforeColumnMove</code>, <code>Hooks#event:afterColumnMove</code>  

| Param | Type | Description |
| --- | --- | --- |
| columns | `Array` | Array of visual column indexes to be moved. |
| finalIndex | `number` | Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action. To check the visualization of the final index, please take a look at [documentation](https://handsontable.com/docs/demo-moving.html#manualColumnMove). |



### updatePlugin

_manualColumnMove.updatePlugin()_

[Source code](https://github.com/handsontable/handsontable/blob/develop/src/plugins/manualColumnMove/manualColumnMove.js#L135)

Updates the plugin state. This method is executed when [Core#updateSettings](./core/#updatesettings) is invoked.

