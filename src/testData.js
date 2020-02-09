const getRandomInt = () => {
  return Math.ceil(Math.random() * 100);
};
const getRandomFeet = () => {
  return `${getRandomInt()} ft`;
};
const getRandomString = () => {
  return Math.random()
    .toString(36)
    .substring(2, 15);
};
const getRandomObject = () => ({
  a: getRandomInt(),
  b: getRandomFeet(),
  c: getRandomString()
});
// eslint-disable-next-line no-unused-vars
const testData = new Array(10000).fill(null).map(_ => getRandomObject());

export { testData };
