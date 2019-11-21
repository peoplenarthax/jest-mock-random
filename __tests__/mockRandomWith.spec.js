const {
  mockRandomForEach,
  mockRandom,
  resetMockRandom,
} = require('../index');

afterEach(() => jest.restoreAllMocks()); // avoid mock by spy too leak between test
describe('mockRandomForEach', () => {
  mockRandomForEach([0.1, 0.2, 0.3]);
  describe('Array of values', () => {
    mockRandomForEach([0.1, 0.2, 0.3]);
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
    mockRandomForEach([]);
    it('throw Error in case we pass an empty array', () => {
      try {
        Math.random();
      } catch (e) {
        expect(e).not.toBeNull();
      }
    });
  });
  describe('Singular value', () => {
    mockRandomForEach(0.1);
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
    mockRandomForEach(45);
    it('logs a warning if the singular value passed is not a decimal', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).toBeCalled();
    });
  });
  describe('Value 0', () => {
    mockRandomForEach(0);
    it('does not logs a warning if the value is 0', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).not.toBeCalled();
    });
  });
  describe('Invalid types warning with array of values', () => {
    mockRandomForEach([1, 0.5, 'a']);
    it('logs a warning if any value of the passed array is not a decimal', () => {
      const spy = jest.spyOn(global.console, 'warn');

      Math.random();

      expect(spy).toBeCalled();
    });
  });
  describe('Integration with Jest', () => {
    let b;
    mockRandomForEach(0.2);
    beforeAll(() => { b = [1]; });
    it('allows other calls to beforeAll', () => {
      const actual = [...b, Math.random()];

      expect(actual).toEqual([1, 0.2]);
    });
  });
  describe('Individual test mock random', () => {
    afterEach(() => resetMockRandom());
    it('mock random for a particular test', () => {
      mockRandom([0, 0.1, 0.2]);

      const actual = [...new Array(3)].map(() => Math.random());

      expect(actual).toEqual([0, 0.1, 0.2]);
    });
    it('mocks individually each test where is declared', () => {
      mockRandom(0.2);

      const actual = [...new Array(3)].map(() => Math.random());

      expect(actual).toEqual([0.2, 0.2, 0.2]);
    });
    it('resets the mock on resetMockRandom', () => {
      mockRandom(0.2);

      resetMockRandom();
      const actual = [...new Array(3)].map(() => Math.random());

      expect(actual).not.toEqual([0.2, 0.2, 0.2]);
    });
  });
});
