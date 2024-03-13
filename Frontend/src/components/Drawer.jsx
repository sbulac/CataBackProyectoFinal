import { useState } from "react";
import {
  IconButton,
  Drawer,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const NavBar = ({ routes }) => {
  const [drawer, setDrawer] = useState(false);
  return (
    <Stack>
      <Stack sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton size="large" onClick={() => setDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Drawer
        sx={{
          display: { xs: "none", md: "block" },
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
        open
        variant="permanent"
        anchor="left"
        onClose={() => setDrawer(false)}
      >
        <List>
          {routes.map((item) => (
            <ListItem key={item.title}>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Drawer open={drawer} anchor="left" onClose={() => setDrawer(false)}>
        <List>
          {routes.map((item) => (
            <ListItem key={item.title}>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Stack>
  );
};

export default NavBar;
