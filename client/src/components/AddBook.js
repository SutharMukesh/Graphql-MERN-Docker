import { useQuery, useMutation } from "@apollo/client";
import  React, { useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries"

function AddBook() {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    function submitForm(e) {
        // Prevent browser from refreshing after form submitting.
        e.preventDefault()
        addBook({
            variables: { name, genre, authorId },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div class="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div class="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div class="field">
                <label>Author Name:</label>
                <select type="text" onChange={(e) => setAuthorId(e.target.value)}>
                    <option style={{ display: "none" }}></option>
                    {data.authors.map(author => {
                        return (<option key={author.id} value={author.id}>{author.name}</option>)
                    })}
                </select>
            </div>
            <button>+</button>
        </form >
    );
}

export default AddBook;
