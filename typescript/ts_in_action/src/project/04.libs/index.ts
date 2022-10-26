// 了解3种声明文件的编写方法，后续拓展可参考知名类库的写法

// npm i jquery    
// npm i @types/jquery --save-dev
// https://www.typescriptlang.org/dt/search?search=
import $ from 'jquery'
$('.app').css('color', 'red')

// 需编写声明文件，否则无法直接使用global-lib.js中的类库
globalLib({x: 1})
globalLib.doSomething()

// 使用moudule-lib.js  commonjs库
import moduleLib from './module-lib'
moduleLib({y: 2})
moduleLib.doSomething()

// 使用umd库
import umdLib from './umd-lib'
umdLib.doSomething()


// 模块插件和全局插件，是为了给某些类库添加一些自定义方法,
// 以下示例使用moment类库，是一个时间类库 npm i moment
import m from 'moment';

// 模块插件, 为某些已有的模块添加自定义方法
declare module 'moment' {
    export function myFunction(): void;
}
m.myFunction = () => {
    console.log('this is my defined function for moment')
}

// 全局插件，为已有的全局库添加自定义方法
declare global {
    namespace globalLib {
        function doAnyting(): void
    }
}
globalLib.doAnyting = () => {}
