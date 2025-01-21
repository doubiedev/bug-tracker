import express from 'express';
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getAllProjects);
// router.post('/', createProject);
// router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);


router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProject);

router.post('/', protect, checkRole(['admin', 'project-manager']), createProject);
router.put('/:id', protect, checkRole(['admin', 'project-manager']), updateProject);
router.delete('/:id', protect, checkRole(['admin']), deleteProject);

export default router;
