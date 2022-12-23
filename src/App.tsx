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
import { Link, Route, Routes, useLocation } from "react-router-dom";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SpellList from "pages/SpellList";
import WishList from "pages/WishList";

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
  let location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const selected = (text: string, index: number) => {
    return (
      location.pathname === "/" + text.toLowerCase().replace(" ", "-") ||
      (location.pathname === "/home" && index === 0) ||
      (index === 0 && location.pathname === "/")
    );
  };

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
              className={selected(text, index) ? "selected" : "test"}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon
                    htmlColor={selected(text, index) ? "white" : "black"}
                  />
                ) : (
                  <WatchLaterIcon
                    htmlColor={selected(text, index) ? "white" : "black"}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar style={{ backgroundColor: "#C70039" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
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
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // p: 3,
            backgroundColor: "#eae6e6",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: "100%",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<SpellList />} />
            <Route path="/home" element={<SpellList />} />
            <Route path="/spell-list" element={<SpellList />} />
            <Route path="/watch-later" element={<WishList />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
