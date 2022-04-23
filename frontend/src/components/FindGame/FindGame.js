import React, { useState } from "react";
import "./FindGame.scss";
import { Button } from "react-bootstrap";
import { createGameTable } from "../../api/GameTableAPI";
import { API_URL } from "../../config/config";
import axios from "axios";

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
    console.log("1");
  }

  async function createGame() {
    let [data, error] = await createGameTable();

    if (error) handleError(error);

    
  }

  function handleError(error) {
    alert(error);
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
