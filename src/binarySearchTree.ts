class NodeItem {
  left: NodeItem | null;
  right: NodeItem | null;
  value: number;

  constructor(value: NodeItem['value']) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export default class BinarySearchTree {
  root: NodeItem | null;

  constructor() {
    this.root = null;
  }

  #insert(node: NodeItem, parent: NodeItem | null): BinarySearchTree {
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

  #includes(value: NodeItem['value'], node: NodeItem): boolean {
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

  insert(value: NodeItem['value']): BinarySearchTree {
    let newNode = new NodeItem(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    return this.#insert(newNode, this.root);
  }

  includes(value: NodeItem['value']): boolean {
    if (!this.root) return false;
    return this.#includes(value, this.root);
  }
}
