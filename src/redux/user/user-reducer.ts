import UserType from './user-types';
import { TUserPayload } from '../../types';
import { UserStatus } from '../../const';


interface IAction {
  type: UserType;
  payload?: TUserPayload;
};

const initialState = {
  status: UserStatus.NO_AUTH,
  user: null,
  error: '',
};


export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case UserType.SET_USER_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case UserType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UserType.RESET_USER:
      return initialState;
    default:
      return state;
  };
};

