import { Route, Routes } from "react-router-dom";
import Home from "../pages/dashboard/admin/Home";
import Products from "../pages/dashboard/admin/Products";
import Users from "../pages/dashboard/admin/Users";
import NotFound from "../pages/NotFound";
import Account from "../pages/dashboard/admin/Account";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/users" element={<Users />} />
      <Route path="/account" element={<Account />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
