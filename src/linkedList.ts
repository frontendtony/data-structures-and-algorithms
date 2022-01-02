class NodeItem {
  value: string | number | null;
  next: NodeItem | null;

  constructor(value: NodeItem['value']) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  head: NodeItem | null;
  tail: NodeItem | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Add a new node to the end of the list. The newly added node becomes the tail
   * @param value the value to be added to the list
   */
  push(value: NodeItem['value']): LinkedList {
    let newNode = new NodeItem(value);

    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = this.head;
    }

    this.length++;
    return this;
  }

  /**
   * Removes the last node (tail) from the list
   */
  pop(): NodeItem | undefined {
    if (!this.head) return undefined;

    let currentNode = this.head;
    let newTail = currentNode;

    while (currentNode.next) {
      newTail = currentNode;
      currentNode = currentNode.next;
    }

    newTail.next = null;
    this.tail = newTail;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return currentNode;
  }

  /**
   * Removes the first node (head) from the list
   */
  shift(): NodeItem | undefined {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = this.head;
    }

    return currentHead;
  }

  /**
   * Add a new node item to the start of the list. The newly added node becomes the haed
   * @param value the value to be added to the list
   */
  unshift(value: NodeItem['value']): LinkedList {
    let newNode = new NodeItem(value);

    newNode.next = this.head;
    this.head = newNode;

    if (!this.tail) {
      this.tail = this.head;
    }

    this.length++;

    return this;
  }

  /**
   * Return the node at the given position in the list
   * @param index the position of the node in the list
   */
  get(index: number): NodeItem | null {
    if (index > this.length) return null;
    if (index < 0) return null;
    if (!this.head) return null;

    let currentNode: NodeItem | null = this.head;

    let currentIndex = 0;

    do {
      if (currentIndex === index) {
        return currentNode;
      } else {
        currentIndex++;
        currentNode = currentNode?.next;
      }
    } while (currentNode?.next && index < this.length);

    return currentNode;
  }

  /**
   * Overrides a new at a given location in the list. Time Complexity: O(N)
   * @param index the location of the item in the list
   * @param value the value of the new node
   */
  set(index: number, value: NodeItem['value']): boolean {
    let foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Adds a new value to the list in the specified position. Time Complexity: O(N)
   * @param index the position to add the value
   * @param value the value to be added
   */
  insert(index: number, value: NodeItem['value']): boolean {
    if (index < 0) return false;
    if (index > this.length) return false;

    if (index === 0) {
      return !!this.unshift(value);
    }
    if (index === this.length) {
      return !!this.push(value);
    }

    let newNode = new NodeItem(value);
    let nodeAtPreviousIndex = this.get(index - 1) as NodeItem; // we're certain the node exists at this point
    newNode.next = nodeAtPreviousIndex?.next ?? null;
    nodeAtPreviousIndex.next = newNode;

    return true;
  }

  /**
   * Deletes a node in the specified position from the list. Time Complexity: O(N)
   * @param index the position of the item in the list
   */
  remove(index: number): NodeItem | undefined {
    if (index < 0) return undefined;
    if (index > this.length - 1) return undefined;
    if (!this.head) return undefined;

    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let returnedNode = this.get(index - 1) as NodeItem; // we're certain the node exists at this point
    let removedItem = returnedNode.next;

    returnedNode.next = removedItem?.next ?? null;

    return removedItem ?? undefined;
  }

  /**
   * Inverts the order of the items in the list, in place, without creating a new list
   */
  reverse(): LinkedList {
    if (this.length < 2) return this;

    let previousNode = this.head;
    let currentNode = this.head?.next;
    let nextNode = currentNode?.next;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    let copyOfhead = this.head;
    this.head = this.tail;
    this.tail = copyOfhead;

    return this;
  }
}
