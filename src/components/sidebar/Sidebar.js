/**
 * ************************************
 *
 * @module Sidebar.js
 * @description React Component to display Sidebar nav items
 *
 * ************************************
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarItems } from './SidebarItems';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

// Mixins provide additional rules that can be injected directly into styles
// theme here is just MUI's default theme
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

const closedMixin = (theme) => ({
  width: theme.spacing(7),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
});

// styled() takes in a component to be wrapped and outputs a component that wraps it which has specified styles
// store the outputted component in DrawerHeader
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

// similarly here, we are taking the MuiDrawer component and wrapping it inside a new component
// with different styles that is stored inside Drawer
const Drawer = styled(MuiDrawer, {
  // indicates if the prop should be forwarded from the parent component to the wrapped component
  // here, we are specifying that all props BUT the "open" prop will be forwarded to the wrapped component on the DOM
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  // specifies how white space should be 
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  // if open is true, then overwrite the Paper component of Drawer with output openedMixing(theme)
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme)
  }),

  // if open is false, overwrite the Paper component of Drawer with output of closedMixin(theme)
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const Sidebar = () => {
  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = SidebarItems.map((item) => 
    <Link key={item.title} to={item.path} style={{ color: 'inherit', textDecoration: 'none'}}>
      <ListItem button >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
      </ListItem>
    </Link>
  );

  return (
    <Box>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems}
        </List>
      </Drawer>
    </Box>
  )
}

export default Sidebar;