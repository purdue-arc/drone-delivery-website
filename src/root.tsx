// @refresh reload
import {For, Suspense} from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@suid/material"
import InboxIcon from '@suid/icons-material/MoveToInbox';
import MailIcon from '@suid/icons-material/Mail';

const drawerWidth = 240;
const TinyDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    // ...(open && {
    //   ...openedMixin(theme),
    //   '& .MuiDrawer-paper': openedMixin(theme),
    // }),
    // ...(!open && {
    //   ...closedMixin(theme),
    //   '& .MuiDrawer-paper': closedMixin(theme),
    // }),
  }),
);

export default function Root() {
  const open = false;

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
            <TinyDrawer variant="permanent" open={open}>
              {/*<DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>*/}
              <List>
                <For each={['Inbox', 'Starred', 'Send email', 'Drafts']}>{(text, index) =>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <InboxIcon /> {/*TODO*/}
                      </ListItemIcon>
                      {/*<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />*/}
                    </ListItemButton>
                  </ListItem>
                }</For>
              </List>
            </TinyDrawer>
            <A href="/">Index</A>
            <A href="/about">About</A>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
