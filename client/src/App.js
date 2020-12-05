import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddAuthor from "./components/AddAuthor";
import React from "react";
import {  Navbar } from "react-bootstrap";
const serverUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL;

const client = new ApolloClient({
	uri: `${serverUrl}/graphql`,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			{/* <h1 id="header">Book shook</h1> */}
			<div className="MainApp">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Book Shook</Navbar.Brand>
        </Navbar>
        <div className="App">
          <BookList />
          <br />
          <div id="bottom-operations">
            <AddBook />
            <AddAuthor />
          </div>
        </div>
      </div>
		</ApolloProvider>
	);
}

export default App;
