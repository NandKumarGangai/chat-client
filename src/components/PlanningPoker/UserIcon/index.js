import React from "react";
import "./style.css";

const UserIcon = ({ user, currentUser }) => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const random = rand(1, 16);
  const userName = () =>
    user.name.toLowerCase() !== currentUser.name.toLowerCase()
      ? user.name || "Unknown"
      : `${user.name} (@ME)`;

  return (
    <div className="ui-box">
      <h1 className={`p${random}`}>{capitalize(userName())}</h1>
      <div className={`ui-poster p${random}`}>
        <h4>{user.showPoints ? user.points : "Z"}</h4>
      </div>
    </div>
  );
};

export default UserIcon;
