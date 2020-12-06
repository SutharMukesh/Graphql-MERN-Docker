import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

function AddBook() {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	function submitForm(e) {
		// Prevent browser from refreshing after form submitting.
		e.preventDefault();
		addBook({
			variables: { name, genre, authorId },
			refetchQueries: [{ query: getBooksQuery }],
		});
	}

	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<form id="add-book" onSubmit={submitForm} style={style.form}>
			<div className="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" style={style.prepend} id="inputGroup-sizing-sm">
						Book Name
					</span>
				</div>
				<input type="text" class="form-control btn-secondary" style={style.input} onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" style={style.prepend} id="inputGroup-sizing-sm">
						Genre
					</span>
				</div>
				<input type="text" class="form-control btn-secondary" style={style.input} onChange={(e) => setGenre(e.target.value)} />
			</div>
			<div className="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" style={style.prepend} id="inputGroup-sizing-sm">
						Author Name
					</span>
				</div>
				<select class="custom-select btn-secondary" type="text" style={style.input} onChange={(e) => setAuthorId(e.target.value)}>
					<option style={{ display: "none" }}></option>
					{data.authors.map((author) => {
						return (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						);
					})}
				</select>
			</div>
			<button type="submit" class="btn btn-sm" style={style.button}>
				Add Book
			</button>
		</form>
	);
}

const style = {
	prepend: {
		backgroundColor: "#92938C",
		color: "#272822",
		border: "#272822",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
	},
	input: {
		backgroundColor: "#272822",
		color: "#DDDFD4",
		border: "#272822",
		borderColor: "#272822",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
	},
	button: {
		backgroundColor: "#272822",
		margin: "0px",
		color:"#F92672",
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
	},
	form: {
		boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
		background: "#3E3D32",
		padding: "10px",
		/* width: 25rem; */
		margin: "5px",
		position: "relative",
		borderRadius: "4px",
		color: "#66C9BF",
	},
};
AddBook.style = style;
export default AddBook;
