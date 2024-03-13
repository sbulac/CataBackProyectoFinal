import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import useHome from "./useHome";

const Home = () => {
  const { getProducts } = useHome();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Stack minHeight={"100vh"} alignItems="center" justifyContent="center">
      <Typography variant="h2" color="primary">
        Home
      </Typography>
    </Stack>
  );
};

export default Home;
