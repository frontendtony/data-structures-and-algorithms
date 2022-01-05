import Queue from '../src/queue';

let queue: Queue;

beforeEach(() => {
  queue = new Queue();
});

describe('create a new queue', () => {
  it('should have all the necessary properties', () => {
    expect(queue).toHaveProperty('head');
    expect(queue).toHaveProperty('tail');
    expect(queue).toHaveProperty('length');
  });

  it('should set the head value to null', () => {
    expect(queue.head).toBeNull();
  });

  it('should set the tail value to null', () => {
    expect(queue.tail).toBeNull();
  });

  it('should have a default length of 0 (zero)', () => {
    expect(queue).toHaveLength(0);
  });
});

describe('add a new item to the queue', () => {
  it('should set the head/tail to the new item if the queue is empty', () => {
    queue.enqueue('foo');

    expect(queue.head?.value).toEqual('foo');
    expect(queue.tail?.value).toEqual('foo');
  });

  it('should increment the length by 1 after every insertion', () => {
    queue.enqueue('foo');
    expect(queue).toHaveLength(1);
    queue.enqueue('bar');
    expect(queue).toHaveLength(2);
  });

  it('should return the new length of the queue after insertion', () => {
    let returnedLength = queue.enqueue('foo');
    expect(returnedLength).toEqual(1);
    returnedLength = queue.enqueue('bar');
    expect(returnedLength).toEqual(2);
  });

  it('should set the newly added item as the tail', () => {
    queue.enqueue('foo');
    expect(queue.tail?.value).toEqual('foo');
    queue.enqueue('bar');
    expect(queue.tail?.value).toEqual('bar');
  });
});

describe('pop an item from the queue', () => {
  it('should return null if the queue is empty', () => {
    let returnedValue = queue.dequeue();

    expect(returnedValue).toBeNull();
  });

  it('should decrement the length by 1 after every removal', () => {
    queue.enqueue('foo');
    queue.enqueue('bar');
    expect(queue).toHaveLength(2);

    queue.dequeue();
    expect(queue).toHaveLength(1);
  });

  it('should set the head/tail to null if the only item was removed', () => {
    queue.enqueue('foo');
    queue.dequeue();

    expect(queue.head).toBeNull();
    expect(queue.tail).toBeNull();
  });

  it('should return the value of the first item in the queue', () => {
    queue.enqueue('foo');
    queue.enqueue('bar');
    queue.enqueue('baz');

    let returnedValue = queue.dequeue();
    expect(returnedValue).toEqual('foo');
    returnedValue = queue.dequeue();
    expect(returnedValue).toEqual('bar');
  });

  it('should set the next item in the queue as the head', () => {
    queue.enqueue('foo');
    queue.enqueue('bar');
    queue.enqueue('baz');

    expect(queue.head?.value).toEqual('foo');
    queue.dequeue();
    expect(queue.head?.value).toEqual('bar');
    queue.dequeue();
    expect(queue.head?.value).toEqual('baz');
  });
});
