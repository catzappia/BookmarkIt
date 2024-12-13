import { Book, NewBookInput } from '../../models/Book';

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

type BookListProps = {
    bookList: NewBookInput[];

    onDataChange: (data: any) => Book | void;
}

const BookList = (props: BookListProps) => {

    const [savedBook, setSavedBook] = useState<NewBookInput | null>(null);

    useEffect(() => {
        if(savedBook) {
            props.onDataChange(savedBook);
        }
    });

    const handleSaveButton = async (bookId: string) => {
        const bookToSave: NewBookInput = props.bookList.find((book) => book.bookId=== bookId)!;
        console.log('Book to Save:', bookToSave);
        await setSavedBook(bookToSave);
    }

    return (
        <Container>
            <Row>
                {props.bookList.map((book: NewBookInput, index: number) => {
                    return (
                        <Col key={index}>
                            <h5>{book.title}</h5>
                            <img src={book.image} alt={book.title} />
                            <p>{book.authors}</p>
                            <Button onClick={() => handleSaveButton(book.bookId)}>Set Book</Button>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default BookList;