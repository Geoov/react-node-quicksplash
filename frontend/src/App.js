import React, { useState } from "react";
import { SocketContext, socket } from "./context/socket";
import "./App.scss";
import FindGame from "./components/FindGame/FindGame";
import Lobby from "./components/Lobby/Lobby";

function App() {
  const [gameFound, setGameFound] = useState("");

  const handleFindGame = (gameCode) => {
    setGameFound(gameCode);
  };

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        {!gameFound ? (
          <FindGame onJoinedGame={handleFindGame}></FindGame>
        ) : (
          <Lobby currentGameCode={gameFound}></Lobby>
        )}
      </SocketContext.Provider>
    </div>
  );
}

export default App;
