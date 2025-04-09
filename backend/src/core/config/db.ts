import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // לקרוא רק פעם אחת

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  //log
  process.exit(1);
}
export const connectToDatabase = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('MongoDB connected successfully!');
    })
    .catch((err: Error) => {
      console.error('Error connecting to MongoDB:', err);
    });
};
