import mongoose from 'mongoose';

const connectMongoDB = async (dbName: string | undefined): Promise<void> => {
  try {
    if (!dbName) {
      throw new Error('Error: Provide a Database Name');
    }
    const mongoURI = `${process.env.MONGO_URI}/${dbName}`;
    await mongoose.connect(mongoURI);
    console.log(`🛢🛢🛢🛢 MongoDB connected successfully to: ${dbName} database.`);
  } catch (error: any) {
    console.error('⚠️ MongoDB connection error:', error.message);
    console.error(error.stack);
    process.exit(1); // Exit process with failure
  }
};

export default connectMongoDB;