import express from 'express';

import {
    deleteProject, 
    editProject,
    getProject,
    getProjects, 
    newProject,
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router
    .route('/')
        .get(checkAuth, getProjects)
        .post(checkAuth, newProject)

router
    .route('/:id')
        .get(checkAuth, getProject)
        .put(checkAuth, editProject)
        .delete(checkAuth, deleteProject)

export default router;