import { Stack } from "@mui/material";
import NavBar from "../../../../components/Drawer";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

const LayoutAdmin = ({ children }) => {
  const routes = [
    { title: "Inicio", path: "/admin", icon: <HomeRoundedIcon /> },
    { title: "Productos", path: "/admin/products", icon: <CategoryIcon /> },
    { title: "Usuarios", path: "/admin/users", icon: <PeopleIcon /> },
    { title: "Mi cuenta", path: "/admin/account", icon: <PersonIcon /> },
  ];

  return (
    <Stack
      mineight={"100vh"}
      flexDirection={{ xs: "column", md: "row" }}
      gap={{ xs: 0, md: 4 }}
      spacing={{ xs: 0, md: 2 }}
    >
      <NavBar routes={routes} />
      <Stack p={1}>{children}</Stack>
    </Stack>
  );
};

export default LayoutAdmin;
