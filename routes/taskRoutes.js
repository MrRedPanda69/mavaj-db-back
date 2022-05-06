import express from 'express';

import { 
    addTask,
    changeTaskStatus,
    deleteTask,
    getTask,
    updateTask
} from '../controllers/taskController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, addTask);
router
    .route('/:id')
        .get(checkAuth, getTask)
        .put(checkAuth, updateTask)
        .delete(checkAuth, deleteTask)

router.post('/task-status/:id', checkAuth, changeTaskStatus);

export default router;