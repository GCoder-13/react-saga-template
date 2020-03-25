import { all, fork } from 'redux-saga/effects';

import api from './api';

export default function* rootSaga() {
  yield all([
    fork(api),
  ]);
}
