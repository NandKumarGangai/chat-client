import React from "react";
import onlineIcon from "../../../icons/onlineIcon.png";
import videoCallIcon from "../../../icons/video.jpeg";
import "./style.css";

// const TextContainer = ({ users, currentUser = {}, callPeer }) => (
  const TextContainer = ({ users }) => (

  <div className="textContainer">
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name, id }) => (
              <div key={id} className="activeItem">
                <img
                  className="onlineIcon"
                  alt="Online Icon"
                  src={onlineIcon}
                />
                {`${name}`}
                {/* {name.toLowerCase() !== currentUser.name.toLowerCase() && (
                  <button type='button' onClick={() => callPeer(id, name)}>
                    <img
                    className="videoCallIcon"
                    alt="Online Icon"
                    src={videoCallIcon}
                  />
                  </button>
                )} */}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : (
      <div className="activeItem">{`Opps chat room is empty....`}</div>
    )}
  </div>
);

export default TextContainer;
