import { Book } from '../models/Book';

type BookListProps = {
    bookList: Book[];
    text?: string;
}

const BookList = (props: BookListProps) => {

    return (
        <div>
            <h4>Books</h4>
            <ul>
                {props.bookList.map((book: any, index: number) => {
                    return (
                        <li key={index}>
                            <h5>{book.title}</h5>
                            <img src={book.image} alt={book.title} />
                            <p>{book.authors}</p>
                            <button>{props.text}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BookList;