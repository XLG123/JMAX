import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

const LivePrivateChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
};
