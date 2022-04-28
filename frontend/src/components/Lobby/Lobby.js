import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useSelector } from "react-redux";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const reduxGameCode = useSelector((state) => state.game.gameId);

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
    socket.emit("userReady", {
      index,
      id: users[index].id,
      gameCode: reduxGameCode,
    });
    // const temp = { ...isReadyObject };
    // temp[index] = !temp[index];
    // setIsReadyObject(temp);
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
              isReady={user.ready}
              updateIsReady={updateIsReadyObject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Lobby;
