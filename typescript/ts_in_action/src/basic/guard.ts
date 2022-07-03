/*
* 类型保护： 指定区块中某个变量的确定类型，这样就可以放心的使用对应的类型，而不用搞一堆类型断言
*/

enum Type { Strong, Week }

class Java {
    helloJava() {
        console.log('Hello Java')
    }
    java: any
}

class JavaScript {
    helloJavaScript() {
        console.log('Hello JavaScript')
    }
    js: any
}

// 类型谓词，返回值是lang是否是Java
function isJava(lang: Java | JavaScript): lang is Java {
    return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
    let lang = type === Type.Strong ? new Java() : new JavaScript();
    
    if (isJava(lang)) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    // 使用类型断言，代码可读性差，不推荐
    // if ((lang as Java).helloJava) {
    //     (lang as Java).helloJava();
    // } else {
    //     (lang as JavaScript).helloJavaScript();
    // }

    // instanceof 使用instanceof，区块内会自动判断类型
    // if (lang instanceof Java) {
    //     lang.helloJava()
    //     // lang.helloJavaScript()
    // } else {
    //     lang.helloJavaScript()
    // }

    // in 通过类中的属性判断，这样区块内也会自动判断类型
    // if ('java' in lang) {
    //     lang.helloJava()
    // } else {
    //     lang.helloJavaScript()
    // }

    // typeof
    // if (typeof x === 'string') {
    //     console.log(x.length)
    // } else {
    //     console.log(x.toFixed(2))
    // }

    return lang;
}

getLanguage(Type.Week, 1)