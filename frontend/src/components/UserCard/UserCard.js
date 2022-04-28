import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";

const UserCard = ({ id, index, name, isReady, updateIsReady }) => {
  const reduxUserId = useSelector((state) => state.user.userId);

  useEffect(() => {
    console.log(isReady);
  }, [isReady]);

  const changeReadyState = () => {
    updateIsReady(index);
  };

  return (
    <div className="user-card">
      <p className="name mb-0">{name}</p>
      {id === reduxUserId ? (
        <span>
          <input
            type="checkbox"
            id="ready-checkbox"
            onChange={changeReadyState}
          ></input>
        </span>
      ) : (
        <span>{isReady ? 'ready' : 'stand-by'}</span>
      )}
    </div>
  );
};

export default UserCard;
