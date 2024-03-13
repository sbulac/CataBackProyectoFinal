import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../../context";

const useHome = () => {
  const { baseUrl, setSnackText } = useContext(AppContext);

  const token = localStorage.getItem("token");

  const getProducts = () => {
    try {
      axios
        .get(`${baseUrl}product`, { headers: { "access-token": token } })
        .then(({ data }) => console.log(data));
      // .catch(({ response: { data } }) => setSnackText(data.msg));
    } catch (error) {
      console.error(error);
    }
  };

  return { getProducts };
};

export default useHome;
