import { Dispatch } from 'redux';
import { setError, setUser, setUserStatus } from './user-actions';
import { TSwapiServices, IAuthData, IUser } from '../../types';
import { UserStatus } from '../../const';


export const loginAsync = (authData: IAuthData) => (dispatch: Dispatch, getUser: () => void, api: TSwapiServices) => {
  return api.auth(authData)
    .then((user: IUser) => {
      dispatch(setUser(user));
      dispatch(setUserStatus(UserStatus.AUTH));
    })
    .catch((error) => {
      dispatch(setError(error.message));
      dispatch(setUserStatus(UserStatus.AUTH_ERROR));
    });
};
