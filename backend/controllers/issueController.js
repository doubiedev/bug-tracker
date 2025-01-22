import asyncHandler from 'express-async-handler';
import Issue from '../models/issueModel.js';

// @desc    Create issue
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
    const { title, description, type, status, priority, projectId, parentId, labels, assignedTo, attachments } = req.body;

    const issueExistsForProject = await Issue.findOne({ title, projectId });

    if (issueExistsForProject) {
        res.status(400);
        throw new Error('Issue already exists for that ProjectId');
    }

    const issue = await Issue.create({
        title,
        description,
        type,
        status,
        priority,
        projectId,
        parentId,
        labels,
        assignedTo,
        attachments,
    });

    if (issue) {
        res.status(201).json({
            _id: issue._id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            priority: issue.priority,
            projectId: issue.projectId,
            parentId: issue.parentId,
            labels: issue.labels,
            assignedTo: issue.assignedTo,
            attachments: issue.attachments,
        });
    } else {
        res.status(400);
        throw new Error('Invalid issue data');
    }
});

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
const getAllIssues = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const count = await Issue.countDocuments();
    const issues = await Issue.find({})
        .populate('projectId')
        .populate('parentId')
        .populate('assignedTo')
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (!issues || issues.length === 0) {
        res.status(404);
        throw new Error('No issues found');
    }

    res.status(200).json({
        issues,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

// @desc    Get issue
// @route   GET /api/issues/:id
// @access  Private
const getIssue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const issue = await Issue.findById(id).populate('projectId').populate('parentId').populate('assignedTo');

    if (!issue) {
        res.status(404);
        throw new Error('Issue not found');
    }

    res.status(200).json(issue);
});

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findById(req.params.id);

    if (issue) {
        issue.title = req.body.title || issue.title;
        issue.description = req.body.description || issue.description;
        issue.type = req.body.type || issue.type;
        issue.status = req.body.status || issue.status;
        issue.priority = req.body.priority || issue.priority;
        issue.projectId = req.body.projectId || issue.projectId;
        issue.parentId = req.body.parentId || issue.parentid;
        issue.labels = req.body.labels || issue.labels;
        issue.assignedTo = req.body.assignedTo || issue.assignedTo;
        issue.attachments = req.body.attachments || issue.attachments;

        await issue.save();

        res.status(201).json({
            _id: issue._id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            priority: issue.priority,
            projectId: issue.projectId,
            parentId: issue.parentId,
            labels: issue.labels,
            assignedTo: issue.assignedTo,
            attachments: issue.attachments,
        });
    } else {
        res.status(404);
        throw new Error('Issue not found');
    }
});

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findById(req.params.id);
    if (issue) {
        await Issue.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Issue removed successfully' });
    } else {
        res.status(404);
        throw new Error('Issue not found');
    }
});

export {
    createIssue,
    getAllIssues,
    getIssue,
    updateIssue,
    deleteIssue,
};
