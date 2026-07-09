import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
