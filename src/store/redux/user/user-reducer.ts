import UserType from './user-types';
import { UserPayload } from '../../../constants/types';
import { UserStatus } from '../../../constants/constants';


interface Action {
  type: UserType;
  payload?: UserPayload;
};

const initialState = {
  status: UserStatus.NO_AUTH,
  user: null,
  error: '',
};


export default (state = initialState, action: Action) => {
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

