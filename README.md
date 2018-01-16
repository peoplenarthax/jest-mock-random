# jest-mock-random

`Math.random()` as deterministic [Jest mock function](https://facebook.github.io/jest/docs/mock-functions.html).

## Install

```bash
~ npm install --save-dev jest-mock-random
// or
~ yarn add --dev jest-mock-random
```

## Usage

jest-mock-random is used as an additional beforeEach for your sequence of test.

```javascript
import mockRandomWith from 'jest-mock-random';

describe('Test with random usage', () => {
  mockRandomWith([0.1, 0.2, 0.3, 0.6]);
  it('assigns random the values that we want to mock in order', () => {
    const actual = [Math.random(), Math.random(), Math.random(), Math.random()]; // [0.1, 0.2, 0.3, 0.6]

    expect(actual).toEqual([0.1, 0.2, 0.3, 0.6]);
  });
});
```
mockRandomWith accept a single value that it will give back every time Math.random is called or an array of values that the mock will use as a circular array.

The values could be or a decimal number or a string that represents a decimal.

WARNING: if a no decimal value is passed it will print some warnings during the test.

```javascript
  mockRandomWith([0.1, 0.2]); // OK
  mockRandomWith([0.1, '0.2']); // OK
  mockRandomWith(['0.2', '0.2']); // OK
  mockRandomWith(0.2); // OK
  mockRandomWith('0.2'); // OK

  mockRandomWith('a'); // WARNING
  mockRandomWith(13); // WARNING
  mockRandomWith({}); // WARNING
  mockRandomWith([]); // WARNING
  mockRandomWith(['a', 1]); // WARNING
