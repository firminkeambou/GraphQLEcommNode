const fs = require('fs'); // to read SSL certificate files
const path = require('path'); // to handle file paths
const https = require('https'); // to create a secure server
const express = require('express'); // web framework for Node.js

const PORT = 8440; // Define the port for the secure server
//const { buildSchema } = require('graphql'); // to build GraphQL schema, no longer needed as we use makeExecutableSchema
const { graphqlHTTP } = require('express-graphql'); // // Middleware to handle GraphQL requests, to integrate GraphQL with Express
const { loadFilesSync } = require('@graphql-tools/load-files'); // to load schema files
const { makeExecutableSchema } = require('@graphql-tools/schema');
const productsModel = require('./graphql/products/products.model');
const ordersModel = require('./graphql/orders/orders.model');
//Query type is mandatory, it's the entry point for all GraphQL queries
// the below example is related to a simple e-commerce application
// "field + !" means that the field is required
// "ID" is a special type in GraphQL, used to represent unique identifiers, it's also useful for caching and refetching objects

/* No longer needed as we use makeExecutableSchema with GraphQL Schema Definition Language (SDL), */
/*const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }

    type Product {  
        id: ID!
        description: String!
        reviews:[Review]
        price: Float!
    }
    type Review {
         rating: Int!
        comment: String
       
    }

    type Order {
        id: ID!
        date: String!
        subtotal: Float!
        items: [OrderItem]!
    }
    type OrderItem {
        product: Product!
        quantity: Int!
        price: Float!   
    }

`); */
//const typesArray = loadFilesSync(path.join(__dirname, 'graphql', '**', '*.graphql')); // or ("**/*.graphql") Load all .graphql files in the project ('**' means looking in the current directory and subdirectories)
const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
}); // all the types needed

const resolversArray = loadFilesSync('**/*', {
  extensions: ['resolvers.js'],
});
//run makeExecutableSchema to create the schema by combining type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs: typesArray, // Array of loaded type definitions, the order doesn't matter as they will be merged
  resolvers: resolversArray,
});

/* no longer needed as we use a model structure combined with a resolver structure
const root = {
  products: require('./graphql/products/products.model'),
  orders: require('./graphql/orders/orders.model'),
};*/

const app = express();

// rootValue (parent) provides a way to define the top-level resolvers for the schema fields
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      products: productsModel.getAllProducts(),
      orders: ordersModel.getAllOrders(),
    }, // top-level resolvers(parent variable in resolvers)
    graphiql: true, // Enable GraphiQL interface
  })
);

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'keys', 'private_key.pem')),
      cert: fs.readFileSync(
        path.join(__dirname, 'keys', 'public_certificate.pem')
      ),
    },
    app
  )
  .listen(PORT, () => {
    console.log(
      `Secure GRAPHQL server is running on https://localhost:${PORT}`
    );
  });
