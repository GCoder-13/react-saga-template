import { combineReducers } from 'redux';

import loading from './loading';
import account from './account';

const rootReducer = combineReducers({
  loading,
  account,
});

export default rootReducer;
