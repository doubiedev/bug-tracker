import express from 'express';
import {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
} from '../controllers/commentController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/', protect, getAllComments);
router.get('/:id', protect, getComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;

