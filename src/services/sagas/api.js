import {
  call,
  put,
  take,
  fork,
} from 'redux-saga/effects';

import sendRequest from '@/utils/apiHelpers';

function* processRequest({ actions, ...payload } = {}) {
  if (!actions) return;

  try {
    const res = yield call(sendRequest, payload);
    yield put({
      type: actions.SUCCESS,
      payload: {
        res,
        req: payload,
      },
    });
  } catch (res) {
    if (payload.options.showErrors) {
      if (res.message) {
        console.error(res.message);
      } else if (res.errors) {
        Object.keys(res.errors).forEach((field) => {
          const errors = res.errors[field];

          if (errors instanceof Array) {
            errors.forEach((error) => {
              console.error(error);
            });
          } else {
            console.error(errors);
          }
        });
      }
    }

    yield put({
      type: actions.FAILURE,
      payload: {
        res,
        req: payload,
      },
    });
  }
}

/**
 * Watch actions for API requests
 */
export default function* watchApiRequests() {
  while (true) {
    // eslint-disable-next-line no-loop-func
    const { payload } = yield take((action) => action.payload && action.payload.API);

    yield fork(processRequest, payload.API);
  }
}
