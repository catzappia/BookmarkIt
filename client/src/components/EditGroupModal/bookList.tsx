import { Book, NewBookInput } from "../../models/Book";

import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type BookListProps = {
  bookList: NewBookInput[];

  onDataChange: (data: any) => Book | void;
};

const BookList = (props: BookListProps) => {
  const [savedBook, setSavedBook] = useState<NewBookInput | null>(null);

  useEffect(() => {
    if (savedBook) {
      props.onDataChange(savedBook);
    }
  });

  const handleSaveButton = async (bookId: string) => {
    const bookToSave: NewBookInput = props.bookList.find(
      (book) => book.bookId === bookId
    )!;
    console.log("Book to Save:", bookToSave);
    await setSavedBook(bookToSave);
  };

  return (
    <Container>
      <Row>
        {props.bookList.map((book: NewBookInput, index: number) => {
          return (
            <Col key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>Written By: {book.authors}</Card.Text>
                  <Button onClick={() => handleSaveButton(book.bookId)}>
                    Set Book
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BookList;
