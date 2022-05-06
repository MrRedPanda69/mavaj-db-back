import express from 'express';

import { 
    authenticate, 
    register,
    confirm,
    forgottenPassword,
    confirmToken,
    newPassword,
    profile
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Auth, register and user confirmation
router.post('/', register);         // registers new user
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/forgotten-password', forgottenPassword);
router
    .route('/forgotten-password/:token')
        .get(confirmToken)
        .post(newPassword)

router.get('/profile', checkAuth, profile);

export default router;