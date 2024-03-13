import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import StyledInput from "../../../components/StyledInput";
import useLogin from "./useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { onLogin } = useLogin();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        onLogin();
      }
    };

    // Agrega un event listener al montar el componente
    document.addEventListener("keydown", handleKeyPress);

    // Remueve el event listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onLogin]);

  return (
    <Stack
      minHeight="100vh"
      minWidth="100vw"
      alignItems="center"
      justifyContent="center"
      bgcolor="#252525"
    >
      <Stack
        spacing={2.5}
        bgcolor="#eee"
        sx={{
          borderRadius: 1,
          py: 3,
          px: 3,
          width: { xs: "90%", sm: "50%", lg: "34%" },
        }}
        alignItems="center"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={{ xs: 0.6, sm: 1.5 }}
        >
          <Typography sx={{ fontSize: { xs: 20 }, fontWeight: 300 }}>
            Entra a tu cuenta
          </Typography>
        </Stack>
        <Stack spacing={2} width="100%">
          {/* account Input */}
          <StyledInput
            validation={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "El email debe ser válido",
              },
            }}
            name={"Ingresa tu correo"}
            type={"text"}
            id={"outlinedEmail"}
            sx={{
              "input::-webkit-inner-spin-button": {
                appearance: "none",
              },
            }}
          />
          {/* password input */}
          <StyledInput
            validation={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            }}
            name={"Ingresa tu contraseña"}
            type={!showPassword ? "password" : "text"}
            id={"outlinedPassword"}
            sx={{
              "input::-webkit-inner-spin-button": {
                appearance: "none",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffRounded color="primary" />
                  ) : (
                    <VisibilityRounded color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={onLogin}
          fullWidth
          sx={{ color: "#eee", textTransform: "capitalize", fontSize: 18 }}
        >
          Ingresar
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
