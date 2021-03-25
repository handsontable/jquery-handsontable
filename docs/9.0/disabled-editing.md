---
title: Disabled editing
permalink: /9.0/disabled-editing
canonicalUrl: /disabled-editing
---

# {{ $frontmatter.title }}

[[toc]]

## Read-only cells vs non-editable cells

Non-editable cells behave like any other cells apart from preventing you from manually changing their values. You are still allowed to copy-paste or drag-to-fill the data. There is no additional CSS class added.

## Non-editable columns

In many cases you will need to configure a certain column to be non-editable. Doing it does not change it's basic behaviour (apart from editing), which means you are still available to use keyboard navigation, <kbd>CTRL+C</kbd> and <kbd>CTRL+V</kbd> functionalities, drag-to-fill etc.

To make a column non-editable, declare it in the `columns` setting. You can also define a special renderer function that will dim the `editor` value.

::: example #example1
```js
var container1 = document.getElementById('example1'),
  hot1;

hot1 = new Handsontable(container1, {
  data: [
    {car: 'Tesla', year: 2017, chassis: 'black', bumper: 'black'},
    {car: 'Nissan', year: 2018, chassis: 'blue', bumper: 'blue'},
    {car: 'Chrysler', year: 2019, chassis: 'yellow', bumper: 'black'},
    {car: 'Volvo', year: 2020, chassis: 'white', bumper: 'gray'}
  ],
  colHeaders: ['Car', 'Year', 'Chassis color', 'Bumper color'],
  columns: [
    {
      data: 'car',
      editor: false
    },
    {
      data: 'year',
      editor: 'numeric'
    },
    {
      data: 'chassis',
      editor: 'text'
    },
    {
      data: 'bumper',
      editor: 'text'
    }
  ]
});
```
:::

## Non-editable specific cells

The following example shows the table with non-editable cells containing the word "Nissan". This property of the cell is optional and can be easily set in the configuration of Handsontable.

::: example #example2
```js
var container2 = document.getElementById('example2'),
    hot2;

hot2 = new Handsontable(container2, {
  data: [
    {car: 'Tesla', year: 2017, chassis: 'black', bumper: 'black'},
    {car: 'Nissan', year: 2018, chassis: 'blue', bumper: 'blue'},
    {car: 'Chrysler', year: 2019, chassis: 'yellow', bumper: 'black'},
    {car: 'Volvo', year: 2020, chassis: 'white', bumper: 'gray'}
  ],
  colHeaders: ['Car', 'Year', 'Chassis color', 'Bumper color']
});
hot2.updateSettings({
  cells: function (row, col, prop) {
    var cellProperties = {};

    if (hot2.getDataAtRowProp(row, prop) === 'Nissan') {
      cellProperties.editor = false;
    } else {
      cellProperties.editor = 'text';
    }

    return cellProperties;
  }
});
```
:::