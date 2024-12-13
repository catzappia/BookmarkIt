import { Schema, model, type Document } from 'mongoose';

export interface IBook extends Document {
    id: string,
    bookId: string,
    title: string,
    authors: string[],
    description: string,
    image: string,
}

export const bookSchema = new Schema<IBook>({
    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    }
)

const Book = model('book', bookSchema);

export default Book