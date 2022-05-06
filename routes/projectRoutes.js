import express from 'express';

import {
    addCooperator,
    deleteCooperator,
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

router.post('/add-cooperator/:id').post(checkAuth, addCooperator);
router.post('/delete-cooperator/:id').post(checkAuth, deleteCooperator);

export default router;