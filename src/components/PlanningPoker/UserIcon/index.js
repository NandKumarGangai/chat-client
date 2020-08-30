import React from "react";
import "./style.css";

const UserIcon = (props) => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  const random = rand(1, 16);

  return (
    <div className="ui-box">
      <h1 className={`p${random}`}>
          {capitalize(props.user.name || 'PERSON')}
      </h1>
      <div className={`ui-poster p${random}`}>
        <h4>{ props.user.showPoints ? props.user.points : 'Z'}</h4>
      </div>
    </div>
  );
};

export default UserIcon;
