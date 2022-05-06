import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

// Configure CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            // Can make api calls
            callback(null, true);
        } else {
            // Access denied
            callback(new Error('Cors error'));
        }
    }
}

app.use(cors(corsOptions));

// Routing
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});