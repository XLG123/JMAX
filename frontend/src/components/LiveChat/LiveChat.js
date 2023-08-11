import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./LiveChat.css";
import { useSelector } from 'react-redux';

let socket;

const LivePrivateChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  // const currentUser = useSelector(state => state.session.user);

  const handleKeyUp = () => {
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (socket) socket.emit("stop typing");
      }, 500)
    );
  };

  useEffect(() => {
    socket = io("https://jmax.onrender.com");

    socket.on("chat message", (msg) => {
      setChat([...chat, msg]);
    });

    socket.on("typing", () => {
      console.log("Typing event received");
      setTyping("A user is typing...");
    });

    socket.on("stop typing", () => {
      console.log("Stop typing event received");
      setTyping(""); // Clear the message
    });

    return () => socket.disconnect();
  }, [chat]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (typingTimeout) clearTimeout(typingTimeout);
    if (e.target.value.trim() === "") {
      if (socket) socket.emit("stop typing");
    } else {
      setTypingTimeout(
        setTimeout(() => {
          if (socket) socket.emit("stop typing");
        }, 500)
      );
      if (socket) socket.emit("typing");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket) socket.emit("chat message", message);
    setMessage("");
    if (socket) socket.emit("stop typing");
  };

  // console.log(chat);
  return (
    <div className="chat-box-container">

      <div className="scrollable-chat">
        <div className="chat">

          {chat.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>

      <p className="typing-message">{typing && typing}</p>

      <div className="sticky-input">
        <form onSubmit={sendMessage} className="live-private-chat-input-form">
          <input
            value={message}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            placeholder="Enter a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {/* <button onClick={() => socket && socket.emit("typing")}>Test Typing</button>
      <button onClick={() => socket && socket.emit("stop typing")}>
        Test Stop Typing
      </button> */}
    </div>
  );
};

export default LivePrivateChat;
