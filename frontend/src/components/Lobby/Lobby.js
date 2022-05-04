import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useSelector } from "react-redux";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode }) => {
  const socket = useContext(SocketContext);
  const reduxGameCode = useSelector((state) => state.game.gameId);
  const [users, setUsers] = useState([]);
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    if (!currentGameCode) return;
    socket.emit("getUsers", { gameCode: currentGameCode });
  }, [currentGameCode, socket]);

  socket.on("gameUsers", (data) => {
    if (!equals(users, data.gameUsers.users)) {
      setUsers(data.gameUsers.users);
    }
  });

  const toggleReadyState = (index, isReady) => {
    socket.emit("toggleReadyState", {
      index,
      id: users[index].id,
      gameCode: reduxGameCode,
      readyState: !isReady,
    });
  };

  useEffect(() => {
    let allPlayersReady = true;
    users.forEach((user) => {
      if (user.ready === false) {
        allPlayersReady = false;
        return;
      }
    });
    allPlayersReady && users.length > 1
      ? setCanStart(true)
      : setCanStart(false);
  }, [users]);

  const startGame = () => {
    socket.emit("startGame", {
      gameCode: reduxGameCode,
    });
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
              updateIsReady={toggleReadyState}
              canStart={canStart}
              startGame={startGame}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Lobby;
