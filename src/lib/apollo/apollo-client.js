import { ApolloClient, InMemoryCache, split, defaultDataIdFromObject } from '@apollo/client/core';
import { HttpLink, ApolloLink, from } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { itemPage, authToken } from '$stores';
import { get } from 'svelte/store';
import { createUploadLink } from 'apollo-upload-client';
import Shortid from 'shortid';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { browser } from '$app/environment';

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
})

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "ws://localhost:3000/graphql",
                })
          )
        : null;

const authLink = new ApolloLink((operation, forward) => {
  const defaultValue = '';
  const token = browser ? window.localStorage.getItem('loginToken') ?? defaultValue : defaultValue;
  
  if(!token) authToken.checkToken();

  operation.setContext(() => {
    return {
      headers: {
        authorization: token ? token : '',
      }
    }
  });
  return forward(operation);
});

const link =
    typeof window !== "undefined" && wsLink != null
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);
                    return (
                        def.kind === "OperationDefinition" &&
                        def.operation === "subscription"
                    );
                },
                wsLink,
                uploadLink
          )
        : uploadLink;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        itemsPageCount: {
          keyArgs: false,
        },
        items: {
          keyArgs: ["_id"],
          merge(existing=[], incoming=[], { args, readField }) {
            const newArr = [...existing, ...incoming];
            // const uniqueArr = newArr.filter((arr, index, callback) => index === callback.findIndex(t=> t.__ref === arr.__ref));
            
            let resultArr = [];
            // if(args.itemCategoryId !== ALL) {
            //   resultArr = uniqueArr.filter(_id => readField('itemCategoryId', _id) === args.itemCategoryId);
            // }
            // else {
            //   resultArr = uniqueArr;
            // }

            const itemPageNumber = get(itemPage);
            if(itemPageNumber.pageNumber <=1 ) {
              resultArr = incoming;
            }
            else {
              resultArr = newArr;
            }

            return resultArr;
          }
        }
      }
    }
  },
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      case 'OrderItem': return `OrderItem:${Shortid.generate()}`;
      default: return defaultDataIdFromObject(responseObject);
    }
  }
});

const client = new ApolloClient({
  //uri: 'http://localhost:3000/graphql',
  link: from ([authLink, link]),
  //cache: new InMemoryCache(),
  cache,
});

console.log(`Client is now running on`);

export default client;