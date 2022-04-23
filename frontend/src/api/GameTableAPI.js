import axios from "axios";
import { API_URL } from "../config/config";

export const createGameTable = async () => {
  return await axios
    .put(`${API_URL}/api/gameTable/createGame`)
    .then((response) => {
      return [response.data, null];
    })
    .catch((error) => {
      return [null, error.response];
    });
};

export const updateGameTable = async (gameId, body) => {
  return await axios
    .patch(`${API_URL}/api/gameTable/updateGame/${gameId}`, body)
    .then((response) => {
      return [response.data, null];
    })
    .catch((error) => {
      return [null, error.response];
    });
};
