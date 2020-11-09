import UserType from './user-types';
import { makeActionCreator } from '../../../utils/utils';
import { UserPayload } from '../../../constants/types';


export const setUserStatus = makeActionCreator<UserPayload>(UserType.SET_USER_STATUS);
export const setUser = makeActionCreator<UserPayload>(UserType.SET_USER);
export const setError = makeActionCreator<UserPayload>(UserType.SET_ERROR);
export const resetUser = makeActionCreator<UserPayload>(UserType.RESET_USER);
