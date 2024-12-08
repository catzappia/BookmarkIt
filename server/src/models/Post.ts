import { Schema, model, type Document } from 'mongoose';


export interface IPost extends Document {
    postId: string,
    text: string,
    username: Schema.Types.ObjectId,
    comments?: Schema.Types.ObjectId
}

export const postSchema = new Schema<IPost>({
    text: {
        type: String,
        required: true,
        maxlength: 120,
        minlength: 1
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment',
            default: []
        }
    ],
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