import { Stack, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      bgcolor="#252525"
      minHeight={"100vh"}
    >
      <Typography variant="h2" color="secondary">
        Not Found
      </Typography>
    </Stack>
  );
};

export default NotFound;
