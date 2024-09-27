const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const db = require('./models');

const startServer = async () => {
  const app = express();

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await server.start(); // Ensure the server is started before applying middleware

  // Apply middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

// Call the function to start the server
startServer();

