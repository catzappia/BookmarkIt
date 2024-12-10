import { Schema, model, type Document } from 'mongoose';

export interface IComment extends Document {
    commentId: string,
    text: string,
    username: string
}

export const commentSchema = new Schema<IComment>({
    text: {
        type: String,
        required: true,
        maxlength: 120,
        minlength: 1
    },
    username: {
        type: String,
        required: true
    },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
)

const Comment = model<IComment>('comment', commentSchema);

export default Comment