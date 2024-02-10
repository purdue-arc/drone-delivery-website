import { NhostClient } from "@nhost/nhost-js";

export const nhost = new NhostClient({
  authUrl: "https://dd-hasura.purduearc.com/v1/auth",
  storageUrl: "https://dd-hasura.purduearc.com/v1/storage",
  graphqlUrl: "https://dd-hasura.purduearc.com/v1/graphql",
  functionsUrl: "https://dd-hasura.purduearc.com/v1/functions",
});