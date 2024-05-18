import express from 'express';
import Logger from '../config/logger.js';
import { IndexController } from '../controllers/index.controller.js';

const router = express.Router();

const { nonBlockingEndpoint, blockingEndPoint } = new IndexController();

router.get('/', (req, res) => {
	Logger.logInfo('Hello, World! endpoint was hit');
	res.send('Hello, World!');
});

router.get('/non-blocking-endpoint', nonBlockingEndpoint);

router.get('/blocking-endpoint', blockingEndPoint);

export default router;
