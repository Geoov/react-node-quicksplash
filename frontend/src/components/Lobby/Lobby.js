import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode }) => {
  const socket = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  const [isReadyObject, setIsReadyObject] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  });

  useEffect(() => {
    if (!currentGameCode) return;

    socket.emit("getUsers", { gameCode: currentGameCode });
  }, []);

  socket.on("gameUsers", (data) => {
    if (!equals(users, data.gameUsers.users)) {
      setUsers(data.gameUsers.users);
    }
  });

  const updateIsReadyObject = (index) => {
    const temp = { ...isReadyObject };
    temp[index] = !temp[index];
    setIsReadyObject(temp);
  };

  return (
    <div className="page-wrapper">
      <div className="users-wrapper">
        {users.map((user, index) => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              index={index}
              name={user.nickName}
              isReady={isReadyObject[index]}
              updateIsReady={updateIsReadyObject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Lobby;
