const getIsEqualToFunc = propertyName => ({
  display: "Equal To",
  func: input => row => row[propertyName] === Number(input)
});

const getIsGreaterThanFunc = propertyName => ({
  display: "Greater Than",
  func: input => row => row[propertyName] > Number(input)
});
const getIsLessThanFunc = propertyName => ({
  display: "Less Than",
  func: input => row => row[propertyName] < Number(input)
});

const numberFilters = [
  getIsEqualToFunc,
  getIsGreaterThanFunc,
  getIsLessThanFunc
];
export {
  getIsEqualToFunc,
  getIsGreaterThanFunc,
  getIsLessThanFunc,
  numberFilters
};
