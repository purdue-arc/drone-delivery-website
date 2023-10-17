// @refresh reload
import {Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import SideNav from "~/components/SideNav";
import {Box, useTheme} from "@suid/material";
import {ApolloProvider} from "@merged/solid-apollo";
import gqlClient from "~/lib/gqlClient";

export default function Root() {
  const theme = useTheme();

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <ApolloProvider client={gqlClient}>
              <SideNav />
              <Box sx={{ paddingLeft: theme.spacing(7) }}> {/* TODO: This is JUST a few pixels off */}
                <Routes>
                  <FileRoutes />
                </Routes>
              </Box>
            </ApolloProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
