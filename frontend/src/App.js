import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FindGame from "./components/FindGame/FindGame";
import UserCard from "./components/UserCard/UserCard";
import './App.scss';
// import socketIOClient from "socket.io-client";
// import { API_URL } from "../../config/config";
  // useEffect(() => {
  //   const socket = socketIOClient(API_URL);
  //   socket.on("FromAPI", (data) => {
  //     setResponse(data);
  //   });
  // }, []);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FindGame />} />
        <Route path="/user" element={<UserCard />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
