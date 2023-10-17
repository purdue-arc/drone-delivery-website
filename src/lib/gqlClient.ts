import {HttpLink, InMemoryCache, split} from '@apollo/client/core';
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from '@apollo/client/utilities';
import {ApolloClient} from '@merged/solid-apollo'


// Adapted from https://hasura.io/docs/latest/subscriptions/integrations/apollo-subscriptions/
// Docs: https://www.apollographql.com/docs/react/data/subscriptions/
// Solid adapter: https://github.com/merged-js/solid-apollo

const HASURA_URL = "dd-hasura.purduearc.com/v1/graphql";
const headers = {
  "x-hasura-admin-secret": import.meta.env["VITE_HASURA_ADMIN_SECRET"],
};

const httpLink = new HttpLink({
  uri: 'https://' + HASURA_URL,
  headers,
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://' + HASURA_URL,
  connectionParams: {
    headers,
  }
}));

const splitLink = split(
  ({ query }) =>
  {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
