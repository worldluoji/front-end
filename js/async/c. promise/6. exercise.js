function case1() {
    new Promise(reslove => {
        console.log(1)
        reslove(3)
    }).then(num => {
        console.log(num)
    })

    console.log(2)
}

case1()
console.log('------------------')

function case2() {
    new Promise(resolve => {
        console.log(1)
        resolve(3)
        Promise.resolve.then(() => console.log(4))
    }).then(v => {
        console.log(v)
    })
    console.log(2)
}
case2()

function case3() {
    const list = [1, 2, 3]
    const square = num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num * num)
            }, 1000 / num)
        })
    }
    
    // forEach不能阻塞，默认会并发执行
    list.forEach(async x=> {
        const res = await square(x)
        console.log(res)
    })
}

setTimeout(() => {
    console.log('------------------')
    case3()
}, 1000)


async function case4() {
    const list = [1, 2, 3]
    const square = num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num * num)
            }, 1000 / num)
        })
    }
    
    for (let i = 0; i < list.length; i++) {
        let x = list[i]
        const res = await square(x)
        console.log(res)
    }
}

setTimeout(() => {
    console.log('------------------')
    case4()
}, 3000)