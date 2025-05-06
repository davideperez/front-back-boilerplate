import dotenv from 'dotenv';
dotenv.config();
import connectMongoDB from '../connections/mongodb.connection';
import mongoose from 'mongoose';

beforeAll(async () => {
    await connectMongoDB();
    console.log('MongoDB connection established successfully!');
});

afterAll(async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed successfully!');
});
