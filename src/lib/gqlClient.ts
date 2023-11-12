// Need /index.js here & patch for @merged/solid-apollo b/c https://github.com/apollographql/apollo-client/issues/8218
// See also https://github.com/merged-js/solid-apollo/pull/9
import {HttpLink, InMemoryCache, split} from "@apollo/client/core/index.js";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {ApolloClient} from "@merged/solid-apollo";
import {isServer} from "solid-js/web";
import ws from "ws";
import {nhost} from "~/lib/nHost";


// Adapted from https://hasura.io/docs/latest/subscriptions/integrations/apollo-subscriptions/
// Docs: https://www.apollographql.com/docs/react/data/subscriptions/
// Solid adapter: https://github.com/merged-js/solid-apollo

const headers = {
  "x-hasura-admin-secret": import.meta.env["VITE_HASURA_ADMIN_SECRET"] as string,
};

const httpLink = new HttpLink({
  uri: nhost.graphql.httpUrl,
  headers,
});

const wsLink = new GraphQLWsLink(createClient({
  url: nhost.graphql.wsUrl,
  connectionParams: {
    headers,
  },
  // It doesn't really make sense to open a websocket connection for something that just fetches once,
  // But the alternative is dynamically rewriting gql requests (subscription -> query)
  // See https://stackoverflow.com/questions/61743153
  webSocketImpl: isServer ? ws : undefined,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
