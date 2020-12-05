import { useQuery } from "@apollo/client";
import { getBookDetailsQuery } from "../queries/queries"
import  React from "react";

function BookDetails(props) {
    const { loading, error, data } = useQuery(getBookDetailsQuery, {
        variables: { id: props.bookid }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div id="book-details">
            <h2>{data.book.name}</h2>
            <h3>{data.book.genre}</h3>
            <h3>{data.book.author.name}</h3>
            <p>{data.book.author.name} also wrote </p>
            <ul>
                {data.book.author.books.map(book => {
                    return (<li>{book.name},{book.genre}</li>)
                })}
            </ul>
        </div>
    );
}

export default BookDetails;
