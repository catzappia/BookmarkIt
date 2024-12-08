import { Schema, model, type Document } from 'mongoose';

export interface IGroup extends Document {
    groupId: string,
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
            ref: 'user',
            default: []
        }
    ],
    currentBook: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        default: undefined
    },
    books:[
        {
            type: Schema.Types.ObjectId,
            ref: 'book',
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
)

const Group = model('group', groupSchema);

export default Group