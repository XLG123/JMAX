import React from "react";
import jwtFetch from "./jwt";

export const SET_MESSAGES = "SET_MESSAGES";

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
});

export const fetchMessages = (userId, otherUserId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/messages/${userId}/${otherUserId}`);
    if (!response.ok) {
      throw new Error("Error fetching messages");
    }
    const messages = await response.json();

    dispatch(setMessages(messages));

    //   return messages;
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await jwtFetch(`api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error("Error sending message");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error sending message: " + error.message);
  }
};

const initialState = [];

// const messagesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_MESSAGES:
//       return { ...state, ...action.messages };
//     default:
//       return state;
//   }
// };

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      // Convert the object values to an array
      const messagesArray = Object.values(action.messages);
      return messagesArray;
    default:
      return state;
  }
};


export default messagesReducer;
