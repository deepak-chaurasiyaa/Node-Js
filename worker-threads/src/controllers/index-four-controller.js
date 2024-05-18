import { Worker } from 'worker_threads';
import path from 'path';

/**
 * Controller class for handling index routes.
 */
export class IndexController {
	/**
	 * Constructs an instance of IndexController.
	 * @param {number} counter - The initial counter value for the blocking endpoint.
	 */
	constructor(counter = 2e10) {
		this.counter = counter;
		this.THREAD_COUNT = 4;
	}

	/**
	 * Handles requests to a non-blocking endpoint.
	 * @param {object} request - The Express request object.
	 * @param {object} response - The Express response object.
	 */
	nonBlockingEndpoint = async (request, response) => {
		response.status(200).send('This page is non-blocking.');
	};

	/**
	 * Handles requests to a blocking endpoint by offloading the computation to a worker thread.
	 * @param {object} request - The Express request object.
	 * @param {object} response - The Express response object.
	 */
	blockingEndpoint = async (request, response) => {
		const workerPromises = [];
		for (let i = 0; i < this.THREAD_COUNT; i++) {
			workerPromises.push(this.createWorker());
		}
		const thread_results = await Promise.all(workerPromises);
		const total = thread_results.reduce((acc, curr) => acc + curr, 0);
		response.status(200).send(`Result is ${total}`);
	};
	createWorker() {
		return new Promise((resolve, rejects) => {
			const workerPath = path.resolve('src/workers/four-workers.js');
			const worker = new Worker(workerPath, { workerData: { thread_count: this.THREAD_COUNT } });
			worker.on('message', (result) => {
				resolve(result);
			});

			worker.on('error', (error) => {
				rejects(`Worker error: ${error.message}`);
			});

			worker.on('exit', (code) => {
				if (code !== 0) {
					console.error(`Worker stopped with exit code ${code}`);
				}
			});
		});
	}
}
