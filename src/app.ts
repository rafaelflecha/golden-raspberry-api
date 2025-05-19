import express, { Request, Response } from 'express';
import { initDb } from './config/database';
import routes from './routes';

const app = express();

app.use(express.json());

initDb()
    .then(() => {
        console.log('Database initialized successfully');
    })
    .catch((error) => {
        console.error('Error initializing database:', error);
    });

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;
