import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import { AdminRoute, ClientRoute } from "./ProtectionRoutes";
import ClientRoutes from "./ClientRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminRoutes />
          </AdminRoute>
        }
      />
      <Route
        path="/client/*"
        element={
          <ClientRoute>
            <ClientRoutes />
          </ClientRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
