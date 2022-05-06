import express from 'express';
const router = express.Router();

import { authenticate, register } from '../controllers/userController.js';

// Auth, register and user confirmation
router.post('/', register);         // registers new user
router.post('/login', authenticate);

export default router;