import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAuthorsQuery, addAuthorMutation } from "../queries/queries";
import AddBook from "./AddBook";

function AddAuthor() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);

	async function submitForm(e) {
		// Prevent browser from refreshing after form submitting.
		try {
			e.preventDefault();
			await addAuthor({
				variables: { name, age },
				refetchQueries: [{ query: getAuthorsQuery }],
			});
			toast.success(`Author ${name} added`, Object.assign(AddBook.notifyOpts, { className: "toastSuccess" }));
		} catch (error) {
			console.error(error);
			toast.error(error.message, Object.assign(AddBook.notifyOpts, { className: "toastError" }));
		}
	}

	const [addAuthor] = useMutation(addAuthorMutation);
	return (
		<form id="add-author" onSubmit={submitForm} style={AddBook.style.form}>
			<div className="input-group input-group-sm mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" style={AddBook.style.prepend} id="inputGroup-sizing-sm">
						Author Name
					</span>
				</div>
				<input required type="text" className="form-control btn-secondary" style={AddBook.style.input} onChange={(e) => setName(e.target.value)} />
			</div>

			<div className="input-group input-group-sm mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" style={AddBook.style.prepend} id="inputGroup-sizing-sm">
						Age
					</span>
				</div>
				<input required type="number" className="form-control btn-secondary" style={AddBook.style.input} onChange={(e) => setAge(Number(e.target.value))} />
			</div>
			<button type="submit" className="btn btn-sm" style={AddBook.style.button}>
				Add Author
			</button>
		</form>
	);
}

export default AddAuthor;
