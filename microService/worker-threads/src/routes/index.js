import express from 'express';
import Logger from '../config/logger.js';

const router = express.Router();

router.get('/', (req, res) => {
	Logger.logInfo('Hello, World! endpoint was hit');
	Logger.logError('Hello, World! endpoint was hit');
	res.send('Hello, World!');
});

export default router;
