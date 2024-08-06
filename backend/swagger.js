// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Book API',
    version: '1.0.0',
    description: 'A simple API for managing books, reviews and users',
  },
  servers: [
    {
      url: 'http://localhost:4000', // Change this to your server URL
    },
  ],
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the book',
          },
          title: {
            type: 'string',
            description: 'The title of the book',
          },
          author: {
            type: 'string',
            description: 'The author of the book',
          },
          description: {
            type: 'string',
            description: 'The description of the book',
          },
          averageRating: {
            type: 'number',
            format: 'float',
            description: 'The average rating of the book',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the book was created',
          },
        },
        required: ['title', 'author', 'description'],
      },
      Review: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the review',
          },
          rating: {
            type: 'number',
            format: 'float',
            description: 'The rating given in the review',
          },
          comment: {
            type: 'string',
            description: 'The comment provided in the review',
          },
          user: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'The email of the user who wrote the review',
              },
            },
          },
          bookId: {
            type: 'string',
            description: 'The ID of the book being reviewed',
          },
        },
        required: ['rating', 'comment', 'user', 'bookId'],
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the user',
          },
          email: {
            type: 'string',
            description: 'The email of the user',
          },
          role: {
            type: 'string',
            description: 'The role of the user (e.g., admin)',
          },
        },
        required: ['email', 'role'],
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Adjust this path to where your API route files are
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
