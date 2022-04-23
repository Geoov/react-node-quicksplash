import axios from "axios";
import { API_URL } from "../config/config";

export const createUser = async (gameTableId, nickName) => {
  return await axios
    .put(`${API_URL}/api/user/createUser`, {
      id_game_table: gameTableId,
      name: nickName,
    })
    .then((response) => {
      return [response.data, null];
    })
    .catch((error) => {
      return [null, error.response];
    });
};
