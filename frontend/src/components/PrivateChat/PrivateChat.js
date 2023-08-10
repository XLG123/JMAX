import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./PrivateChat.css";
import { useParams } from "react-router-dom";

const PrivateChat = () => {
  const { userId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = io("http://localhost:4000");

  useEffect(() => {
    // this is to Listen to incoming private messages just like in the www file we need "on"
    socket.on("private message", (msg) => {
      if (
        (msg.sender === userId && msg.receiver === receiverId) ||
        (msg.sender === receiverId && msg.receiver === userId)
      ) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, receiverId, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
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
          <div
            key={index}
            className={msg.sender === userId ? "sent" : "received"}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="live-private-chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default PrivateChat;
