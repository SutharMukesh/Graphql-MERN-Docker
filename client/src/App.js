import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddAuthor from "./components/AddAuthor";
import React from "react";
import { Navbar } from "react-bootstrap";
const serverUrl = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:9090";

const client = new ApolloClient({
	uri: `${serverUrl}/graphql`,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			{/* <h1 id="header">Book shook</h1> */}
			<div className="MainApp" style={styles.MainApp}>
				<Navbar style={styles.Nav}>
					<Navbar.Brand style={{ color: "#F92672" }}>B O O K - S H O O K</Navbar.Brand>
				</Navbar>
				<div className="container" style={styles.App}>
					<BookList />
					<br />
					<div style={styles.bottomOperations}>
						<AddBook />
						<AddAuthor />
					</div>
				</div>
			</div>
		</ApolloProvider>
	);
}

const styles = {
	Nav: {
		backgroundColor: "#3E3D32",
    justifyContent: "center",
    boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
	},
	App: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "#272822",
	},
	MainApp: {
		fontFamily: "'Jetbrains Mono', 'Arial Narrow', Arial, sans-serif",
		backgroundColor: "#272822",
		height: "100vh",
		lineHeight: 1.2,
	},

	bottomOperations: {
    marginBottom:"15px",
		display: "flex",
		// position:"fixed",
		// bottom:0,
		justifyContent: "center",
		alignItems: "flex-end",
		flexDirection: "row",
		flexWrap: "wrap",
	},
};
export default App;
