const getPlainSortAscending = {
  direction: "ascending",
  func: propertyName => (objA, objB) => {
    const a = objA[propertyName];
    const b = objB[propertyName];
    let sortValue = 0;
    if (a < b) {
      sortValue = -1;
    } else if (a > b) {
      sortValue = 1;
    }
    return sortValue;
  }
};

const getPlainSortDescending = {
  direction: "descending",
  func: propertyName => (objA, objB) => {
    const a = objA[propertyName];
    const b = objB[propertyName];
    let sortValue = 0;
    if (a < b) {
      sortValue = 1;
    } else if (a > b) {
      sortValue = -1;
    }
    return sortValue;
  }
};
const plainSorts = [getPlainSortAscending, getPlainSortDescending];
export { getPlainSortAscending, getPlainSortDescending, plainSorts };
