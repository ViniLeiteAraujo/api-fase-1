import express, { RequestHandler } from 'express';
import app from './app';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { verifyToken } from './utils/jwt';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      '/graphql',
      cors(),
      express.json(),
      (req, res, next) => {
        if (req.body === undefined) req.body = {};
        next();
      },
      expressMiddleware(server, {
        context: async ({ req }: any) => {
          const authHeader = req.headers.authorization as string || '';
          const token = authHeader.replace('Bearer ', '');
          const user = token ? verifyToken(token) : null;
          return { user };
        },
      }) as unknown as RequestHandler
    );

    app.listen(PORT, () => {
      console.log(`REST Server running on http://localhost:${PORT}/api`);
      console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
};

startServer();
