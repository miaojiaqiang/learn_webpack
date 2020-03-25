import { mul } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
// eslint-disable-next-line
console.log(mul(3,1))


// 注册serviceworker
// 处理兼容性问题
/*
1.eslint 不认识 window、navigator全局变量
  解决：修改package.json中eslintConfig配置
    "env": {
        "browser"： true  // 支持浏览器中的变量
     }
 2. serviceworker 必须运行在服务器上
    --》 nodejs
    --》
      npm i serve -g
      serve -s build 启动服务器，将build目录下资源作为服务器
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('success');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('fail');
      });
  });
}
