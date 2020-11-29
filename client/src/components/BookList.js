import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetail"
function BookList() {
    const [selectedBook, setSelectedBook] = useState("");
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div >
            <ul id="book-list" >
                {data.books.map(book => {
                    return (<li key={book.id} onClick={(e) => setSelectedBook(book.id)}>{book.name}</li>)
                })}
            </ul>
            <BookDetails bookid={selectedBook}></BookDetails>
        </div>
    );
}

export default BookList;
