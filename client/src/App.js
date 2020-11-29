import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:9090/graphql",
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>My Boring Book List!</h1>
        <BookList />
        <br />
        <AddBook />
      </div >
    </ApolloProvider>
  );
}

export default App;
