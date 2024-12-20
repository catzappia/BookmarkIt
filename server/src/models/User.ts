import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IBook, bookSchema } from './Book.js';
import { IGroup } from './Group.js';
import { IPost} from './Post.js';
import { IComment, commentSchema } from './Comment.js';

export interface IUser extends Document {
    id: string,
    username: string,
    email: string,
    password: string,

    isCorrectPassword(password: string): Promise<boolean>,
    bio?: string,
    profilePicture?: string,
    savedBooks?: IBook[],
    currentlyReading?: IBook,
    adminGroups?: IGroup[],
    groups?: IGroup[],
    posts?: IPost[],
    comments?: IComment[],
}

export const userSchema: Schema<IUser> = new Schema<IUser>({
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
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8
    },
    bio: {
        type: String,
        maxlength: 280,
        default: ''
    },
    profilePicture: {
        type: String,
        default: 'https://media.newyorker.com/photos/5c1d0d7781ab3335f580e163/master/w_2240,c_limit/TNY-MoreBooksWeLoved2018.jpg'
    },
    savedBooks: [bookSchema],
    currentlyReading: {
        type: bookSchema
    },
    adminGroups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group',
        }
    ],
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group',
        }
    ],
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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
// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>('User', userSchema);
// put an uppercase on User

export default User