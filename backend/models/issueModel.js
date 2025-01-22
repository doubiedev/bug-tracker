import mongoose from 'mongoose';

const issueSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ['epic', 'story', 'task', 'bug', 'subtask'],
            required: true,
        },
        status: {
            type: String,
            enum: ['open', 'in-progress', 'resolved', 'closed'],
            default: 'open',
            required: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium',
            required: true,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue',
        },
        labels: {
            type: [String],
            default: [],
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        attachments: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

issueSchema.index({ title: 1, projectId: 1 }, { unique: true });

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
