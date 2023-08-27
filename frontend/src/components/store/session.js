import jwtFetch from "./jwt";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
export const RECEIVE_USERS = "session/RECEIVE_USERS";
const RECEIVE_USER = "session/RECEIVE_USER";
const Update_USER ="session/Update_USER"
const updateUser=(user)=>({
  type: Update_USER,
  user,
})
const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});
// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Dispatch receiveErrors to show authentication errors on the frontend.
export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const signup = (user) => startSession(user, "api/users/register");
export const login = (user) => startSession(user, "api/users/login");

const startSession = (userInfo, route) => async (dispatch) => {
  const { email, username, password, address, age, image } = userInfo;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("address", address);
  formData.append("password", password);
  formData.append("username", username);
  formData.append("age", age);
  if (image) formData.append("image", image);

  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: formData,
    });
    const { user, token } = await res.json();
    localStorage.setItem("jwtToken", token);
    return dispatch(receiveCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(logoutUser());
};

const initialState = {
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    case RECEIVE_USERS:
      return { ...state, users: action.users };
    case RECEIVE_USER:
      return { ...state, users: action.user };
      case Update_USER:
        return {...state,users:action.user}
    default:
      return state;
  }
};

export default sessionReducer;

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await jwtFetch("/api/users/current");
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export const fetchAllUsers = () => async (dispatch) => {
  // debugger
  const res = await jwtFetch("/api/users");
  const users = await res.json();
  return dispatch(receiveUsers(users));
};
export const fetchUser = (userId) => async (dispatch) => {
  // debugger
  const res = await jwtFetch(`/api/users/${userId}`);
  const user = await res.json();
  return dispatch(receiveUser(user));
};

export const fetchUpdareUser=(user) => async (dispatch, getState) => {
    const { image, ...otherUpdatedData } = user;
    const formData = new FormData();
    formData.append("image", image);
    Object.keys(otherUpdatedData).forEach((key) => {
      formData.append(key, otherUpdatedData[key]);
    });
    try {
      const res = await jwtFetch(`/api/users/${user._id}/profile-image`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        
        const updatedUser = await res.json();
        dispatch(updateUser(updatedUser));
        dispatch(getCurrentUser())
        // dispatch(receiveCurrentUser(updatedUser))
      }
    } catch (err) {
      // Handle error
    }
  };