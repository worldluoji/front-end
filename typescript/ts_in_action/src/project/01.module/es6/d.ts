
// 这就相当于commonjs中的module.export, ts对其做了兼容，使得es6规范、commonjs规范的模块都可以直接导入它
export = function () {
    console.log("I'm default")
}
// export let a = 1  不能再有其它导出，否则上面报错