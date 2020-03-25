console.log('index 加载')

// import { mul } from './test'


document.getElementById('btn').onclick = function() {
    // 懒加载 当文件需要时才加载
    // prefetch 预先加载 ：   等其他资源下载完毕，浏览器空闲了，在偷偷加载
    import(/* webpackChunkName: 'test',webpackPrefetch:true */'./test')
        .then(({mul}) => {
            console.log(mul(4,5))
        })
}