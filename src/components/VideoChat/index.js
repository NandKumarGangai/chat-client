import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import './style.css';

const VideoChat = () => {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const socket = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });

    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    setReceivingCall(false);
  };

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video
        width="320"
        height="240"
        ref={userVideo}
        controls
        muted
        autoPlay
      ></video>
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video
        width="320"
        height="240"
        ref={partnerVideo}
        controls
        muted
        autoPlay
      ></video>
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  return (
    <div>
      <div>{UserVideo}</div>
      <div>{PartnerVideo}</div>
      <div>
        {Object.keys(users).map((key) => {
          if (key === yourID) {
            return null;
          }
          return (
            <button type="button" onClick={() => callPeer(key)}>
              {`Call ${key}`}
            </button>
          );
        })}
      </div>
      <div>{incomingCall}</div>
    </div>
  );
};

export default VideoChat;
