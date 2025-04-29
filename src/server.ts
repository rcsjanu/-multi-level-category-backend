import mongoose from 'mongoose';
import app from './app';
import { connectDB } from './utils/connectDB';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
