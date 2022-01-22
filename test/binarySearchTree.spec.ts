import BinarySearchTree from '../src/binarySearchTree';

let newBinarySearchTree: BinarySearchTree;

beforeEach(() => {
  newBinarySearchTree = new BinarySearchTree();
});

describe('create a new binary search tree', () => {
  it('should create the tree with an empty root', () => {
    expect(newBinarySearchTree.root).toBeNull();
  });
});

describe('insert an item into the tree', () => {
  it('should set the item as the root if the tree is empty', () => {
    newBinarySearchTree.insert(10);

    expect(newBinarySearchTree.root?.value).toEqual(10);
  });

  it('should returned the updated tree after insertion', () => {
    let returnedTree = newBinarySearchTree.insert(10);

    expect(returnedTree.root?.value).toEqual(10);
    expect(returnedTree).toEqual(newBinarySearchTree);
  });

  it('should insert lesser values to the left of the parent node', () => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(5);
    newBinarySearchTree.insert(4);

    expect(newBinarySearchTree.root?.left?.value).toEqual(5);
    expect(newBinarySearchTree.root?.left?.left?.value).toEqual(4);
  });

  it('should insert greater values to the right of the parent node', () => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(15);
    newBinarySearchTree.insert(40);

    expect(newBinarySearchTree.root?.right?.value).toEqual(15);
    expect(newBinarySearchTree.root?.right?.right?.value).toEqual(40);
  });

  it('should do nothing if the value already exists', () => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(10);

    expect(newBinarySearchTree.root?.value).toEqual(10);
    expect(newBinarySearchTree.root?.left).toBeNull();
    expect(newBinarySearchTree.root?.right).toBeNull();
  });
});

describe('check if a value is in the tree', () => {
  it('should return false if the tree is empty', () => {
    expect(newBinarySearchTree.includes(10)).toEqual(false);
  });

  it('should return false if the value does not exist in the tree', () => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(11);

    expect(newBinarySearchTree.includes(12)).toEqual(false);
  });

  it('should return true if the value exists in the tree', () => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(11);
    newBinarySearchTree.insert(4);

    expect(newBinarySearchTree.includes(11)).toEqual(true);
  });
});

describe('get all values in a tree', () => {
  beforeEach(() => {
    newBinarySearchTree.insert(10);
    newBinarySearchTree.insert(6);
    newBinarySearchTree.insert(15);
    newBinarySearchTree.insert(3);
    newBinarySearchTree.insert(8);
    newBinarySearchTree.insert(20);
  });

  afterEach(() => {
    newBinarySearchTree = new BinarySearchTree();
  });

  describe('breath first search', () => {
    it('should return an empty array if the tree is empty', () => {
      newBinarySearchTree = new BinarySearchTree();
      expect(newBinarySearchTree.valuesBFS()).toHaveLength(0);
    });

    it('should return an array with the number of items in the tree', () => {
      expect(newBinarySearchTree.valuesBFS()).toHaveLength(6);
    });

    it('should return the values in the correct order', () => {
      let values = newBinarySearchTree.valuesBFS();

      expect(values).toEqual([10, 6, 15, 3, 8, 20]);
    });
  });

  describe('depth first search pre-order', () => {
    it('should return an empty array if the tree is empty', () => {
      newBinarySearchTree = new BinarySearchTree();
      expect(newBinarySearchTree.valuesDFSPreOrder()).toHaveLength(0);
    });

    it('should return an array with the number of items in the tree', () => {
      expect(newBinarySearchTree.valuesDFSPreOrder()).toHaveLength(6);
    });

    it('should return the values in the correct order', () => {
      let values = newBinarySearchTree.valuesDFSPreOrder();

      expect(values).toEqual([10, 6, 3, 8, 15, 20]);
    });
  });

  describe('depth first search post-order', () => {
    it('should return an empty array if the tree is empty', () => {
      newBinarySearchTree = new BinarySearchTree();
      expect(newBinarySearchTree.valuesDFSPostOrder()).toHaveLength(0);
    });

    it('should return an array with the number of items in the tree', () => {
      expect(newBinarySearchTree.valuesDFSPostOrder()).toHaveLength(6);
    });

    it('should return the values in the correct order', () => {
      let values = newBinarySearchTree.valuesDFSPostOrder();

      expect(values).toEqual([3, 8, 6, 20, 15, 10]);
    });
  });

  describe('depth first search in-order', () => {
    it('should return an empty array if the tree is empty', () => {
      newBinarySearchTree = new BinarySearchTree();
      expect(newBinarySearchTree.valuesDFSInOrder()).toHaveLength(0);
    });

    it('should return an array with the number of items in the tree', () => {
      expect(newBinarySearchTree.valuesDFSInOrder()).toHaveLength(6);
    });

    it('should return the values in the correct order', () => {
      let values = newBinarySearchTree.valuesDFSInOrder();

      expect(values).toEqual([3, 6, 8, 10, 15, 20]);
    });
  });
});
