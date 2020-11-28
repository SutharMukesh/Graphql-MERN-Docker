import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:9090/graphql",
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    {
      books{
        name
        genre
      }
    }
  `
}).then((result) => {
  console.log(result)
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
