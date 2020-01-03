import ViewSizeSet from './viewSizeSet';
import ViewDiffer from './viewDiffer';

/**
 * Executive model for each table renderer. It's responsible for injecting DOM nodes in a
 * specified order and adjusting the number of elements in the root node.
 *
 * Only this class have rights to juggling DOM elements within the root node (see render method).
 *
 * @class {OrderView}
 */
export default class OrderView {
  constructor(rootNode, nodesPool) {
    /**
     * The root node to manage with.
     *
     * @type {HTMLElement}
     */
    this.rootNode = rootNode;
    /**
     * Factory for newly created DOM elements.
     *
     * @type {Function}
     */
    this.nodesPool = nodesPool;
    /**
     * Holder for sizing and positioning of the view.
     *
     * @type {ViewSizeSet}
     */
    this.sizeSet = new ViewSizeSet();
    /**
     * The visual index of currently processed row.
     *
     * @type {Number}
     */
    this.visualIndex = 0;
    /**
     * The list of DOM elements which are rendered for this render cycle.
     *
     * @type {HTMLElement[]}
     */
    this.collectedNodes = [];
    /**
     * @type {ViewDiffer}
     */
    this.viewDiffer = new ViewDiffer(this.sizeSet);
    /**
     * @type {Number[]}
     */
    this.staleNodeIndexes = [];
    /**
     * @type {Array[]}
     */
    this.leads = [];
  }

  /**
   * Sets the size for rendered elements. It can be a size for rows, cells or size for row
   * headers etc. it depends for what table renderer this instance was created.
   *
   * @param {Number} size
   * @returns {OrderView}
   */
  setSize(size) {
    this.sizeSet.setSize(size);

    return this;
  }

  /**
   * Sets the offset for rendered elements. The offset describes the shift between 0 and
   * the first rendered element according to the scroll position.
   *
   * @param {Number} offset
   * @returns {OrderView}
   */
  setOffset(offset) {
    this.sizeSet.setOffset(offset);

    return this;
  }

  /**
   * @param {Number} sourceIndex
   * @returns {Boolean}
   */
  hasStaleContent(sourceIndex) {
    return this.staleNodeIndexes.includes(sourceIndex);
  }

  /**
   * Checks if this instance of the view shares the root node with another instance. This happens only once when
   * a row (TR) as a root node is managed by two OrderView instances. If this happens another DOM injection
   * algorithm is performed to achieve consistent order.
   *
   * @returns {Boolean}
   */
  isSharedViewSet() {
    return this.sizeSet.isShared();
  }

  /**
   * Returns rendered DOM element based on visual index.
   *
   * @param {Number} visualIndex
   * @returns {HTMLElement}
   */
  getNode(visualIndex) {
    return visualIndex < this.collectedNodes.length ? this.collectedNodes[visualIndex] : null;
  }

  /**
   * Returns currently processed DOM element.
   *
   * @returns {HTMLElement}
   */
  getCurrentNode() {
    const length = this.collectedNodes.length;

    return length > 0 ? this.collectedNodes[length - 1] : null;
  }

  /**
   * Setups and prepares all necessary properties and start the rendering process.
   * This method has to be called only once (at the start) for the render cycle.
   */
  start() {
    // @TODO(perf-tip): If view axis position doesn't change (scroll in a different direction) this can be
    // optimized by reusing previously collected nodes.
    this.collectedNodes.length = 0;
    this.visualIndex = 0;
    this.staleNodeIndexes.length = 0;
    this.leads = this.viewDiffer.diff();
  }

  /**
   * Renders the DOM element based on visual index (which is calculated internally).
   * This method has to be called as many times as the size count is met (to cover all previously rendered DOM elements).
   */
  render() {
    if (this.leads.length > 0) {
      this.applyCommand(this.leads.shift());
    }
  }

  /**
   * @param {Array} command
   */
  applyCommand(command) {
    const { rootNode, collectedNodes } = this;
    const [name, nodeIndex, nodePrevIndex, nodeIndexToRemove] = command;
    const node = this.nodesPool(nodeIndex);

    collectedNodes.push(node);

    // @TODO(perf-tip): Only nodes which are first time rendered (hasn't any inner content) can be marked as stale
    // e.q `name !== 'none' && !node.firstChild`.
    if (name !== 'none') {
      this.staleNodeIndexes.push(nodeIndex);
    }

    switch (name) {
      case 'prepend':
        rootNode.insertBefore(node, rootNode.firstChild);
        break;
      case 'append':
        rootNode.appendChild(node);
        break;
      case 'insert_before':
        rootNode.insertBefore(node, this.nodesPool(nodePrevIndex));
        // To keep the constant length of child nodes (after inserting a node) remove the last child.
        rootNode.removeChild(this.nodesPool(nodeIndexToRemove));
        break;
      case 'replace':
        rootNode.replaceChild(node, this.nodesPool(nodePrevIndex));
        break;
      case 'remove':
        rootNode.removeChild(node);
        break;
      default:
        break;
    }
  }

  /**
   * Ends the render process.
   * This method has to be called only once (at the end) for the render cycle.
   */
  end() {
    while (this.leads.length > 0) {
      this.applyCommand(this.leads.shift());
    }
  }
}
