import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Accordion, Button, Card, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
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
					<OverlayTrigger
						rootClose="true"
						trigger="click"
						placement="auto"
						overlay={
							<Popover style={styles.popover} id="popover-basic">
								<Popover.Content style={styles.popoverContent}>
									<BookDetails bookid={selectedBook}></BookDetails>
								</Popover.Content>
							</Popover>
						}
					>
						<Button
							style={styles.button}
							key={book.id}
							onClick={(e) => {
								if (selectedBook == book.id) {
									setSelectedBook("");
								} else {
									setSelectedBook(book.id);
								}
							}}
						>
							{book.name}
						</Button>
					</OverlayTrigger>
				);
			})}
		</Accordion>
	);
}

const styles = {
	listGroup: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: "20px"
	},
	button: {
		backgroundColor: "#3E3D32",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
		border: "1px solid #3E3D32",
		margin: "5px",
		padding:"10px",
		color: "#ADAFA6",
	},
	popover: {
		backgroundColor: "#3E3D32",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
		border: "1px solid #3E3D32",
		margin: "5px",
	},
	popoverContent:{
		backgroundColor: "#272822",
		padding: "10px",
		color: "#ADAFA6",
	}
};
export default BookList;
