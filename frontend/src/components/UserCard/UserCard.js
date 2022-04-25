import React from "react";
import "./UserCard.scss";

function UserCard({ name }) {
  return (
    <div className="user-card">
      <p className="name mb-0">{name}</p>
    </div>
  );
}

export default UserCard;
