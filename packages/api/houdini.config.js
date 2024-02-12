/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "https://dd-hasura.purduearc.com/v1/graphql",
        headers: {
            'x-hasura-admin-secret': 'env:VITE_GRAPHQL_ADMIN_SECRET',
        }
    },
    "plugins": {
        "houdini-svelte": {}
    },
    "scalars": {
        /* in your case, something like */
        bigint: {                  // <- The GraphQL Scalar
          type: "number"  // <-  The TypeScript type
        }
      }
}

export default config
