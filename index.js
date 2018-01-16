// Warning in case the passed value is not a decimal
// eslint-disable-next-line no-console
const showWarning = () => console.warn('The value that you are using to mock random is not a decimal and it is breaking the real contract');
const isDecimal = number => !Number.isNaN(number) && number % 1 !== 0;
const warnBrokenContract = (values) => {
  if (!Array.isArray(values)) {
    if (!isDecimal(values)) { showWarning(); }
  } else if (!values.map(parseFloat).every(isDecimal)) {
    showWarning();
  }
};

// Copy the global Math object in order to reset it
const mathCopy = Object.create(global.Math);
const resetMathRandom = () => {
  global.Math = mathCopy;
};

// randomMock implementation
const randomMock = (returnValues) => {
  if (!Array.isArray(returnValues)) {
    const number = parseFloat(returnValues);
    return () => {
      warnBrokenContract(number);
      return number;
    };
  }
  let index = 0;

  return () => {
    warnBrokenContract(returnValues);
    if (index >= returnValues.length) {
      index = 0;
    }
    return returnValues[index++];
  };
};

// Through a copy of the global Math object we mock the random method
const createMathRandomMock = (values) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = randomMock(values);
  global.Math = mockMath;
};

// When mockRandomWith is called it create the mock beforeEach and reset it after
const mockRandomWith = (valuesArray) => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    createMathRandomMock(valuesArray);
  });
  // eslint-disable-next-line no-undef
  afterEach(() => {
    resetMathRandom();
  });
};


module.exports = mockRandomWith;
