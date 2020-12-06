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
			<b>{data.book.author.name}</b>
			<br />
			<i>{data.book.genre}</i>
			<br />
            <br />
			<text>Other books by author</text>
			<ol>
				{data.book.author.books.map((book) => {
					return <li>{book.name}</li>;
				})}
			</ol>
		</div>
	);
}

const styles = {
	details: {
		color: "#ADAFA6F",
		paddingRight: "10px"
	},
};

export default BookDetails;
