import { gql } from "@apollo/client";

const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
        }
    }
`
const getAuthorsQuery = gql`
    {
        authors{
            name
            age
            id
        }
    }
`
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            genre
            id
       }
    }
`

const addAuthorMutation = gql`
    mutation($name:String!,$age:Int!){
        addAuthor(name:$name,age:$age){
            name
            age
            id
        }
    }
`

const getBookDetailsQuery = gql`
    query($id:ID!){
        book(id:$id){
            name
            id
            genre
            author{
                name
                id
                age
                books{
                    name
                    genre
                }
            }
        }
    }
`


export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookDetailsQuery, addAuthorMutation }