import express from 'express';
import morgan from 'morgan';
import Logger from './config/logger.js';
import indexRouter from './routes/index.js';
import indexFourRouter from './routes/index-four.route.js';

// Initialize Express app
const app = express();

// Use Morgan to log HTTP requests, directing output to Winston via the Logger class
app.use(morgan('combined', { stream: Logger.getStream() }));

// Use routes
app.use('/', indexRouter);
app.use('/four', indexFourRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	Logger.logError(err.message);
	res.status(500).send('Something went wrong!');
});

export default app;
