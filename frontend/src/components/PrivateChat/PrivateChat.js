import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../LiveChat/LiveChat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messages";

let socket;

const PrivateChat = () => {
  const { userId, otherUserId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const dispatch = useDispatch();
  const messagesFromStore = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.session.user);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState("");

  useEffect(() => {
    dispatch(fetchMessages(userId, otherUserId));

    socket = io("http://localhost:4000");
    socket.emit("register user", userId);

    socket.on("typing in private", (typingInfo) => {
      if (typingInfo.sender === otherUserId) {
        setIsTyping(true);
        setTypingUsername(typingInfo.username); // set the username of the person typing
      }
    });

    socket.on("stop typing in private", () => {
      setIsTyping(false);
      setTypingUsername(""); // clear the username when typing stops
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
    <div className="chat-box-container">
      <div className="chat-user">
        {currentUser.username}

        {/* display the typing username */}
      </div>
      <div className="scrollable-chat">
        <div className="chat">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === userId
                  ? "sent chat-bubble-right"
                  : "received chat-bubble-left"
              }
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>

      <p className="typing-message">{isTyping && <span> {typingUsername} is typing...</span>}{" "}</p>

      <div className="sticky-input">
        <form onSubmit={sendMessage} className="live-private-chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onKeyDown={() =>
              socket.emit("typing in private", {
                sender: userId,
                receiver: otherUserId,
                username: currentUser.username,
              })
            }
            onKeyUp={() => socket.emit("stop typing in private")} // Add this line
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default PrivateChat;
