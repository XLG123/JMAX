import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./LiveChat.css";

let socket;

const LivePrivateChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleKeyUp = () => {
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("stop typing");
      }, 500)
    );
  };

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.on("chat message", (msg) => {
      setChat([...chat, msg]);
    });

    // socket.on("typing", (user) => {
    //   setTyping(user + " is typing...");
    // });
    socket.on("typing", () => {
      console.log("Typing event received");
    //   debugger
      setTyping("A user is typing...");
    });

    socket.on("stop typing", () => {
      console.log("Stop typing event received");
    //    debugger
      setTyping(""); // Clear the message
    });

    // socket.on("stop typing", () => {
    //   setTyping(false);
    // });

    return () => socket.disconnect();
  }, [chat]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (typingTimeout) clearTimeout(typingTimeout);
    if (e.target.value.trim() === "") {
      socket.emit("stop typing");
    } else {
      setTypingTimeout(
        setTimeout(() => {
          socket.emit("stop typing");
        }, 500)
      );
      socket.emit("typing");
    }
  };

//   const handleInputBlur = () => {
//     socket.emit("stop typing"); // Send stop typing event when the input loses focus
//   };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
    socket.emit("stop typing");
  };

  return (
    <div className="live-private-chat-container">
      <ul className="live-private-chat-messages">
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <p className="typing-message">{typing && typing}</p>
      <form onSubmit={sendMessage} className="live-private-chat-input-form">
        <input
          value={message}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => socket.emit("typing")}>Test Typing</button>
      <button onClick={() => socket.emit("stop typing")}>
        Test Stop Typing
      </button>
    </div>
  );
};

export default LivePrivateChat;
