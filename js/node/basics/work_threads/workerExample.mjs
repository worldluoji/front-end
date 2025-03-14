import { workerData, parentPort } from 'worker_threads'
parentPort.postMessage({ welcome: workerData })
