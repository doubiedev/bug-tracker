import express from 'express';
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/:id', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
