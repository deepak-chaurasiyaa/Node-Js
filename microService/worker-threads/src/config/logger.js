import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class Logger {
	constructor() {
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
			),
			transports: [
				new winston.transports.Console(),
				new DailyRotateFile({
					filename: 'logs/application-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '20m',
					maxFiles: '14d',
				}),
			],
		});

		this.stream = {
			write: (message) => {
				this.logger.info(message.trim());
			},
		};
	}

	getStream() {
		return this.stream;
	}

	logError(message) {
		this.logger.error(message);
	}

	logInfo(message) {
		this.logger.info(message);
	}
}

export default new Logger();
