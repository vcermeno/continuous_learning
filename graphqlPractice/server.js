const express = require('express');
const { graphqlHTTP }= require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');
const app = express();

const authors = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'J.R.R. Tolkein' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: 'Harry Potter and the Chmaber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 12 },
    { id: 7, name: 'Te Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 },
]

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server is listening on Port 5000'));