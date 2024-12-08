import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IBook, bookSchema } from './Book.js';
import { IGroup, groupSchema } from './Group.js';
import { IPost, postSchema } from './Post.js';
import { IComment, commentSchema } from './Comment.js';

export interface IUser extends Document {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,

    isCorrectPassword(password: string): Promise<boolean>,
    savedBooks?: IBook[],
    currentlyReading?: IBook,
    groups?: IGroup[],
    posts?: IPost[],
    comments?: IComment[],
}

export const userSchema: Schema<IUser> = new Schema<IUser>({
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
    savedBooks: [bookSchema],
    currentlyReading: {
        type: bookSchema
    },
    groups: {
        type: [groupSchema],
        default: []
    },
    posts: {
        type: [postSchema],
        default: []
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
);

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>('user', userSchema);

export default User