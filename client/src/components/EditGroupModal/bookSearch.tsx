import { Book } from '../../models/Book';
import { GoogleAPIBook } from '../../models/GoogleApiBook';
import BookList from './bookList';

import { type FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type BookSearchProps = {
    onDataChange: (data: any) => Book | void;
}

const BookSearch = (props: BookSearchProps) => {
  const [query, setQuery] = useState("");

  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

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

  const handleChildData = (data: Book): void => {
    console.log('Data:', data);
    props.onDataChange(data);
  }

  return (
    <Form.Group>
        <Form.Label>Search for a Book</Form.Label>
        <Form.Control
            type="text"
            placeholder="Search for a book"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
        />
        <Button type="submit" onClick={handleFormSubmit}>
            Search
        </Button>
        <BookList
          onDataChange={handleChildData}
          bookList={searchedBooks}>
          </BookList>
    </Form.Group>
  )
};

export default BookSearch;