import axios from "axios";
import { API_URL } from "../config/config";

export const createGameTable = async () => {
  return await axios
    .put(`${API_URL}/api/gameTable/createGame`)
    .then((response) => {
      return [response.data, null];
    })
    .catch((error) => {
      return [null, Promise.reject(error)];
    });
};
