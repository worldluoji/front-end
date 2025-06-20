# TestCafe
## 安装和运行
```shell
npm install -g testcafe
```

edge浏览器运行测试：
```shell
testcafe edge 1.hello.js
```

chrome浏览器运行测试：
```shell
testcafe chrome 1.hello.js
```

TestCafe can reload tests as you edit them. Enable live mode to take advantage of this capability:
```shell
testcafe chrome 1.hello.js --live
```

---

## fixture
TestCafe test files consist of **fixtures and tests**. A fixture is a groups of tests that share the same starting URL. Invoke the fixture keyword to create a new fixture.
```js
fixture('Getting Started')
    .page('https://devexpress.github.io/testcafe/example');
```

## test
TestCafe must declare a new test with the test method.
```js
fixture('Getting Started')
    .page('https://devexpress.github.io/testcafe/example');

test('My first test', async t => {
    // The first argument is a CSS Selector that identifies the target element (#developer-name). The second argument contains the input value 
    await t.typeText('#developer-name', 'John Smith');

    // This action requires a single argument — a CSS Keyword that identifies the target element.
    await t.click('#submit-button');
});
```

---

## references
https://testcafe.io/documentation/402635/guides/overview/getting-started