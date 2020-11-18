import { fastInnerHTML } from '../../helpers/dom/element';
import { getRenderer } from '../index';
import { rangeEach } from '../../helpers/number';

import { RENDERER_TYPE as TEXT_RENDERER_TYPE } from '../textRenderer';

/**
 * @private
 * @param {Core} instance The Handsontable instance.
 * @param {HTMLTableCellElement} TD The rendered cell element.
 * @param {number} row The visual row index.
 * @param {number} col The visual column index.
 * @param {number|string} prop The column property (passed when datasource is an array of objects).
 * @param {*} value The rendered value.
 * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
 */
export default function passwordRenderer(instance, TD, row, col, prop, value, cellProperties) {
  getRenderer(TEXT_RENDERER_TYPE).apply(this, [instance, TD, row, col, prop, value, cellProperties]);

  const hashLength = cellProperties.hashLength || TD.innerHTML.length;
  const hashSymbol = cellProperties.hashSymbol || '*';

  let hash = '';

  rangeEach(hashLength - 1, () => {
    hash += hashSymbol;
  });
  fastInnerHTML(TD, hash);
}