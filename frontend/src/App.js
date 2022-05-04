import React, { useState } from "react";
import { SocketContext, socket } from "./context/socket";
import { useDispatch } from "react-redux";
import { setUserId, setUserVotes } from "./features/userSlice";
import { setGameId } from "./features/gameSlice";
import "./App.scss";
import FindGame from "./components/FindGame/FindGame";
import Lobby from "./components/Lobby/Lobby";

function App() {
  const dispatch = useDispatch();

  const [gameFound, setGameFound] = useState("");

  const handleFindGame = (data) => {
    setGameFound(data.gameCode);
    dispatch(setGameId(data.gameCode));
    dispatch(setUserId(data.user.id));
    dispatch(setUserVotes(data.user.votes));
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
