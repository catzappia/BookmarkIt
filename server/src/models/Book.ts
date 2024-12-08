import { Schema, model, type Document } from 'mongoose';

export interface IBook extends Document {
    bookId: string,
    title: string,
    authors: string[],
    description: string,
    image: string,
    link: string
}

export const bookSchema = new Schema<IBook>({
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
    },
    link: {
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