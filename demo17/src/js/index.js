function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));


/*
  通过js代码，让某个文件单独打包成多个chunk
  import 动态导入语法
  通过注释 可以控制打包后的文件名
 */
import(/* webpackChunkName: 'test' */'./test')
    .then(({mul,count}) => {

      // eslint-disable-next-line
      console.log(mul(3,1))
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log('文件加载失败')
    })