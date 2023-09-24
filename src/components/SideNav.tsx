import {Drawer, List, ListItem, ListItemButton, ListItemIcon, styled} from "@suid/material";
import {For} from "solid-js";
import InboxIcon from "@suid/icons-material/MoveToInbox";


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


export default function SideNav() {
  const open = false;

  return (
    <TinyDrawer variant="permanent" open={open}>
      {/*<DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>*/}
      <List>
        <For each={['Map', 'New Flight', 'Drones', 'History']}>{(text, index) =>
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
  );
}
