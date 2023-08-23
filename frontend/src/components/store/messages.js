import React from "react";
import jwtFetch from "./jwt";

export const SET_MESSAGES = "SET_MESSAGES";

export const setMessages = (messages, userId) => ({
  type: SET_MESSAGES,
  messages,
  userId
});

// Fetching Ids associated with a user
export const SET_ASSOCIATED_IDS = "SET_ASSOCIATED_IDS";

// Action Creator
export const setAssociatedIds = (associatedIds) => ({
  type: SET_ASSOCIATED_IDS,
  associatedIds,
});

export const fetchMessages = (userId, otherUserId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/messages/${userId}/${otherUserId}`);
    if (!response.ok) {
      throw new Error("Error fetching messages");
    }
    const messages = await response.json();

    dispatch(setMessages(messages, userId));

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

// Thunk to Fetch Associated IDs
export const fetchAssociatedIds = (userId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/messages/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching associated IDs");
    }
    const associatedIds = await response.json();

    dispatch(setAssociatedIds(associatedIds));
  } catch (error) {
    throw new Error("Error fetching associated IDs: " + error.message);
  }
};

const initialState = [];
const messagesReducer = (state = {users: {}, messages: {}}, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      // Convert the object values to an array
      const messagesArray = Object.values(action.messages);
      const userId = action.userId;
      return {...state, messages: messagesArray};
    case SET_ASSOCIATED_IDS:
      return {...state, users: action.associatedIds};
    default:
      return state;
  }
};

export default messagesReducer;
