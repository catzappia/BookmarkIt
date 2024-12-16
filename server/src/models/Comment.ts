import { Schema, model, type Document } from 'mongoose';
import { IUser } from './User.js';

export interface IComment extends Document {
    id: string,
    text: string,
    user: IUser
}

export const commentSchema = new Schema<IComment>({
    text: {
        type: String,
        required: true,
        maxlength: 120,
        minlength: 1
    },
    user: {
        type: Schema.Types.ObjectId,
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