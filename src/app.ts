import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

export default app;
