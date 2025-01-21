import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        teamMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        timestamps: true,
    }
);


const Project = mongoose.model('Project', projectSchema);

export default Project;

