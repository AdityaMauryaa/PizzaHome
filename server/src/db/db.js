import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...',process.env.MONGO_URI);
    await mongoose.connect(`${process.env.MONGO_URI}/pizzahome`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
export default connectDB;