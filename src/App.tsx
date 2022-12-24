import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import RouterView from "routes/route";
import ErrorBoundary from "components/ErrorBoundry";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const textColorWhite = {
  color: "white",
};
const textColorBlack = {
  color: "black",
};

export default function App(props: Props) {
  // useLocation hook for pathname
  const location = useLocation();
  const { window } = props;

  // state for full view temporary drawer in mobile view
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // open/close drawer in mobile view while clicking on toggle button
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // check if menu is selected in drawer
  const selected = (text: string, index: number) => {
    return (
      location.pathname === "/" + text.toLowerCase().replace(" ", "-") ||
      (location.pathname === "/home" && index === 0) ||
      (index === 0 && location.pathname === "/")
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // drawer menus
  const drawer = (
    <div>
      <Toolbar>Spell Management</Toolbar>
      <Divider />
      <List>
        {["Spell List", "Watch Later"].map((text, index) => (
          <ListItem
            component={Link}
            to={text.toLowerCase().replace(" ", "-")}
            key={text}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                setMobileOpen(!mobileOpen);
              }}
              // change styles of list item if menu is selected
              className={selected(text, index) ? "selected" : ""}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon
                    // change color of icon if menu is selected
                    htmlColor={selected(text, index) ? "white" : "black"}
                  />
                ) : (
                  <WatchLaterIcon
                    // change color of icon if menu is selected
                    htmlColor={selected(text, index) ? "white" : "black"}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={
                  // change color of list item text if menu is selected
                  selected(text, index)
                    ? { style: textColorWhite }
                    : { style: textColorBlack }
                }
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ErrorBoundary>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            // calculate width of app bar by substracting drawer width
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar style={{ backgroundColor: "#C70039" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              // open close drawer while clicking on hamburger
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              style={{ color: "white" }}
              variant="h6"
              noWrap
              component="div"
            >
              Spell App
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* mobile view drawer */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "100%",
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* desktop view drawer  */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* container */}
        <Box
          component="main"
          sx={{
            backgroundColor: "#eae6e6",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: "100vh",
            overflow: "scroll",
          }}
        >
          <Toolbar />
          <RouterView />
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
