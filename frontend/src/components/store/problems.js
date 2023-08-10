import jwtFetch from './jwt';
import * as offerActions from "./offers"
import { RECEIVE_USER_LOGOUT } from './session';
const RECEIVE_PROBLEMS = "problems/RECEIVE_PROBLEMS";
const RECEIVE_USER_PROBLEMS = "problems/RECEIVE_USER_PROBLEMS";
const RECEIVE_NEW_PROBLEM = "problems/RECEIVE_NEW_PROBLEM";
export const REMOVE_PROBLEM = "problems/REMOVE_PROBLEM"; 
const RECEIVE_PROBLEM_ERRORS = "problems/RECEIVE_PROBLEM_ERRORS";
const CLEAR_PROBLEM_ERRORS = "problems/CLEAR_PROBLEM_ERRORS";
const UPDATE_PROBLEM= "problems/UPDATE_PROBLEM"

const updateProblem = (id, updatedProblem) => ({
  type: UPDATE_PROBLEM,
  id,
  updatedProblem
});
const receiveProblems = problems => ({
  type: RECEIVE_PROBLEMS,
  problems
});

const receiveUserProblems = problems => ({
  type: RECEIVE_USER_PROBLEMS,
  problems
});

const receiveNewProblem = problem => ({
  type: RECEIVE_NEW_PROBLEM,
  problem
});

const receiveErrors = errors => ({
  type: RECEIVE_PROBLEM_ERRORS,
  errors
});

export const clearProblemErrors = errors => ({
  type: CLEAR_PROBLEM_ERRORS,
  errors
});

export const fetchProblems = () => async dispatch => {
  // debugger
  try {
    const res = await jwtFetch('/api/problems');
    const problems = await res.json();
    dispatch(receiveProblems(problems));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserProblems = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/users/${id}/problems`);
    const problems = await res.json();
    dispatch(receiveUserProblems(problems));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteProblem = (id) => async (dispatch,getState) => {
  await jwtFetch(`/api/problems/${id}`, {
    method: 'DELETE',
  });
const user=getState().session.user
  dispatch({
    type: REMOVE_PROBLEM,
    problemId: id,
  });

  dispatch(fetchUserProblems(user._id))

}

export const composeProblem = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/problems/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const problem = await res.json();
    dispatch(receiveNewProblem(problem));
    dispatch(fetchProblems())
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const fetchUpdateProblem = (problemId, updatedData) => async (dispatch,getState) => {
  try {
    const res = await jwtFetch(`/api/problems/${problemId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedData)
    });
    const user=getState().session.user

    if (res.ok) {
      const updatedProblem = await res.json();
      dispatch(updateProblem(problemId, updatedProblem));
      dispatch(offerActions.fetchUserOffers(user._id))

    } 
  } catch (err) {
    // Handle error
  }
};


const nullErrors = null;

export const problemErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_PROBLEM_ERRORS:
      return action.errors;
    case RECEIVE_NEW_PROBLEM:
    case CLEAR_PROBLEM_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const problemsReducer = (state = { all: {}, user: [], new: undefined }, action) => {
  switch (action.type) {
    case RECEIVE_PROBLEMS:
      return { ...state, all: action.problems, new: undefined };
    case RECEIVE_USER_PROBLEMS:
      return { ...state, userProblems: action.problems, new: undefined };
    case RECEIVE_NEW_PROBLEM:
      return { ...state, new: action.problem };
    case REMOVE_PROBLEM:
      let newState = {...state};
      delete newState[action.problemId];
      return newState;
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: [], new: undefined }
      case UPDATE_PROBLEM:
        return { ...state};
    default:
      return state;
  }
};

export default problemsReducer;