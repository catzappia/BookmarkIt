import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
    name: string,
    username: string,
    email: string,
    password: string,

    groups?: Schema.Types.ObjectId[],
    posts?: Schema.Types.ObjectId[],
    comments?: Schema.Types.ObjectId[],
}

export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        minlength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        },
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);

export default User