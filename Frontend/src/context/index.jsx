import { createContext, useState } from "react";
import { useForm } from "react-hook-form";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseUrl = "http://localhost:3000/";

  const [snackText, setSnackText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AppContext.Provider
      value={{
        register,
        errors,
        baseUrl,
        handleSubmit,
        snackText,
        setSnackText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
