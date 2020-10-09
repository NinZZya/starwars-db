import UserType from './user-types';
import { makeActionCreator } from '../../utils/utils';


export const setUserStatus = makeActionCreator(UserType.SET_USER_STATUS);
export const setUser = makeActionCreator(UserType.SET_USER);
export const setError = makeActionCreator(UserType.SET_ERROR);
export const resetUSer = makeActionCreator(UserType.RESET_USER);
