import { Book } from '../models/Book';

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

type BookListProps = {
    bookList: Book[];
    text?: string;

    onDataChange: (data: any) => Book | void;
}

const BookList = (props: BookListProps) => {

    const [savedBook, setSavedBook] = useState<Book | null>(null);

    const handleSaveButton = (bookId: string) => {
        const bookToSave: Book = props.bookList.find((book) => book.bookId=== bookId)!;
        console.log('Book to Save:', bookToSave);
        setSavedBook(bookToSave);
        console.log('Saved Book:', savedBook);
        props.onDataChange(savedBook);
        
    }

    return (
        <Container>
            <Row>
                {props.bookList.map((book: Book, index: number) => {
                    return (
                        <Col key={index}>
                            <h5>{book.title}</h5>
                            <img src={book.image} alt={book.title} />
                            <p>{book.authors}</p>
                            <Button onClick={() => handleSaveButton(book.bookId)}>{props.text}</Button>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default BookList;