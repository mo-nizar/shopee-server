import mongoose from 'mongoose';

const dbConnect = async (): Promise<void> => {
  const MONGOURL = process.env.MONGO_URL;
  if (!MONGOURL) {
    throw new Error('MONGO_URL is not defined in environment variables');
  }

  try {
    await mongoose.connect(MONGOURL);
    console.log('Database is connected successfully');
  } catch (e) {
    console.log('Database connection failed', e);
    throw e; // Rethrow the error to handle it in the server initialization
  }
};

export default dbConnect;