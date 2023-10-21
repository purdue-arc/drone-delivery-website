import type {CodegenConfig} from '@graphql-codegen/cli'
import {GRAPHQL_ENDPOINT, GRAPHQL_HEADERS} from "./src/lib/gqlClient";

const config: CodegenConfig = {
  schema: [{
    [GRAPHQL_ENDPOINT]: {
      headers: GRAPHQL_HEADERS,
    },
  }],
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    }
  }
}

export default config
