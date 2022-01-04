export default class HashTable {
  private dataStore: Array<HashTableLinkedList>;

  constructor(size = 53) {
    this.dataStore = new Array(size);
  }

  /**
   * Hashes the specified key to a number between 0 (zero) and the specified `upperLimit` value (excluding the `upperLimit`)
   * @param key the string to be hashed
   * @param upperLimit the upper limit of the resulting hash number
   */
  private _hash(key: string) {
    let newIndex = 0;
    let RANDOM_PRIME = 17;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let encoding = key[i].charCodeAt(0) - 96;
      newIndex = (newIndex * RANDOM_PRIME + encoding) % this.dataStore.length;
    }

    return newIndex;
  }

  public getLength() {
    return this.dataStore.length;
  }

  set(key: string, value: any) {
    let index = this._hash(key);

    if (this.dataStore[index]) {
      this.dataStore[index].set(key, value);
    } else {
      this.dataStore[index] = new HashTableLinkedList(key, value);
    }
  }

  get(key: string) {
    let index = this._hash(key);

    return this.dataStore[index]?.get(key)?.value;
  }

  keys() {
    let allKeys: Array<string | number> = [];

    this.dataStore.forEach((list) => {
      for (let item of list) {
        if (item) allKeys.push(item.key);
      }
    });

    return allKeys;
  }

  values() {
    let allValues: Array<any> = [];

    this.dataStore.forEach((list) => {
      for (let item of list) {
        if (item) allValues.push(item.value);
      }
    });

    return allValues;
  }
}

class HashTableNode {
  key: string;
  value: any;
  next: HashTableNode | null;

  constructor(key: HashTableNode['key'], value: HashTableNode['value']) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTableLinkedList {
  head: HashTableNode | null;
  tail: HashTableNode | null;
  length: number;

  constructor(key: HashTableNode['key'], value: HashTableNode['value']) {
    this.head = new HashTableNode(key, value);
    this.tail = this.head;
    this.length = 0;
  }

  /**
   * Return the node at the given position in the list
   * @param index the position of the node in the list
   */
  get(key: string): HashTableNode | undefined {
    if (!this.head) return undefined;

    let currentNode: HashTableNode | null = this.head;
    let foundNode: HashTableNode | undefined = undefined;

    while (currentNode?.next || !foundNode) {
      if (currentNode?.key === key) {
        foundNode = currentNode;
      } else {
        currentNode = currentNode?.next ?? null;
      }
    }

    return foundNode;
  }

  /**
   * Adds/replaces an item in the list. Time Complexity: O(N)
   * @param key the key of the node
   * @param value the value of the node
   */
  set(key: HashTableNode['key'], value: HashTableNode['value']) {
    let foundNode = this.get(key);

    if (foundNode) {
      foundNode.value = value;
    } else {
      this.#push(key, value);
    }
  }

  /**
   * Add a new node to the end of the list. The newly added node becomes the tail
   * @param value the value to be added to the list
   */
  #push(key: string, value: HashTableNode['value']): HashTableLinkedList {
    let newNode = new HashTableNode(key, value);

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

  [Symbol.iterator]() {
    let currentNode = this.head;

    return {
      next: () => {
        if (currentNode === null) return { done: true };

        let returnNode = currentNode;
        currentNode = currentNode?.next;

        return {
          value: returnNode,
          done: !!currentNode,
        };
      },
    };
  }
}
