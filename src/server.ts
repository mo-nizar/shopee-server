import App from './config/app';
import dbConnect from './db';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;

const startServer = async () => {
  try {
    await dbConnect(); // Wait for the database connection to be established
    const app = await App();
    app.listen(PORT, () => {
      console.log('Express server listening on port ' + PORT);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
