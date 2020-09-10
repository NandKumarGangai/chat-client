import React, { useState, useEffect } from "react";
// import addNotification, { Notifications } from "react-push-notification";
import qs from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import TextContainer from "../TextContainer";
import "./style.css";

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // const ENDPOINT = "https://salty-ocean-14260.herokuapp.com/";
  const ENDPOINT = 'localhost:5000';
  
  useEffect(() => {
    const { name, room } = qs.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
        setMessages([...messages, message]);
        Notification.requestPermission().then( res => res === 'granted' ? true : false);
        if (message.user.toLowerCase() !== "admin") {
        // addNotification({
        //     title: "Chat App",
        //     subtitle: `New message from ${message.user.toUpperCase()}`,
        //     message: message.text || "",
        //     native: true, // when using native, your OS will handle theming.
        // });
        }
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, [messages]);

const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        {/* <Notifications /> */}
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;


/* const askNotificationPermission = () => {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
  
      // set the button to shown or hidden, depending on what the user answers
      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        console.log('Denied....');
      } else {
        console.log('Access....');
      }
    }
  
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }

    function checkNotificationPromise() {
        try {
          Notification.requestPermission().then();
        } catch(e) {
          return false;
        }
    
        return true;
      }
  } */