import { ApolloServer } from 'apollo-server-svelte-kit'
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import resolverItem from '$apollo/resolvers/item/item';
import typeDefsItem from '$apollo/schema/item';
//import resolverOrder from '$apollo/resolvers/order/order';
import typeDefsOrder from '$apollo/schema/order';
//import resolverAuth from '$apollo/resolvers/auth/auth';
import typeDefsAuth from '$apollo/schema/auth';

const handler = async (req:any) => {
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
    const apolloServer = new ApolloServer(
        {
            schema,
            plugins: [
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
    await apolloServer.start();
    const resp = await apolloServer.handleRequest(req);
    apolloServer.stop();
    return resp;
}

export const HEAD = handler;
export const GET = handler;
export const POST = handler;