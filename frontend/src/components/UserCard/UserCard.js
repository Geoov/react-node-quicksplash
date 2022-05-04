import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";

const UserCard = ({ id, index, name, isReady, updateIsReady, canStart, startGame }) => {
  const reduxUserId = useSelector((state) => state.user.userId);

  const changeReadyState = () => {
    updateIsReady(index, isReady);
  };

  return (
    <div className="user-card">
      <p className="name mb-0">{name}</p>
      {index === 0 ? (
        <span> 
          {id === reduxUserId ? (
            canStart ? (
              <button onClick={startGame}>Start</button>
            ) : (
              "Waiting"
            )
          ) : (
            "Host"
          )}
        </span>
      ) : id === reduxUserId ? (
        <span>
          <input
            type="checkbox"
            id="ready-checkbox"
            onChange={changeReadyState}
          ></input>
        </span>
      ) : (
        <span>{isReady ? "ready" : "stand-by"}</span>
      )}
    </div>
  );
};

export default UserCard;
