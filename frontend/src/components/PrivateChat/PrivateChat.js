import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./PrivateChat.css";

const PrivateChat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = io("http://localhost:4000");

  useEffect(() => {
    // Listen to incoming private messages
    socket.on("private message", (msg) => {
      if ((msg.sender === userId && msg.receiver === receiverId) || (msg.sender === receiverId && msg.receiver === userId)) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, receiverId, socket]);

  const sendMessage = () => {
    const message = {
      sender: userId,
      receiver: receiverId,
      content: inputMessage,
    };

    // just like in the www file we need "emit" or send the message to the server
    socket.emit("private message", message);

    // we gotta set the messages in the state
    setMessages((prevMessages) => [...prevMessages, message]);
    setInputMessage("");
  };

  return (
    <div className="live-private-chat-container">
    <div className="live-private-chat-messages">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === userId ? "sent" : "received"}>{msg.content}</div>
      ))}
    </div>
    <div className="input-container">
      <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Enter a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
  );
};

export default PrivateChat;
