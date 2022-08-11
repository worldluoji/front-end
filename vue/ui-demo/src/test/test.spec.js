
function sayHello(name, fn) {
    if (name == 'luoji') {
      fn()
    }
}

test('测试加法', () => {
    expect(1+2).toBe(3)
})

test('测试函数', () => {
    const fn = jest.fn()
    sayHello('luoji', fn)
    expect(fn).toHaveBeenCalled()
})

// 更多断言函数参考：https://www.jestjs.cn/docs/expect