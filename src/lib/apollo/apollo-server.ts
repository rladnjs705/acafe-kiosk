import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';
import cors from 'cors';

import resolverItem from '$apollo/resolvers/item/item';
import typeDefsItem from '$apollo/schema/item';
//import resolverOrder from '$apollo/resolvers/order/order';
import typeDefsOrder from '$apollo/schema/order';
//import resolverAuth from '$apollo/resolvers/auth/auth';
import typeDefsAuth from '$apollo/schema/auth';

    const app = express();
    const httpServer = createServer(app);

    const typeDefs = [typeDefsItem, typeDefsOrder, typeDefsAuth ];
    const resolvers = [resolverItem];
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    });
  
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
    
        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
            return {
                async drainServer() {
                await serverCleanup.dispose();
                },
            };
            },
        },
        ],
    });

    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

    const PORT = 4000;
    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    });