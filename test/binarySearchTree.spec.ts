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
