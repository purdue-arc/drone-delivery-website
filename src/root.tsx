// @refresh reload
import {createResource, onMount, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import SideNav from "~/components/SideNav";
import {Box, useTheme} from "@suid/material";
import {ApolloProvider} from "@merged/solid-apollo";
import gqlClient from "~/lib/gqlClient";
import {AuthSession} from "@supabase/supabase-js";
import Auth from "./routes/signin";
import {supabase} from "./lib/supabaseClient";

export default function Root() {
  const theme = useTheme();

  const [session, {mutate: setSession}] = createResource<AuthSession | null>(
    () => supabase.auth.getSession().then(({ data: { session } }) => session)
  );

  onMount(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

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
            {!session() ? <Auth /> :
              <ApolloProvider client={gqlClient}>
                <SideNav />
                {/* TODO: This is JUST a few pixels off. https://mui.com/material-ui/customization/breakpoints/ might help? */}
                <Box sx={{ paddingLeft: theme.spacing(7) }}>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </Box>
              </ApolloProvider>
            }
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
