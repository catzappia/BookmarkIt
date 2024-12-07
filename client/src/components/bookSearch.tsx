import { type FormEvent, useState } from 'react';
import { Book } from '../models/Book';
import { GoogleAPIBook } from '../models/GoogleApiBook';
import BookList from './bookList';

const BookSearch = () => {

    const [query, setQuery] = useState('');
    
    const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!query) {
            return false;
        }

        try {
            const response = await searchGoogleBooks(query);
            
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const { items } = await response.json();
            const bookData = items.map((book: GoogleAPIBook) => {
                return {
                    bookId: book.id,
                    authors: book.volumeInfo.authors || ['No author to display'],
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks?.thumbnail || '',
                };
            })

            setSearchedBooks(bookData);
            setQuery('');

        } catch (err) {
            console.error(err);
        }
    }

    const searchGoogleBooks = async(query: string) => {
        query = query.replace(/ /g, '+');
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    }

    return (
        <div>
            <h4>Search For A Book</h4>
            <form
                className=''
                onSubmit={(handleFormSubmit)}>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder='Search For A Book'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)} />
                    </div>
                    <div>
                        <button>
                            Search
                        </button>
                    </div>
            </form>
            {searchedBooks.length > 0 && (
                <BookList bookList={searchedBooks} text={'Save'} />
            )}
        </div>
    )
}

export default BookSearch;