import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FindGame from "./components/FindGame/FindGame";
import UserCard from "./components/UserCard/UserCard";
import Game from "./components/Game/Game";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FindGame />} />
        <Route path="/user" element={<UserCard />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
