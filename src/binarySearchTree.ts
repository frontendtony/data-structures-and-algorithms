import Queue from './queue';

class NodeItem<T = any> {
  left: NodeItem<T> | null;
  right: NodeItem<T> | null;
  value: T;

  constructor(value: NodeItem['value']) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export default class BinarySearchTree<T = any> {
  root: NodeItem | null;

  constructor() {
    this.root = null;
  }

  #insert(node: NodeItem<T>, parent: NodeItem<T> | null): BinarySearchTree {
    if (!parent) {
      parent = node;
    } else if (node.value > parent.value) {
      if (parent.right) {
        return this.#insert(node, parent.right);
      }
      parent.right = node;
    } else if (node.value < parent.value) {
      if (parent.left) {
        return this.#insert(node, parent.left);
      }
      parent.left = node;
    }
    return this;
  }

  #includes(value: T, node: NodeItem<T>): boolean {
    if (value === node.value) {
      return true;
    } else if (value < node.value) {
      if (!node.left) return false;
      return this.#includes(value, node.left);
    } else {
      if (!node.right) return false;
      return this.#includes(value, node.right);
    }
  }

  #traverseDFSPreOrder(node: NodeItem<T>, values: T[] = []): T[] {
    values.push(node.value);

    if (node.left) this.#traverseDFSPreOrder(node.left, values);
    if (node.right) this.#traverseDFSPreOrder(node.right, values);

    return values;
  }

  #traverseDFSPostOrder(node: NodeItem<T>, values: T[] = []): T[] {
    if (node.left) this.#traverseDFSPostOrder(node.left, values);
    if (node.right) this.#traverseDFSPostOrder(node.right, values);
    values.push(node.value);

    return values;
  }

  #traverseDFSInOrder(node: NodeItem<T>, values: T[] = []): T[] {
    if (node.left) this.#traverseDFSInOrder(node.left, values);
    values.push(node.value);
    if (node.right) this.#traverseDFSInOrder(node.right, values);

    return values;
  }

  insert(value: T): BinarySearchTree {
    let newNode = new NodeItem(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    return this.#insert(newNode, this.root);
  }

  includes(value: T): boolean {
    if (!this.root) return false;
    return this.#includes(value, this.root);
  }

  valuesBFS() {
    let returnValues: T[] = [];

    for (let value of this) {
      if (value) returnValues.push(value);
    }
    return returnValues;
  }

  /**
   * Returns the values in the order that makes it possible to reconstruct the tree
   */
  valuesDFSPreOrder() {
    if (!this.root) return [];
    return this.#traverseDFSPreOrder(this.root, []);
  }

  valuesDFSPostOrder() {
    if (!this.root) return [];
    return this.#traverseDFSPostOrder(this.root, []);
  }

  /**
   * Returns the values in adcending order
   */
  valuesDFSInOrder() {
    if (!this.root) return [];
    return this.#traverseDFSInOrder(this.root, []);
  }

  /**
   * This implements the breath first search (BFS) algorithm
   */
  [Symbol.iterator]() {
    let queue = new Queue<NodeItem<T>>();

    if (this.root) queue.enqueue(this.root);

    return {
      next() {
        let currentQueueItem = queue.dequeue();

        if (!currentQueueItem) {
          return {
            done: true,
          };
        }

        if (currentQueueItem.left) queue.enqueue(currentQueueItem.left);
        if (currentQueueItem.right) queue.enqueue(currentQueueItem.right);

        return {
          value: currentQueueItem.value,
          done: false,
        };
      },
    };
  }
}
