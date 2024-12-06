import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';

// import { typeDefs, resolvers } from './schemas/index.js'; not implemented yet
import db from './config/connection';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (_req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
      }

    try {
        await db();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }

    app.listen(PORT, () => {
        console.log(`API server runnong on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();