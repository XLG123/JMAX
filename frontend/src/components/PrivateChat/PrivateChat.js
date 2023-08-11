import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./PrivateChat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messages";

let socket;

const PrivateChat = () => {
  const { userId, otherUserId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const dispatch = useDispatch();
  const messagesFromStore = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages(userId, otherUserId));

    socket = io("http://localhost:4000");
    socket.emit("register user", userId);

    socket.on("private message", (msg) => {
      if (msg.sender === otherUserId && msg.receiver === userId) {
        // Fetch updated messages and setMessages
        dispatch(fetchMessages(userId, otherUserId));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, otherUserId, dispatch]);

  useEffect(() => {
    setMessages(messagesFromStore);
  }, [messagesFromStore]);

  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }

    const message = {
      sender: userId,
      receiver: otherUserId,
      content: inputMessage,
    };

    socket.emit("private message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInputMessage("");
  };

  return (
    <div className="live-private-chat-container">
      <div className="live-private-chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.messageId}
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
