const getContainsFunc = propertyName => ({
  display: "Contains",
  func: input => row => row[propertyName].includes(input)
});
const getDoesNotContainFunc = propertyName => ({
  display: "Does Not Contain",
  func: input => row => !row[propertyName].includes(input)
});

const textFilters = [getContainsFunc, getDoesNotContainFunc];
export { getContainsFunc, getDoesNotContainFunc, textFilters };
