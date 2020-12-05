import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getAuthorsQuery, addAuthorMutation } from "../queries/queries"

function AddAuthor() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    function submitForm(e) {
        // Prevent browser from refreshing after form submitting.
        e.preventDefault()
        addAuthor({
            variables: { name, age },
            refetchQueries: [{ query: getAuthorsQuery }]
        })
    }

    const [addAuthor] = useMutation(addAuthorMutation);
    return (
        <form id="add-author" onSubmit={submitForm}>
            <div class="field">
                <label>Author Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div class="field">
                <label>Age:</label>
                <input type="number" onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <button>+</button>
        </form >
    );
}

export default AddAuthor;
