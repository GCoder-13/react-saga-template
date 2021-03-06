import { ACCOUNTS } from '@/services/actions/accounts';

const initState = {
  currentUser: '',
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACCOUNTS.CREATE:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
