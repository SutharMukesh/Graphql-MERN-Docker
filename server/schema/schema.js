const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Book = require("../models/book");
const Author = require("../models/author");

// GRAPHQL OBJECT TYPES
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		// TYPE RELATIONS
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// FIND AUTHOR of this book
				return Author.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// FIND BOOKS WRITTEN BY AUTHOR (parent.id)
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});

// DEFINE ROOT QUERIES, this is where we get inside our graph.
const RootQueryType = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Book.findById(args.id);
				// return books.filter((book) => book.id == args.id)[0];
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id);
				// return authors.filter((author) => author.id == args.id)[0];
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find();
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find();
			},
		},
	},
});

// MUTATION -- CHANGE OR CREATE DATA
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			async resolve(parent, args) {
				const newAuthor = {
					name: args.name,
					age: args.age,
                };
                if (await Author.findOne(newAuthor)) {
					throw new Error(`Author ${args.name} already registered.`);
				}
				return new Author(newAuthor).save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				const newBook = {
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				};
				if (await Book.findOne(newBook)) {
					throw new Error(`Book ${args.name} already registered.`);
				}
				return new Book(newBook).save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQueryType,
	mutation: Mutation,
});
