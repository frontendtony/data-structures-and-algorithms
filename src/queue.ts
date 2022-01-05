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
  tail: NodeItem | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: NodeItem['value']) {
    let newNode = new NodeItem(value);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return ++this.length;
  }

  dequeue(): NodeItem['value'] | null {
    if (!this.head) return null;

    let currentHead = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return currentHead.value;
  }

  peak(): NodeItem['value'] {
    return this.head;
  }
}
