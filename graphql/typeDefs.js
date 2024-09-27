const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    price: Float!
    publisher: String
    edition: String
    reviews:[Review]
  }

  type Review{
    id: ID!
    rating: Float!
    comment: String!
  }

  input BookInput{
     title:String!
     author: String!
     description: String
     price: Float!
     publisher: String
     edition: String
     reviews:[ReviewInput]
  }

  input ReviewInput{
    rating: Float!
    comment: String!
    bookId: Int
  }
 
  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): String

    createReview(input: ReviewInput):Review
  }
`;

module.exports = typeDefs;
