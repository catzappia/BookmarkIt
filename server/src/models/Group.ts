import { Schema, model, type Document } from 'mongoose';
import { IBook, bookSchema } from './Book.js';
import { IUser } from './User.js';

export interface IGroup extends Document {
    groupId: string,
    name: string,
    open: boolean,
    users?: IUser[],
    currentBook?: IBook,
    books?: IBook[],
}

export const groupSchema = new Schema<IGroup>({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40,
        minlength: 3
    },
    open: {
        type: Boolean,
        required: true,
        default: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    currentBook: {
        type: bookSchema,
        default: null
    },
    books:{
        type: [bookSchema],
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

const Group = model('group', groupSchema);

export default Group