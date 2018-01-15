// Copy the global Math object in order to reset it
const mathCopy = Object.create(global.Math);

const resetMathRandom = () => {
  global.Math = mathCopy;
};

// randomMock implementation
const randomMock = (returnValues) => {
  if (!Array.isArray(returnValues)) {
    return () => returnValues;
  }
  let index = 0;

  return () => {
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
