import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./LiveChat.css"

let socket;

const LivePrivateChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.on("chat message", (msg) => {
      setChat([...chat, msg]);
    });

    return () => socket.disconnect();
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };
  return (
    <div className="live-private-chat-container">
      <ul className="live-private-chat-messages">
        {chat.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
      <form onSubmit={sendMessage} className="live-private-chat-input-form">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default LivePrivateChat;
