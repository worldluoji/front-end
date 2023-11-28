const { Worker } = require('worker_threads')

const runWorker = (workerData) => {
    return new Promise((resolve, reject) => {
        // 引入 workerExample.js `工作线程`脚本文件
        const worker = new Worker('./workerExample.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

const main = async () => {
    const result = await runWorker('hello worker threads')
    console.log(result);
}

main().catch(err => console.error(err))
