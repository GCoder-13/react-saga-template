import { createAction } from 'redux-actions';
import { createActionType } from '@/utils/actionHelpers';

export const ACCOUNTS = createActionType('ACCOUNTS', ['CREATE']);

export const createAccount = createAction(ACCOUNTS.CREATE);
