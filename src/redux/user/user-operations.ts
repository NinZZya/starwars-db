import { Dispatch } from 'redux';
import { setError, setUser, setUserStatus } from './user-actions';
import { TSwapiServices, IAuthData, IUser } from '../../types';
import { UserStatus } from '../../const';


export const loginAsync = (authData: IAuthData) => (dispatch: Dispatch, getUser: () => void, api: TSwapiServices) => {
  return api.auth(authData)
    .then((user: IUser) => {
      dispatch(setUserStatus(UserStatus.AUTH));
      dispatch(setUser(user));
    })
    .catch((error) => {
      dispatch(setUserStatus(UserStatus.AUTH_ERROR));
      dispatch(setError(error.message));
    });
};
