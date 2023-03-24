const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns string when given number as value of the kew partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 37});
    expect(trivialKey).toBe('37');
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns string '[37,34]' when given array of numbers as value of the kew partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: [37, 34]});
    expect(trivialKey).toBe('[37,34]');
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns an string when given an array and the length of the string is 128", () => {
    const trivialKey = deterministicPartitionKey(['string1', 'string2']);
    expect(typeof trivialKey).toBe('string');
    expect(trivialKey).toHaveLength(128);
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns an string when given an object and the length of the string is 128", () => {
    const trivialKey = deterministicPartitionKey({key1: 'value1', key2: 3});
    expect(typeof trivialKey).toBe('string');
    expect(trivialKey).toHaveLength(128);
  });
});
describe("deterministicPartitionKey", () => {
  it("Returns an string when given an object and the length of the string is 128", () => {
    const trivialKey = deterministicPartitionKey({key1: 'value1', key2: 3, ss: 'This is a long string', key4: ['string', 2, {key1: 'string'}]});
    expect(typeof trivialKey).toBe('string');
    expect(trivialKey).toHaveLength(128);
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns an '37' when given an object with the key partitionKey and value 37 regardless of the others key/value", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 37, key2: 3});
    expect(trivialKey).toBe('37');
  });
});



