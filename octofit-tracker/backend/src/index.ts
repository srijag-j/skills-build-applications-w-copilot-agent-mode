import express from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl } from './config/api';

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

const createResourceRoutes = (resource: string) => {
  const basePath = `/api/${resource}`;

  app.get(basePath, (_req, res) => {
    res.json({
      resource,
      count: 0,
      message: `${resource} endpoint ready`,
      apiBaseUrl,
    });
  });

  app.get(`${basePath}/:id`, (req, res) => {
    res.json({
      resource,
      id: req.params.id,
      message: `${resource} item retrieved`,
      apiBaseUrl,
    });
  });

  app.post(basePath, (req, res) => {
    res.status(201).json({
      resource,
      data: req.body,
      message: `${resource} created`,
      apiBaseUrl,
    });
  });
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

createResourceRoutes('users');
createResourceRoutes('teams');
createResourceRoutes('activities');
createResourceRoutes('leaderboard');
createResourceRoutes('workouts');

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
