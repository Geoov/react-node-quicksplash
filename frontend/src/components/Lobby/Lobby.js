import React, { useState, useEffect } from "react";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

function Lobby() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <div className="page-wrapper">
      <div className="users-wrapper">
        {users.map((user, index) => {
          return <UserCard key={index} name={user} />;
        })}
      </div>
    </div>
  );
}

export default Lobby;
