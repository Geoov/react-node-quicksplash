import React from "react";
import { SocketContext, socket } from "./context/socket";
import "./App.scss";
import FindGame from "./components/FindGame/FindGame";

function App() {

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <FindGame></FindGame>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
