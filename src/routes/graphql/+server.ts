import { getDefaultHandler, gql } from 'apollo-server-svelte-kit';

import resolverItem from '$apollo/resolvers/item/item';
import typeDefsItem from '$apollo/schema/item';
//import resolverOrder from '$apollo/resolvers/order/order';
import typeDefsOrder from '$apollo/schema/order';
import resolverAuth from '$apollo/resolvers/auth/auth';
import typeDefsAuth from '$apollo/schema/auth';



const handler = getDefaultHandler(
	typeDefsItem,
	resolverItem
);

export const GET = handler;
export const HEAD = handler;
export const POST = handler;