import React, { useState, useEffect } from "react";
import io from "socket.io-client";

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
    <div>
      <ul>
        {chat.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
      <form onSubmit={sendMessage}>
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
