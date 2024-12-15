import { Schema, model, type Document } from 'mongoose';
import { IComment, commentSchema } from './Comment.js';
import { IUser } from './User.js';


export interface IPost extends Document {
    postId: string,
    text: string,
    user: IUser[],
    comments?: IComment
}

export const postSchema = new Schema<IPost>({
    text: {
        type: String,
        required: true,
        maxlength: 120,
        minlength: 1
    },
    user: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
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

const Post = model<IPost>('Post', postSchema);

export default Post