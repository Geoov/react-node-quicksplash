import React, { useState } from "react";
import "./FindGame.scss";
import { Button } from "react-bootstrap";
import { createGameTable, updateGameTable } from "../../api/GameTableAPI";
import { createUser } from "../../api/UserAPI";

function FindGame() {
  const [nickName, setNickName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const handleNickNameInputChange = (event) => {
    event.persist();
    setNickName(event.target.value);
  };

  const handleGameCodeInputChange = (event) => {
    event.persist();
    setGameCode(event.target.value);
  };

  async function joinGame() {
    if (!nickName || !gameCode) return;
  }

  async function createGame() {
    if (!nickName) return;

    let [createdGame, errorCreatedGame] = await createGameTable();
    if (errorCreatedGame) handleError(errorCreatedGame);

    let [createdUser, errorCreatedUser] = await createUser(
      createdGame.id,
      nickName
    );
    if (errorCreatedUser) handleError(errorCreatedUser);

    let body = {
      id_host_user: createdUser.id,
      users_number: 1,
    };
    let [updatedGame, errorUpdatedGame] = await updateGameTable(
      createdGame.id,
      body
    );
    if (errorUpdatedGame) handleError(errorUpdatedGame);
  }

  function handleError(error) {
    alert(error.status + "-" + error.statusText);
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
