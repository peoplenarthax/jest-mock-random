const mockRandomWith = require('../index');

describe('mockRandomWith', () => {
  mockRandomWith([0.1, 0.2, 0.3]);
  describe('Array of values', () => {
    mockRandomWith([0.1, 0.2, 0.3]);
    it('mocks the Math random calls with the given array', () => {
      const actual = [...new Array(3)].map(() => Math.random());

      expect(actual).toEqual([0.1, 0.2, 0.3]);
    });
    it('acts like a circular array in case the number of calls excess the size of the given values', () => {
      const actual = [...new Array(6)].map(() => Math.random());

      expect(actual).toEqual([0.1, 0.2, 0.3, 0.1, 0.2, 0.3]);
    });
    it('does not log a warning if all the values of the array are valid', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).not.toBeCalled();
    });
  });
  describe('Corner case', () => {
    mockRandomWith([]);
    it('throw Error in case we pass an empty array', () => {
      const actual = () => Math.random();

      expect(actual).toThrow(TypeError);
    });
  });
  describe('Singular value', () => {
    mockRandomWith(0.1);
    it('returns always the same value in case of passing a singular integer', () => {
      const actual = [...new Array(3)].map(() => Math.random());

      expect(actual).toEqual([0.1, 0.1, 0.1]);
    });
    it('does not log a warning if value is correct', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).not.toBeCalled();
    });
  });
  describe('Invalid types warning with single value', () => {
    mockRandomWith(45);
    it('logs a warning if the singular value passed is not a decimal', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).toBeCalled();
    });
  });
  describe('Invalid types warning with array of values', () => {
    mockRandomWith([1, 0.5, 'a']);
    it('logs a warning if any value of the passed array is not a decimal', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).toBeCalled();
    });
  });
  describe('Integration with Jest', () => {
    let b;
    mockRandomWith(0.2);
    beforeAll(() => { b = [1]; });
    it('allows other calls to beforeAll', () => {
      const actual = [...b, Math.random()];

      expect(actual).toEqual([1, 0.2]);
    });
  });
});
