import { Schema, model, type Document } from 'mongoose';
import { IBook, bookSchema } from './Book.js';
import { IUser } from './User.js';
import { IPost, postSchema } from './Post.js';

export interface IGroup extends Document {
    groupId: string,
    name: string,
    description: string,
    is_private: boolean,
    admin: string,
    users?: IUser[],
    currentBook?: IBook,
    books?: IBook[],
    posts?: IPost[]
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
        default: ''
    },
    is_private: {
        type: Boolean,
        required: true,
        default: false
    },
    admin: {
        type: String,
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
    posts: [
        {
            type: [postSchema],
            ref: 'Post',
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
)

const Group = model('Group', groupSchema);

export default Group