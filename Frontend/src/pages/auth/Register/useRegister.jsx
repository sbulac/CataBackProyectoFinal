import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const { baseUrl, handleSubmit, setSnackText } = useContext(AppContext);
  const navigation = useNavigate();

  const onRegister = handleSubmit(
    ({
      outlinedName: name,
      outlinedEmail: email,
      outlinedPassword: password,
    }) => {
      try {
        axios
          .post(`${baseUrl}auth/register`, {
            name,
            role: "Client",
            email,
            password,
          })
          .then(({ data: { msg } }) => {
            // set msg snackbar
            setSnackText(msg);
            setTimeout(() => {
              navigation("/login");
            }, 2500);
          });
      } catch (error) {
        console.error(error);
      }
    }
  );

  return { onRegister };
};

export default useRegister;
