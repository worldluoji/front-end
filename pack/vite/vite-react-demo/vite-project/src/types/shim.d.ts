// 声明类型，解决虚拟模块类型报错的问题
declare module 'virtual:*' {
    export default any;
}
