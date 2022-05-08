import express from 'express';

import {
    newCollaborator,
    deleteCollaborator,
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

router.post('/new-collaborator/:id').post(checkAuth, newCollaborator);
router.post('/delete-collaborator/:id').post(checkAuth, deleteCollaborator);

export default router;