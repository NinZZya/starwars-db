import { Dispatch } from 'redux';
import { setError, setUser, setUserStatus } from './user-actions';
import { AuthData, User, Api } from '../../../constants/types';
import { UserStatus } from '../../../constants/constants';


export const loginAsync = (authData: AuthData) => (dispatch: Dispatch, getState: () => void, api: Api) => {
  return api.auth(authData)
    .then((user: User) => {
      dispatch(setUserStatus(UserStatus.AUTH));
      dispatch(setUser(user));
    })
    .catch((error) => {
      dispatch(setUserStatus(UserStatus.AUTH_ERROR));
      dispatch(setError(error.message));
    });
};
