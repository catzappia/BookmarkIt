import { Schema, model, type Document } from 'mongoose';
import { IComment, commentSchema } from './Comment.js';


export interface IPost extends Document {
    postId: string,
    text: string,
    username: string,
    comments?: IComment
}

export const postSchema = new Schema<IPost>({
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
    comments: {
        type: [commentSchema],
        default: []
    },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
)

const Post = model<IPost>('post', postSchema);

export default Post