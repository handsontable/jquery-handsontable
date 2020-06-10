import {
  getScrollbarWidth,
  outerHeight,
  outerWidth,
  resetCssTransform
} from './../../../../helpers/dom/element';
import BottomLeftCornerOverlayTable from './../table/bottomLeftCorner';
import Overlay from './_base';

/**
 * @class TopLeftCornerOverlay
 */
class BottomLeftCornerOverlay extends Overlay {
  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   */
  constructor(wotInstance) {
    super(wotInstance);
    this.clone = this.makeClone(Overlay.CLONE_BOTTOM_LEFT_CORNER);
  }

  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {Table}
   */
  createTable(...args) {
    return new BottomLeftCornerOverlayTable(...args);
  }

  /**
   * Checks if overlay should be fully rendered.
   *
   * @returns {boolean}
   */
  shouldBeRendered() {
    const { wot } = this;

    return wot.getSetting('hasFixedRowsBottom') &&
      (wot.getSetting('hasFixedColumnsLeft') || wot.getSetting('rowHeaders').length > 0);
  }

  /**
   * Reposition the overlay.
   */
  repositionOverlay() {
    const { wtTable, rootDocument } = this.wot;
    const cloneRoot = this.clone.wtTable.holder.parentNode;
    let scrollbarWidth = getScrollbarWidth(rootDocument);

    if (wtTable.holder.clientHeight === wtTable.holder.offsetHeight) {
      scrollbarWidth = 0;
    }

    cloneRoot.style.top = '';
    cloneRoot.style.bottom = `${scrollbarWidth}px`;
  }

  /**
   * Updates the corner overlay position.
   */
  resetFixedPosition() {
    const { wot } = this;
    this.updateTrimmingContainer();

    if (!wot.wtTable.holder.parentNode) {
      // removed from DOM
      return;
    }
    const overlayRoot = this.clone.wtTable.holder.parentNode;

    overlayRoot.style.top = '';

    if (this.trimmingContainer === wot.rootWindow) {
      const box = wot.wtTable.hider.getBoundingClientRect();
      const bottom = Math.ceil(box.bottom);
      const left = Math.ceil(box.left);
      let finalLeft;
      let finalBottom;
      const bodyHeight = wot.rootDocument.body.offsetHeight;

      if (left < 0) {
        finalLeft = -left;
      } else {
        finalLeft = 0;
      }

      if (bottom > bodyHeight) {
        finalBottom = (bottom - bodyHeight);
      } else {
        finalBottom = 0;
      }
      finalBottom += 'px';
      finalLeft += 'px';

      overlayRoot.style.top = '';
      overlayRoot.style.left = finalLeft;
      overlayRoot.style.bottom = finalBottom;

    } else {
      resetCssTransform(overlayRoot);
      this.repositionOverlay();
    }

    let tableHeight = outerHeight(this.clone.wtTable.TABLE);
    const tableWidth = outerWidth(this.clone.wtTable.TABLE);

    if (!this.wot.wtTable.hasDefinedSize()) {
      tableHeight = 0;
    }

    overlayRoot.style.height = `${tableHeight}px`;
    overlayRoot.style.width = `${tableWidth}px`;
  }
}

Overlay.registerOverlay(Overlay.CLONE_BOTTOM_LEFT_CORNER, BottomLeftCornerOverlay);

export default BottomLeftCornerOverlay;
