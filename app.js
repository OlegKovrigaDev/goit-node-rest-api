import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

const tiny = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(tiny));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/users', authRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
