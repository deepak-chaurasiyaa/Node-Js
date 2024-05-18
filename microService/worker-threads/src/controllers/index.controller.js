/**
 * Controller class for handling index routes.
 */
export class IndexController {
	/**
	 * Constructs an instance of IndexController.
	 * @param {number} counter - The initial counter value for the blocking endpoint.
	 */
	constructer(counter = 2e9) {
		this.counter = counter;
	}
	/**
	 * Handles requests to a non-blocking endpoint.
	 * @param {object} request - The Express request object.
	 * @param {object} response - The Express response object.
	 */
	nonBlockingEndpoint = async (request, response) => {
		response.status(200).send('This page is non blocking.');
	};
	/**
	 * Handles requests to a blocking endpoint by offloading the computation to a worker thread.
	 * @param {object} request - The Express request object.
	 * @param {object} response - The Express response object.
	 */
	blockingEndPoint = async (request, response) => {
		let counter = 0;
		for (let i = 0; i < 3e10; i++) {
			counter++;
		}
		response.status(200).send(`Result is ${counter}`);
	};
}
