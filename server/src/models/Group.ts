import { Schema, model, type Document } from 'mongoose';
import { IBook, bookSchema } from './Book.js';
import { IUser } from './User.js';

export interface IGroup extends Document {
    groupId: string,
    name: string,
    description: string,
    is_private: boolean,
    admin: IUser,
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
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3,
        default: ''
    },
    is_private: {
        type: Boolean,
        required: true,
        default: false
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
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