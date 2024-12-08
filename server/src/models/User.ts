import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,

    isCorrectPassword(password: string): Promise<boolean>,
    savedBooks?: Schema.Types.ObjectId[],
    currentlyReading?: Schema.Types.ObjectId,
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
    savedBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'book',
            default: []
        },
    ],
    currentlyReading: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        default: undefined
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'group',
            default: []
        },
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post',
            default: []
        },
    ],
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
);

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>('user', userSchema);

export default User