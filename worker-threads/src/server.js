import app from './app.js';
import Logger from './config/logger.js';

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Logger.logInfo(`Server is running on port ${PORT}`);
});
