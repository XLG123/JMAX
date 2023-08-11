// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import "./PrivateChat.css";
// import { useParams } from "react-router-dom";

// let socket;

// const PrivateChat = () => {
//   const { userId, receiverId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   useEffect(() => {
//       const socket = io("http://localhost:4000");
//     // this is to Listen to incoming private messages just like in the www file we need "on"
//     socket.on("private message", (msg) => {
//       if (
//         (msg.sender === userId && msg.receiver === receiverId) ||
//         (msg.sender === receiverId && msg.receiver === userId)
//       ) {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, receiverId]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     const message = {
//       sender: userId,
//       receiver: receiverId,
//       content: inputMessage,
//     };

//     // just like in the www file we need "emit" or send the message to the server
//     socket.emit("private message", message);

//     // we gotta set the messages in the state
//     setMessages((prevMessages) => [...prevMessages, message]);
//     setInputMessage("");
//   };

//   return (
//     <div className="live-private-chat-container">
//       <div className="live-private-chat-messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={msg.sender === userId ? "sent" : "received"}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className="live-private-chat-input-form">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="Enter a message"
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default PrivateChat;
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./PrivateChat.css";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

let socket;

const PrivateChat = () => {
  const { userId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.emit("register user", userId)

    socket.on("private message", (msg) => {
      if (

        (msg.sender === receiverId && msg.receiver === userId)
      ) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, receiverId]);

  const sendMessage = (e) => {

    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }

    const message = {
      sender: userId,
      receiver: receiverId,
      content: inputMessage,
    };

    socket.emit("private message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInputMessage("");
  };

  return (
    <div className="chat-box-container">
      <div className="chat-user">
        {/* {currentUser?.email} */}
        Other User
      </div>

      <div className="scrollable-chat">
        <div className="chat">
          {messages.receiverId}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === userId ?
                "sent talk-bubble" : "received talk-bubble tri-left border round btm-right-in"}
            >
              {msg.content}
              {msg.timestamps}
            </div>
          ))}
      </div>

      </div>

      <div className="sticky-input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={inputMessage}
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
