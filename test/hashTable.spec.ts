import HashTable from '../src/hashTable';

let newHashTable: HashTable;

beforeEach(() => {
  newHashTable = new HashTable();
});

describe('create hash table', () => {
  it('should create a hash table with the specified length', () => {
    newHashTable = new HashTable(10);

    expect(newHashTable.getLength()).toEqual(10);
  });

  it('should have a default length of 53 is none is specified', () => {
    expect(newHashTable.getLength()).toEqual(53);
  });
});

describe('hashing algorithm', () => {
  it('should be deterministic (return the same output, given the same key)', () => {
    // the [bracket] notation allows access to private methods
    let hash1 = newHashTable['_hash']('foo');
    let hash2 = newHashTable['_hash']('foo');

    expect(hash1).toEqual(hash2);
  });
});

describe('insert a key/value pair into the hash table', () => {
  it('should successfully add the value to the hash table', () => {
    newHashTable.set('foo', 10);
    let returnedValue = newHashTable.get('foo');

    expect(returnedValue).toEqual(10);
  });

  it('should replace the existing value if the same key already exists', () => {
    newHashTable.set('foo', 10);
    let returnedValue = newHashTable.get('foo');

    expect(returnedValue).toEqual(10);
  });
});

describe('retrieve a value given the specified key', () => {
  it('should return undefined is no such key exists', () => {
    let returnedValue = newHashTable.get('foo');

    expect(returnedValue).toBeUndefined();
  });

  it('should return the value of the given key', () => {
    newHashTable.set('foo', 'bar');
    let returnedValue = newHashTable.get('foo');

    expect(returnedValue).toEqual('bar');
  });
});

describe('return all the keys in the hash table', () => {
  it('should return an empty array if no items have been added to the hash table', () => {
    let keys = newHashTable.keys();

    expect(keys).toHaveLength(0);
  });

  it('should return an array of keys present in the hash table', () => {
    newHashTable.set('one', 1);
    newHashTable.set('two', 2);
    newHashTable.set('three', 3);
    newHashTable.set('four', 4);

    let keys = newHashTable.keys();

    expect(keys).toContain('one');
    expect(keys).toContain('two');
    expect(keys).toContain('three');
    expect(keys).toContain('four');
  });

  it('should return the same length if a key was overriden', () => {
    newHashTable.set('one', 1);
    newHashTable.set('one', 'one');

    let keys = newHashTable.keys();

    expect(keys).toHaveLength(1);
  });
});

describe('return all the values in the hash table', () => {
  it('should return an empty array if no items have been added to the hash table', () => {
    let values = newHashTable.values();

    expect(values).toHaveLength(0);
  });

  it('should return an array of values present in the hash table', () => {
    newHashTable.set('one', 1);
    newHashTable.set('two', 2);
    newHashTable.set('three', 3);
    newHashTable.set('four', 4);

    let values = newHashTable.values();

    expect(values).toContain(1);
    expect(values).toContain(2);
    expect(values).toContain(3);
    expect(values).toContain(4);
  });

  it('should return the updated value if a key was overriden', () => {
    newHashTable.set('one', 1);
    newHashTable.set('one', 'one');

    let values = newHashTable.values();

    expect(values).toEqual(['one']);
  });
});
