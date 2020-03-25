

import '../css/index.less'
import '../css/index.css'


console.log(211);

import printMe from './print'

printMe()

if (module.hot) {
    // 一但 moodule.hot为true，说明开启的HMR功能。 --》让HMR功能生效
    module.hot.accept('./print.js',function(){
        // 方法会监听pintMe文件的变化，一旦变化，其他默认不会重新打包构建
        // 会执行后面的回调
        printMe()
    })
}