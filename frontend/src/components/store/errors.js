import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { problemErrorsReducer } from './problems';

export default combineReducers({
  session: sessionErrorsReducer,
  problemErrors: problemErrorsReducer
});