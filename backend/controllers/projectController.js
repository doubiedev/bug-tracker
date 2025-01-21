import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
    res.send('get all projects')
});

// @desc    Get project
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
    res.send('get project')
});

// @desc    Create project
// @route   POST /api/projects/:id
// @access  Private
const createProject = asyncHandler(async (req, res) => {
    res.send('create project')
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    res.send('update project')
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    res.send('delete project')
});

export {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
};

