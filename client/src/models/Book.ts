export interface Book {
    _id: string;
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
}

export interface NewBookInput {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
}