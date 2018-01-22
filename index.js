// Warning in case the passed value is not a decimal
// eslint-disable-next-line no-console
const showWarning = () => console.warn('WARNING: The value that you are using to mock random is not a decimal and it is breaking the real contract');
const isDecimal = number => number === 0 || (!Number.isNaN(number) && number % 1 !== 0);
const warnBrokenContract = (values) => {
  if (!values.map(parseFloat).every(isDecimal)) {
    showWarning();
  }
};

// Copy the global Math object in order to reset it
const mathCopy = Object.create(global.Math);
const resetMockRandom = () => {
  global.Math = mathCopy;
};

// randomMock implementation
const randomMock = (returnValues) => {
  let arrayOfValues = returnValues;
  if (!Array.isArray(returnValues)) {
    arrayOfValues = [returnValues];
  }

  let index = 0;

  return () => {
    if (arrayOfValues.length === 0) {
      throw new TypeError('The value list must contain some value');
    }
    warnBrokenContract(arrayOfValues);
    if (index >= arrayOfValues.length) {
      index = 0;
    }
    return arrayOfValues[index++];
  };
};
// Through a copy of the global Math object we mock the random method
const mockRandom = (values) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = randomMock(values);
  global.Math = mockMath;
};

// When mockRandomWith is called it create the mock beforeEach and reset it after
const mockRandomForEach = (valuesArray) => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    mockRandom(valuesArray);
  });
  // eslint-disable-next-line no-undef
  afterEach(() => {
    resetMockRandom();
  });
};


module.exports = {
  mockRandomForEach,
  mockRandom,
  resetMockRandom,
};
