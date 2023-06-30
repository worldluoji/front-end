/**
 * 通过Promise.all完成异步并行任务
 */

Promise.all([
    family('father').catch(() => { }),
    family('mother'),
    family('wife'),
]).then((res) => {
    // res returns a array contains results of every Promise in Promise.all
    console.log('family all agree', res)
}).catch((err) => {
    console.log(err.name + ' not agree');
})




function family(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                const error = new Error('disagree');
                error.name = name;
                reject(error);

            } else {
                resolve('agree');
            }
        }, Math.random() * 400)
    })
}

function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                const error = new Error('failed');
                error.round = round;
                reject(error);

            } else {
                resolve('success');
            }
        }, 500)
    })
}