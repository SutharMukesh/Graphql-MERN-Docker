import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Accordion, Button, Card, ListGroup } from "react-bootstrap";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetail";
function BookList() {
	const [selectedBook, setSelectedBook] = useState("");
	const { loading, error, data } = useQuery(getBooksQuery);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
			<Accordion id="book-list" style={styles.listGroup}>
				{data.books.map((book) => {
					return (
						<Card style={styles.card}>
							<div
								className="card-header"
								style={styles.cardHeader}
								key={book.id}
								style={styles.cardHeader}
								data-toggle="collapse"
								data-target={selectedBook}
								aria-controls={selectedBook}
								onClick={(e) => {
									if (selectedBook == book.id) {
										setSelectedBook("");
									} else {
										setSelectedBook(book.id);
									}
								}}
							>
								{book.name}
							</div>
							<div className={selectedBook == book.id ? "collapse show card-body" : "collapse card-body"}>
								<BookDetails bookid={selectedBook}></BookDetails>
							</div>
						</Card>
					);
				})}
			</Accordion>
	);
}

const styles = {
	listGroup: {
		display: "flex",
		flexDirection: "column",
		justifyContent:"stretch",
		padding: "20px",
		width: "20rem"
	},
	card: {
		backgroundColor: "#3E3D32",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
		border: "1px solid #3E3D32",
		margin: "5px",
	},
	cardHeader: {
		padding: "10px",
		color: "#66C9BF",
	},
};
export default BookList;
