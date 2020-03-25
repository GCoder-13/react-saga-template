import { createSelector } from 'reselect';

export default function createLoadingSelector(actions) {
  return createSelector(
    (state) => state.loading,
    (loading) => {
      const actionsList = actions instanceof Array ? actions : [actions];

      return actionsList.some(
        (action) => (loading && loading[action]) || false,
      );
    },
  );
}
