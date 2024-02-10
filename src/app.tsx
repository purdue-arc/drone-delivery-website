// @refresh reload
import {createResource, onMount, Suspense} from "solid-js";
import {FileRoutes} from "@solidjs/start";
import {Router} from "@solidjs/router";
import "./root.css";
import SideNav from "~/components/SideNav";
import {Box, useTheme} from "@suid/material";
import {ApolloProvider} from "@merged/solid-apollo";
import gqlClient from "~/lib/gqlClient";
import Auth from "./routes/signin";
import {nhost} from "~/lib/nHost";

/** Render the frame common to all routes (navigation, graphql provider, auth) */
export default function App() {
  const theme = useTheme();

  const [session, {mutate: setSession}] = createResource(
    () => nhost.auth.getSession(),
  );

  onMount(() => {
    nhost.auth.onAuthStateChanged((_event, session) => {
      setSession(session);
    });
  });

  return (
    <Suspense>
      {/* Suspense docs: https://docs.solidjs.com/references/api-reference/control-flow/Suspense */}
      {!session() ? <Auth /> :
          <ApolloProvider client={gqlClient}>
            <SideNav />
            {/* TODO: This is JUST a few pixels off. https://mui.com/material-ui/customization/breakpoints/ might help? */}
            <Box sx={{ paddingLeft: theme.spacing(7) }}>
              <Router>
                <FileRoutes />
              </Router>
            </Box>
          </ApolloProvider>
        }
    </Suspense>
  );
}
