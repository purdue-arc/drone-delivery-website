import type {CodegenConfig} from '@graphql-codegen/cli'
import {GRAPHQL_ENDPOINT} from "./src/lib/gqlClient";
import {loadEnv} from "vite";

// Documentation: https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config

const config: CodegenConfig = {
  schema: [{
    ["https://" + GRAPHQL_ENDPOINT]: {
      headers: {
        "x-hasura-admin-secret": loadEnv("production", process.cwd())["VITE_HASURA_ADMIN_SECRET"] as string,
      },
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
