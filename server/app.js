const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

// Allow cross origin requests
app.use(cors());

const mongoUrl = (process.env.NODE_ENV === "production") ? "mongo:27017" : process.env.mongourl;

mongoose.connect(`mongodb://${mongoUrl}/booksDb`, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log("connected to database")
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
