const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();
const PORT = 9090;

mongoose.connect("mongodb://localhost:27017/booksDb", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open',()=>{
    console.log("connected to database")
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
