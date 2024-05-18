import express from 'express';
import { IndexController } from '../controllers/index.controller.js';

const router = express.Router();
const indexController = new IndexController();

/**
 * Route for non-blocking endpoint.
 */
router.get('/non-blocking', indexController.nonBlockingEndpoint);

/**
 * Route for blocking endpoint.
 */
router.get('/blocking', indexController.blockingEndpoint);

export default router;
