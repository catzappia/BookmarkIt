import { NewBookInput } from "../../models/Book";
import { GoogleAPIBook } from "../../models/GoogleApiBook";
import BookList from "./bookList";
import '../../styles/bookSearch.css';

import { type FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

type BookSearchProps = {
  onDataChange: (data: any) => NewBookInput | void;
};

const BookSearch = (props: BookSearchProps) => {
  const [query, setQuery] = useState("");

  const [searchedBooks, setSearchedBooks] = useState<NewBookInput[]>([]);

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

  const searchGoogleBooks = async (query: string) => {
    query = query.replace(/ /g, "+");
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };

  const handleChildData = (data: NewBookInput): void => {
    console.log("Data:", data);
    props.onDataChange(data);
  };

  return (
    <Form.Group className="text-center">
      <Form.Label><h3>Search for a Book</h3></Form.Label>
      <Row className='alignCenter'>
        <Form.Control
          className='searchForm'
          type="text"
          placeholder="Search for a book"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button className='searchButton' type="submit" onClick={handleFormSubmit}>
          Search
        </Button>
      </Row>
      <BookList
        onDataChange={handleChildData}
        bookList={searchedBooks}
      ></BookList>
    </Form.Group>
  );
};

export default BookSearch;
