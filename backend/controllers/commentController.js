import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
    const { issueId, commentedBy, text } = req.body;

    const comment = await Comment.create({
        issueId,
        commentedBy,
        text,
    });

    if (comment) {
        res.status(201).json({
            _id: comment._id,
            issueId: comment.issueId,
            commentedBy: comment.commentedBy,
            text: comment.text,
        });
    } else {
        res.status(400);
        throw new Error('Invalid comment data');
    }
});

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
const getAllComments = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const count = await Comment.countDocuments();
    const comments = await Comment.find({})
        .populate('issueId')
        .populate('commentedBy')
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (!comments || comments.length === 0) {
        res.status(404);
        throw new Error('No comments found');
    }

    res.status(200).json({
        comments,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

// @desc    Get comment
// @route   GET /api/comments/:id
// @access  Private
const getComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate('issueId').populate('commentedBy');

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    res.status(200).json(comment);
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
        comment.issueId = req.body.issueId || comment.issueId;
        comment.commentedBy = req.body.commentedBy || comment.commentedBy;
        comment.text = req.body.text || comment.text;

        await comment.save();

        res.status(201).json({
            _id: comment._id,
            issueId: comment.issueId,
            commentedBy: comment.commentedBy,
            text: comment.text,
        });
    } else {
        res.status(404);
        throw new Error('Comment not found');
    }
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Comment removed successfully' });
    } else {
        res.status(404);
        throw new Error('Comment not found');
    }
});

export {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
};

