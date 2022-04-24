import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FindGame.scss";
import { Button } from "react-bootstrap";
import { createGameTable, updateGameTable } from "../../api/GameTableAPI";
import { createUser } from "../../api/UserAPI";
import socketIOClient from "socket.io-client";
import { API_URL } from "../../config/config";

function FindGame() {
  const [nickName, setNickName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [errorOccured, setErrorOccured] = useState("");
  const [gameCreated, setGameCreated] = useState(false);

  const navigate = useNavigate();
  const socket = socketIOClient(API_URL);

  const handleNickNameInputChange = (event) => {
    event.persist();
    setNickName(event.target.value);
  };

  const handleGameCodeInputChange = (event) => {
    event.persist();
    setGameCode(event.target.value);
  };

  useEffect(() => {
    socket.on("gameCreated", (data) => {
      console.log(data);
    });
  });

  async function joinGame() {
    if (!nickName || !gameCode) return;
  }

  async function createGame() {
    if (!nickName)
      await handleError({ status: 400, statusText: "NickName empty" });

    // socket.on("FromAPI", (data) => {
    //   console.log(data);
    // });
    socket.emit("createGame", { nickName });

    // console.log("1", errorOccured);

    // let [createdGame, errorCreatedGame] = !errorOccured
    //   ? await createGameTable()
    //   : [null, errorOccured];
    // if (errorCreatedGame) await handleError(errorCreatedGame);

    // console.log("2", errorOccured);

    // let [createdUser, errorCreatedUser] = !errorOccured
    //   ? await createUser(createdGame.id, nickName)
    //   : [null, errorOccured];
    // if (errorCreatedUser) await handleError(errorCreatedUser);
    // console.log("3", errorOccured);

    // let body = {
    //   id_host_user: createdUser.id,
    //   users_number: 1,
    // };
    // let [, errorUpdatedGame] = !errorOccured
    //   ? await updateGameTable(createdGame.id, body)
    //   : [null, errorOccured];
    // if (errorUpdatedGame) await handleError(errorUpdatedGame);
    // console.log("4", errorOccured);

    // navigate("/game");
  }

  async function handleError(error) {
    alert(error.status + "-" + error.statusText);
    setErrorOccured(error.statusText);
    return;
  }

  return (
    <div className="page-wrapper">
      <div className="card-wrapper">
        <div className="inputs-wrapper">
          <label>Nick Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={nickName}
            onChange={handleNickNameInputChange}
          ></input>
          <div className="separator py-3"></div>
          <label>Game Code</label>
          <br />
          <input
            type="text"
            name="gameCode"
            value={gameCode}
            onChange={handleGameCodeInputChange}
          ></input>
        </div>
        <div className="buttons-wrapper">
          <Button variant="primary" onClick={joinGame}>
            Join Game
          </Button>
          <div className="separator py-3"></div>
          <Button variant="danger" onClick={createGame}>
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindGame;
