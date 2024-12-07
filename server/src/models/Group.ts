import { Schema, model, type Document } from 'mongoose';

export interface IGroup extends Document {
    name: string,
    open: boolean,
    users: Schema.Types.ObjectId,
    currentBook: Schema.Types.ObjectId,
    books: Schema.Types.ObjectId[],
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
            ref: 'Users'
        }
    ],
    currentBook: {
        type: Schema.Types.ObjectId,
        ref: 'Books'
    },
    books:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Books'
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

const Group = model('Group', groupSchema);

export default Group