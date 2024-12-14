import { type FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Book } from '../models/Book';
import { GoogleAPIBook } from '../models/GoogleApiBook';

const Search = () => {
  const [query, setQuery] = useState("");

  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

  const searchGoogleBooks = async (query: string) => {
    query = query.replace(/ /g, "+");
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!query) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(query);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { items } = await response.json();
      const bookData = items.map((book: GoogleAPIBook) => {
        return {
          bookId: book.id,
          authors: book.volumeInfo.authors || ["No author to display"],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || "",
        };
      });

      setSearchedBooks(bookData);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Search for a book</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Search</Button>
      </Form>
      <Row>
        {searchedBooks.map((book) => (
          <Col key={book.bookId} md={4}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.authors.join(", ")}</p>
            <p>{book.description}</p>
            <Button>Save</Button>
          </Col>
        ))}
      </Row>
    </Container>
  )
};

export default Search;