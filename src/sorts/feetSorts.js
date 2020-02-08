const getFeetSortAscending = {
  direction: "ascending",
  func: propertyName => (objA, objB) => {
    const a = parseFloat(objA[propertyName]);
    const b = parseFloat(objB[propertyName]);
    let sortValue = 0;
    if (a < b) {
      sortValue = -1;
    } else if (a > b) {
      sortValue = 1;
    }
    return sortValue;
  }
};

const getFeetSortDescending = {
  direction: "descending",
  func: propertyName => (objA, objB) => {
    const a = parseFloat(objA[propertyName]);
    const b = parseFloat(objB[propertyName]);
    let sortValue = 0;
    if (a < b) {
      sortValue = 1;
    } else if (a > b) {
      sortValue = -1;
    }
    return sortValue;
  }
};
const feetSorts = [getFeetSortAscending, getFeetSortDescending];
export { getFeetSortAscending, getFeetSortDescending, feetSorts };
