import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";

const UserCard = ({ id, index, name, isReady, updateIsReady }) => {
    const stateId = useSelector((state) => state.user.userId);

  const changeReadyState = () => {
    updateIsReady(index);
  };

  return (
    <div className="user-card">
      <p className="name mb-0">{id} - {name}</p>
      <span>
        <input
          type="checkbox"
          id="ready-checkbox"
          onChange={changeReadyState}
        ></input>
      </span>
    </div>
  );
};

export default UserCard;
