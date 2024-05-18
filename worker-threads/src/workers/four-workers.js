import { parentPort, workerData } from 'worker_threads';

let counter = 0;
for (let i = 0; i < 1e12 / workerData.thread_count; i++) {
	counter++;
}

parentPort.postMessage(counter);
