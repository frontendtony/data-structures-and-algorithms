class NodeItem {
  value: any;
  next: NodeItem | null;

  constructor(value: NodeItem['value']) {
    this.value = value;
    this.next = null;
  }
}

export default class Stack {
  head: NodeItem | null;
  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value: NodeItem['value']) {
    let newNode = new NodeItem(value);

    if (this.head) {
      newNode.next = this.head;
    }
    this.head = newNode;

    return ++this.length;
  }

  pop(): NodeItem['value'] | null {
    if (!this.head) return null;

    let currentHead = this.head;
    this.head = this.head.next;

    this.length--;
    return currentHead.value;
  }

  peak(): NodeItem['value'] | null {
    return this.head?.value;
  }
}
