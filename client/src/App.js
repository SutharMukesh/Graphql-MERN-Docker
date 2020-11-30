import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const serverUrl = (process.env.NODE_ENV === "production") ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL;

const client = new ApolloClient({
  uri: `${serverUrl}/graphql`,
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
