import { Route, Routes } from "react-router-dom";
import Home from "../pages/dashboard/client/Home";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ClientRoutes;
