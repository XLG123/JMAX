import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../LiveChat/LiveChat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messages";
import { useRef } from "react";

let socket;

const PrivateChat = () => {
  const { userId, otherUserId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const dispatch = useDispatch();
  const messagesFromStore = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.session.user);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const scrollableChatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(userId, otherUserId));

    socket = io("http://localhost:4000");
    socket.emit("register user", userId);

    socket.on("private message", (msg) => {
      if (msg.sender !== userId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    socket.on("typing in private", (typingInfo) => {
      if (typingInfo.sender === otherUserId) {
        setIsTyping(true);
        setTypingUsername(typingInfo.username);
      }
    });

    socket.on("stop typing in private", () => {
      setIsTyping(false);
      setTypingUsername("");
    });

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
      socket.disconnect();
    };
  }, [userId, otherUserId, dispatch]);

  useEffect(() => {
    setMessages(messagesFromStore);
  }, [messagesFromStore]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatContainer = scrollableChatRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);

    if (typingTimeout) clearTimeout(typingTimeout);

    if (e.target.value.trim() === "") {
      socket.emit("stop typing in private", {
        sender: userId,
        receiver: otherUserId,
      });
    } else {
      socket.emit("typing in private", {
        sender: userId,
        receiver: otherUserId,
        username: currentUser.username,
      });

      setTypingTimeout(
        setTimeout(() => {
          socket.emit("stop typing in private", {
            sender: userId,
            receiver: otherUserId,
          });
        }, 1000)
      );
    }
  };

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
      <div className="chat-user">{currentUser.username}</div>
      <div className="scrollable-chat" ref={scrollableChatRef}>
        <div className="chat">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div className="chat-bubble-owner-private-chat">
                {msg.sender === userId ? currentUser.username : typingUsername}
              </div>
              <div
                className={
                  msg.sender === userId
                    ? "sent chat-bubble-right"
                    : "received chat-bubble-left"
                }
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="typing-message-private-container">
        {isTyping && <span> {typingUsername} is typing...</span>}{" "}
      </p>
      <div className="sticky-input">
        <form onSubmit={sendMessage} className="live-private-chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Enter a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default PrivateChat;
