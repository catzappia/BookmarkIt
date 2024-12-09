import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { Request, Response } from 'express';
import { fileURLToPath } from 'url';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authenticationToken } from './utils/auth.js';


const server = new ApolloServer({
    typeDefs,
    resolvers,
   
});

const startApolloServer = async () => {
    await server.start();

    try {
        await db();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server as any,
        { context: authenticationToken as any }
    ));

    if (process.env.NODE_ENV === 'production') {
        console.log(`In production mode, from NODE_ENV: ${process.env.NODE_ENV}`);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(process.cwd(), '../client/dist/index.html'));
        });
      }

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();