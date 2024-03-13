import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";

const useLogin = () => {
  const navigation = useNavigate();
  const { baseUrl, handleSubmit, setSnackText } = useContext(AppContext);

  const onLogin = handleSubmit(
    ({ outlinedEmail: email, outlinedPassword: password }) => {
      try {
        axios
          .post(`${baseUrl}auth/login`, { email, password })
          .then(({ data: { user, access_token, msg } }) => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", access_token);
            setSnackText(msg);
            setTimeout(() => {
              if (user.role === "Admin") {
                navigation("/admin");
              } else {
                navigation("/client");
              }
            }, 2500);
          });
      } catch (error) {
        console.error(error);
      }
    }
  );
  return { onLogin };
};
export default useLogin;
