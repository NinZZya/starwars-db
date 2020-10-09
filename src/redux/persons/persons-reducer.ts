import PersonsType from './persons-types';
import { TPersonsPayload } from '../../types';
import { LoadingStatus } from '../../const';


interface IAction {
  type: PersonsType;
  payload?: TPersonsPayload;
};

const initialState = {
  status: LoadingStatus.LOADING,
  items: {},
};


export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case PersonsType.SET_PERSONS_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case PersonsType.SET_PERSONS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  };
};
