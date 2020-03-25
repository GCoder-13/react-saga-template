import { createAction } from 'redux-actions';

export const requestTypes = [
  'REQUEST',
  'SUCCESS',
  'FAILURE',
];

export const createActionType = (base, names, separator = '/') => names.reduce((res, item) => {
  const name = item.toUpperCase();

  return { ...res, [name]: `${base}${separator}${name}` };
}, { base });

export const createRequestTypes = (base, names, otherNames = []) => {
  const types = createActionType(base, names);

  const main = Object.keys(types).reduce((res, item) => ({
    ...res,
    [item]: createActionType(types[item], requestTypes),
  }), {});

  const other = createActionType(base, otherNames);

  return { ...main, ...other };
};

export const createActionRequest = (actions, method, path) => createAction(
  actions.REQUEST,
  (data) => ({
    API: {
      actions,
      method,
      path,
      data,
    },
  }),
);
