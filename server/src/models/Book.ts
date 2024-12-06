import { Schema, model, type Document } from 'mongoose';

export interface IBook extends Document {
    title: string,
    author: string[],
    image: string,

    posts: Schema.Types.ObjectId
}

export const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: [String],
        required: true
    },
    image: {
        type: String
    },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
)

const Book = model('Book', bookSchema);

export default Book