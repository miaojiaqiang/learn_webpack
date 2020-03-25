// import '@babel/polyfill'

const add = function add(x, y) {
  return x + y;
};
// eslint-disable-next-line
console.log(add(1, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器');
    resolve();
  }, 1000);
});
// eslint-disable-next-line
console.log(promise);
