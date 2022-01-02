import LinkedList from '../src/linkedList';

let newList: LinkedList;

beforeEach(() => {
  newList = new LinkedList();
});

describe('test create linked list', () => {
  it('should create an empty list', () => {
    expect(newList).toHaveProperty('head');
    expect(newList).toHaveProperty('tail');
    expect(newList).toHaveProperty('length');
    expect(newList).toHaveProperty('push');
    expect(newList).toHaveProperty('pop');
    expect(newList).toHaveProperty('shift');
    expect(newList).toHaveProperty('unshift');
    expect(newList).toHaveProperty('get');
    expect(newList).toHaveProperty('set');
    expect(newList).toHaveProperty('insert');
    expect(newList).toHaveProperty('remove');
    expect(newList).toHaveProperty('reverse');
  });

  it('should set the default head/tail properties to null', () => {
    expect(newList.head).toBeNull();
    expect(newList.tail).toBeNull();
  });

  it('should have a length of 0 (zero) by default', () => {
    expect(newList).toHaveLength(0);
  });
});

describe('test add new list item', () => {
  it('should set the head/tail of an empty list to the new item', () => {
    let value = 1;

    newList.push(value);

    expect(newList.head?.value).toEqual(value);
    expect(newList.tail?.value).toEqual(value);
    expect(newList).toHaveLength(1);
  });

  it('should set the tail to the new item', () => {
    newList.push(1);
    newList.push(2);

    expect(newList.tail?.value).toEqual(2);
    expect(newList).toHaveLength(2);
  });

  it('should return the linked list after adding an item', () => {
    let returnedValue = newList.push(1);

    expect(returnedValue).toEqual(newList);
  });
});

describe('remove item from the end of the list', () => {
  it('should return undefined if the list is empty', () => {
    let returnedItem = newList.pop();

    expect(returnedItem).toBeUndefined();
  });

  it('should return the removed item from the list', () => {
    newList.push(1);
    newList.push(2);
    let returnedItem = newList.pop();

    expect(returnedItem?.value).toEqual(2);
  });

  it('should decrease the length by 1 when an item is removed', () => {
    newList.push(1);
    newList.push(2);
    newList.pop();

    expect(newList).toHaveLength(1);
  });

  it('should set the correct tail value after removing an item', () => {
    newList.push(1);
    newList.push(2);
    newList.push(3);

    expect(newList.tail?.value).toEqual(3);

    newList.pop();

    expect(newList.tail?.value).toEqual(2);
  });

  it('should reset head/tail to null for a single-item list', () => {
    newList.push(1);

    expect(newList.tail?.value).toEqual(1);
    expect(newList.head?.value).toEqual(1);
    expect(newList).toHaveLength(1);

    newList.pop();

    expect(newList.tail).toBeNull();
    expect(newList.head).toBeNull();
    expect(newList).toHaveLength(0);
  });
});

describe('remove an item from the start of the list', () => {
  it('should return undefined if the list is empty', () => {
    expect(newList.shift()).toBeUndefined();
  });

  it('should remove the head and set head to the next node', () => {
    newList.push(1);
    newList.push(2);

    newList.shift();

    expect(newList.head?.value).toEqual(2);
  });

  it('should reduce the length property by one if successful', () => {
    newList.push(1);
    newList.push(2);

    expect(newList).toHaveLength(2);

    newList.shift();

    expect(newList).toHaveLength(1);
  });

  it('should return the removed item', () => {
    newList.push(1);

    let returnedItem = newList.shift();

    expect(returnedItem?.value).toEqual(1);
  });

  it('should remove the next pointer of the removed item', () => {
    newList.push(1);

    let returnedItem = newList.shift();

    expect(returnedItem?.next).toBeNull();
  });

  it('should set the tail to the head for a single-node list', () => {
    newList.push(1);
    newList.push(2);

    newList.shift();

    expect(newList.head).toEqual(newList.tail);
  });
});

describe('insert an item to the start of the list', () => {
  it('should set the newly added item as the head of the list', () => {
    newList.push(2);
    newList.push(3);

    newList.unshift(1);

    expect(newList.head?.value).toEqual(1);
  });

  it('should increment the length value by one', () => {
    newList.push(2);
    newList.push(3);

    newList.unshift(1);

    expect(newList).toHaveLength(3);
  });

  it('should set the head/tail of an empty list to the newly added item', () => {
    newList.unshift(1);

    expect(newList.head?.value).toEqual(1);
    expect(newList.head).toEqual(newList.tail);
  });

  it('should return the list after insertion', () => {
    let returnedValue = newList.unshift(1);

    expect(returnedValue).toEqual(newList);
  });
});

describe('return a node in a specific location in the list', () => {
  it('should return null if the list is empty', () => {
    let returnedValue = newList.get(0);

    expect(returnedValue).toBeNull();
  });

  it('should return null if the index is a negative value', () => {
    newList.push(1);
    let returnedValue = newList.get(-1);

    expect(returnedValue).toBeNull();
  });

  it('should return null if the index is greater than the length of the list', () => {
    newList.push(1);
    let returnedValue = newList.get(2);

    expect(returnedValue).toBeNull();
  });

  it('should return the node at the specified location', () => {
    newList.push(1);
    newList.push(2);
    let returnedValue = newList.get(1);

    expect(returnedValue?.value).toEqual(2);
  });
});

describe('override a node in a specific location in the list', () => {
  it('should return false if the index is a negative value', () => {
    newList.push(1);
    let returnedValue = newList.set(-1, 2);

    expect(returnedValue).toEqual(false);
  });

  it('should return false if the index is greater than the length of the list', () => {
    newList.push(1);
    let returnedValue = newList.set(2, 3);

    expect(returnedValue).toEqual(false);
  });

  it('should return true after a successful operation', () => {
    newList.push(1);
    newList.push(2);
    newList.set(1, 3);

    expect(newList.tail?.value).toEqual(3);
  });
});

describe('insert a value in a specific position in the list', () => {
  it('should return false if the index is a negative value', () => {
    newList.push(1);
    let returnedValue = newList.insert(-1, 2);

    expect(returnedValue).toEqual(false);
  });

  it('should return false if the index is greater than the length of the list', () => {
    newList.push(1);
    let returnedValue = newList.insert(2, 3);

    expect(returnedValue).toEqual(false);
  });

  it('should return true after a successful insertion', () => {
    newList.push(1);
    newList.push(2);
    newList.push(4);
    newList.insert(2, 3);

    expect(newList.get(2)?.value).toEqual(3);
  });

  it('should set a new head value if the index is 0 (zero)', () => {
    newList.push(1);
    newList.push(2);
    newList.push(4);
    newList.insert(0, 5);

    expect(newList.head?.value).toEqual(5);
  });

  it('should set a new tail value if the index is equal to the lenth of the list', () => {
    newList.push(1);
    newList.push(2);
    newList.push(4);
    newList.insert(3, 5);

    expect(newList.tail?.value).toEqual(5);
  });

  it('should increment the length property by 1 after a successful insertion', () => {
    newList.push(1);
    newList.push(2);
    newList.push(4);

    expect(newList).toHaveLength(3);
    newList.insert(0, 5);

    expect(newList).toHaveLength(4);
  });
});

describe('remove a node at a specific position in the list', () => {
  it('should return undefined if the index is a negative value', () => {
    newList.push(1);
    let returnedValue = newList.remove(-1);

    expect(returnedValue).toBeUndefined();
  });

  it('should return undefined if the index is greater than the length of the list', () => {
    newList.push(1);
    let returnedValue = newList.remove(2);

    expect(returnedValue).toBeUndefined();
  });

  it('should return undefined if the list is empty', () => {
    let returnedValue = newList.remove(0);

    expect(returnedValue).toBeUndefined();
  });

  it('should return the removed item', () => {
    newList.push(1);
    newList.push(2);
    newList.push(3);

    expect(newList).toHaveLength(3);

    let returnedValue = newList.remove(1);
    expect(returnedValue?.value).toEqual(2);
  });

  it('should decrement the length by 1 after removing an item', () => {
    newList.push(1);
    expect(newList).toHaveLength(1);

    newList.remove(0);
    expect(newList).toHaveLength(0);
  });

  it('should set the head/tail to null if the only item in the list was removed', () => {
    newList.push(1);
    newList.remove(0);

    expect(newList.head).toBeNull();
    expect(newList.tail).toBeNull();
  });

  it('should set a new head value if the previous head was removed', () => {
    newList.push(1);
    newList.push(2);
    newList.remove(0);

    expect(newList.head?.value).toEqual(2);
  });

  it('should set a new tail value if the previous tail was removed', () => {
    newList.push(1);
    newList.push(2);
    newList.remove(1);

    expect(newList.tail?.value).toEqual(1);
  });
});

describe('reverse the list', () => {
  it('should return the list as-is if the length is 0 or 1', () => {
    let reversedList = newList.reverse();
    expect(reversedList).toEqual(newList);

    newList.push(1);
    reversedList = newList.reverse();

    expect(newList.head?.value).toEqual(1);
    expect(newList.head).toEqual(newList.tail);
    expect(reversedList).toEqual(newList);
  });

  it('should swap the head/tail values', () => {
    newList.push(1);
    newList.push(2);

    expect(newList.head?.value).toEqual(1);
    expect(newList.tail?.value).toEqual(2);

    newList.reverse();

    expect(newList.head?.value).toEqual(2);
    expect(newList.tail?.value).toEqual(1);
  });

  it('should reverse the list in place', () => {
    newList.push(1);
    newList.push(2);
    newList.push(3);
    newList.push(4);

    newList.reverse();

    expect(newList.head?.value).toEqual(4);
    expect(newList.head?.next?.value).toEqual(3);
    expect(newList.head?.next?.next?.value).toEqual(2);
    expect(newList.head?.next?.next?.next?.value).toEqual(1);
  });
});
