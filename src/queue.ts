class NodeItem<T = any> {
  value: T;
  next: NodeItem<T> | null;

  constructor(value: NodeItem['value']) {
    this.value = value;
    this.next = null;
  }
}

export default class Queue<T = any> {
  head: NodeItem<T> | null;
  tail: NodeItem<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: T) {
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

  dequeue(): T | null {
    if (!this.head) return null;

    let currentHead = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return currentHead.value;
  }

  peak() {
    return this.head;
  }
}
