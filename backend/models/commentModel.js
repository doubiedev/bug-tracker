import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
    {
        issueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue',
            required: true,
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
