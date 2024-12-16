import { Schema, model, type Document } from 'mongoose';
import { IBook, bookSchema } from './Book.js';
import { IUser } from './User.js';
import { IPost,  } from './Post.js';

export interface IGroup extends Document {
    id: string,
    name: string,
    description: string,
    is_private: boolean,
    profilePicture?: string,
    admin: IUser,
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
    profilePicture: {
        type: String,
        default: 'https://preview.redd.it/slo4soywz9l91.jpg?width=1080&crop=smart&auto=webp&s=beb1b8421b6fb4f13ae5d3a07965fabe5c7ba4b7'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
            type: Schema.Types.ObjectId,
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