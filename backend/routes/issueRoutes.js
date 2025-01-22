import express from 'express';
import {
    getAllIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
} from '../controllers/issueController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createIssue);
router.get('/', protect, getAllIssues);
router.get('/:id', protect, getIssue);
router.put('/:id', protect, updateIssue);
router.delete('/:id', protect, deleteIssue);

export default router;

