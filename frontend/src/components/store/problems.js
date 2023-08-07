import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_PROBLEMS = "problems/RECEIVE_PROBLEMS";
const RECEIVE_USER_PROBLEMS = "problems/RECEIVE_USER_PROBLEMS";
const RECEIVE_NEW_PROBLEM = "problems/RECEIVE_NEW_PROBLEM";
const RECEIVE_PROBLEM_ERRORS = "problems/RECEIVE_PROBLEM_ERRORS";
const CLEAR_PROBLEM_ERRORS = "problems/CLEAR_PROBLEM_ERRORS";

const receiveProblems = problems => ({
  type: RECEIVE_PROBLEMS,
  problems
});

const receiveUserProbles = problems => ({
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
    const res = await jwtFetch(`/api/problems/user/${id}`);
    const tweets = await res.json();
    // dispatch(receiveUserProblems(problems));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

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

const problemsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch (action.type) {
    case RECEIVE_PROBLEMS:
      return { ...state, all: action.problems, new: undefined };
    case RECEIVE_USER_PROBLEMS:
      return { ...state, user: action.problems, new: undefined };
    case RECEIVE_NEW_PROBLEM:
      return { ...state, new: action.problem };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default problemsReducer;