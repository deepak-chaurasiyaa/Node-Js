import { parentPort } from 'worker_threads';

let counter = 0;
for (let i = 0; i < 1e12; i++) {
	counter++;
}

parentPort.postMessage(counter);
