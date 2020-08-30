import React, { useState } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import "./style.css";

const Join = ({ location }) => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("Planning");
  const [errs, setErrs] = useState(false);
  const { to } = qs.parse(location.search);

  const onSubmit = (e) => {
    if (!name || !room) {
      e.preventDefault();
      setErrs(true);
      return;
    }
    setErrs(false);

    return null;
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="joinInput"
            onChange={(e) => setname(e.target.value)}
          />
          {errs && <small>Please enter valid name.</small>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="joinInput"
            defaultValue="Planning"
            disabled
            onChange={(e) => setroom(e.target.value)}
          />
        </div>
        <Link onClick={onSubmit} to={`/${to}?name=${name}&room=${to === 'planningpoker' ? 'planningpoker' : 'chatting'}`}>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
