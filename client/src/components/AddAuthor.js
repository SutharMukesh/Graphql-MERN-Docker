import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getAuthorsQuery, addAuthorMutation } from "../queries/queries";
import AddBook from "./AddBook";

function AddAuthor() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);

	function submitForm(e) {
		// Prevent browser from refreshing after form submitting.
		e.preventDefault();
		addAuthor({
			variables: { name, age },
			refetchQueries: [{ query: getAuthorsQuery }],
		});
	}

	const [addAuthor] = useMutation(addAuthorMutation);
	return (
		<form id="add-author" onSubmit={submitForm} style={AddBook.style.form}>
			<div className="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" style={AddBook.style.prepend} id="inputGroup-sizing-sm">
						Author Name
					</span>
				</div>
				<input type="text" class="form-control btn-secondary" style={AddBook.style.input} onChange={(e) => setName(e.target.value)} />
			</div>

			<div className="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" style={AddBook.style.prepend} id="inputGroup-sizing-sm">
						Age
					</span>
				</div>
				<input type="number" class="form-control btn-secondary" style={AddBook.style.input} onChange={(e) => setAge(Number(e.target.value))} />
			</div>
			<button type="submit" class="btn btn-sm" style={AddBook.style.button}>
				Add Author
			</button>
		</form>
	);
}

export default AddAuthor;
