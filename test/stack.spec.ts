import Stack from '../src/stack';

let stack: Stack;

beforeEach(() => {
  stack = new Stack();
});

describe('create a new stack', () => {
  it('should set the head value to null', () => {
    expect(stack.head).toBeNull();
  });

  it('should have a default length of 0 (zero)', () => {
    expect(stack).toHaveLength(0);
  });
});

describe('add a new item to the stack', () => {
  it('should set the head to the new item if the stack is empty', () => {
    stack.push('foo');

    expect(stack.head?.value).toEqual('foo');
  });

  it('should increment the length by 1 after every insertion', () => {
    stack.push('foo');
    expect(stack).toHaveLength(1);
    stack.push('bar');
    expect(stack).toHaveLength(2);
  });

  it('should return the new length of the stack after insertion', () => {
    let returnedLength = stack.push('foo');
    expect(returnedLength).toEqual(1);
    returnedLength = stack.push('bar');
    expect(returnedLength).toEqual(2);
  });

  it('should set the newly added item as the head', () => {
    stack.push('foo');
    expect(stack.head?.value).toEqual('foo');
    stack.push('bar');
    expect(stack.head?.value).toEqual('bar');
  });
});

describe('pop an item from the stack', () => {
  it('should return null if the stack is empty', () => {
    let returnedValue = stack.pop();

    expect(returnedValue).toBeNull();
  });

  it('should decrement the length by 1 after every removal', () => {
    stack.push('foo');
    stack.push('bar');
    expect(stack).toHaveLength(2);

    stack.pop();
    expect(stack).toHaveLength(1);
  });

  it('should set the head to null if the only item was removed', () => {
    stack.push('foo');
    stack.pop();

    expect(stack.head).toBeNull();
  });

  it('should return the value of the last item added to the stack', () => {
    stack.push('foo');
    stack.push('bar');
    stack.push('baz');

    let returnedValue = stack.pop();
    expect(returnedValue).toEqual('baz');
    returnedValue = stack.pop();
    expect(returnedValue).toEqual('bar');
  });

  it('should set the next item in the stack as the new head', () => {
    stack.push('foo');
    stack.push('bar');
    stack.push('baz');

    expect(stack.head?.value).toEqual('baz');
    stack.pop();
    expect(stack.head?.value).toEqual('bar');
    stack.pop();
    expect(stack.head?.value).toEqual('foo');
  });
});
