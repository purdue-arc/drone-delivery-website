import {ApolloClient, gql, HttpLink, InMemoryCache, split} from '@apollo/client';
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from '@apollo/client/utilities';


// Adapted from https://hasura.io/docs/latest/subscriptions/integrations/apollo-subscriptions/
// Docs: https://www.apollographql.com/docs/react/data/subscriptions/
// Apollo doesn't natively support solid, and it seems like the unmaintained adapter has an issue with solid start
// https://github.com/merged-js/solid-apollo/issues/19

const HASURA_URL = "dd-hasura.purduearc.com/v1/graphql";

const httpLink = new HttpLink({
  uri: 'https://' + HASURA_URL,
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://' + HASURA_URL,
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

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;

function LatestComment({ postID }) {
  const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
    { variables: { postID } }
  );
  return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
}

export default function Gql() {
}
