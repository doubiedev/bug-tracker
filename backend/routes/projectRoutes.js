import express from 'express';
import {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, checkRole(['admin', 'project-manager']), createProject);
router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProject);
router.put('/:id', protect, checkRole(['admin', 'project-manager']), updateProject);
router.delete('/:id', protect, checkRole(['admin']), deleteProject);

export default router;
