import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
    const { name, description, createdBy, teamMembers } = req.body;

    const projectExists = await Project.findOne({ name });

    if (projectExists) {
        res.status(400);
        throw new Error('Project already exists');
    }

    const project = await Project.create({
        name,
        description,
        createdBy,
        teamMembers,
    });

    if (project) {
        res.status(201).json({
            _id: project._id,
            name: project.name,
            description: project.description,
            createdBy: project.createdBy,
            teamMembers: project.teamMembers,
        });
    } else {
        res.status(400);
        throw new Error('Invalid project data');
    }
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const count = await Project.countDocuments();
    const projects = await Project.find({})
        .populate('createdBy')
        .populate('teamMembers')
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (!projects || projects.length === 0) {
        res.status(404);
        throw new Error('No projects found');
    }

    res.status(200).json({
        projects,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

// @desc    Get project
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate('createdBy').populate('teamMembers');

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    res.status(200).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        project.createdBy = req.body.createdBy || project.createdBy;
        project.teamMembers = req.body.teamMembers || project.teamMembers;

        await project.save();

        res.status(201).json({
            _id: project._id,
            name: project.name,
            description: project.description,
            createdBy: project.createdBy,
            teamMembers: project.teamMembers,
        });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Project removed successfully' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

export {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
};

