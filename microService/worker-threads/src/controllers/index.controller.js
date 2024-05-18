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
	constructor(counter = 2e9) {
		this.counter = counter;
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
		const workerPath = path.resolve('src/workers/worker.js');
		const worker = new Worker(workerPath, { workerData: this.counter });

		worker.on('message', (result) => {
			response.status(200).send(`Result is ${result}`);
		});

		worker.on('error', (error) => {
			response.status(500).send(`Worker error: ${error.message}`);
		});

		worker.on('exit', (code) => {
			if (code !== 0) {
				console.error(`Worker stopped with exit code ${code}`);
			}
		});
	};
}
