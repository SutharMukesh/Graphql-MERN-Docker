import { useQuery } from "@apollo/client";
import { getBookDetailsQuery } from "../queries/queries";
import React from "react";

function BookDetails(props) {
	const { loading, error, data } = useQuery(getBookDetailsQuery, {
		variables: { id: props.bookid },
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div style={styles.details} id="book-details">
			<text>Genre: {data.book.genre}</text>
			<br />
			<text>Author: {data.book.author.name}</text>
			<br />
            <br />
			<text>Other books by author </text>
			<ul>
				{data.book.author.books.map((book) => {
					return <li>{book.name}</li>;
				})}
			</ul>
		</div>
	);
}

const styles = {
	details: {
		color: "#66C9BF",
	},
};

export default BookDetails;
