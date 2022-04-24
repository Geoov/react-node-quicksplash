import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

function Lobby() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(["Geov", "Test1", "Test2", "Test4"]);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="users-wrapper">
        {users.map((user) => {
          <UserCard name={user} />;
        })}
      </div>
    </div>
  );
}

export default Lobby;
