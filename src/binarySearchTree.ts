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

  values() {
    let returnValues: T[] = [];

    for (let value of this) {
      if (value) returnValues.push(value);
    }
    return returnValues;
  }

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
