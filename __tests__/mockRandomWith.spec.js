const mockRandomWith = require('../index');

describe('mockRandomWith', () => {
  mockRandomWith([0.1, 0.2, 0.3]);
  it('mocks the Math random calls with the given array', () => {
    const actual = [...new Array(3)].map(() => Math.random());

    expect(actual).toEqual([0.1, 0.2, 0.3]);
  });
  it('acts like a circular array in case the number of calls excess the size of the given values', () => {
    const actual = [...new Array(6)].map(() => Math.random());

    expect(actual).toEqual([0.1, 0.2, 0.3, 0.1, 0.2, 0.3]);
  });
});
