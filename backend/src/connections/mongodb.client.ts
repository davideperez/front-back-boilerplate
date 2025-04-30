import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/my_database'; // Use environment variable or default
    await mongoose.connect(mongoURI);
    console.log('🌿 MongoDB connected successfully');
  } catch (error) {
    console.error('⚠️ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectMongoDB;