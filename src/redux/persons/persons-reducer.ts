import PersonsType from './persons-types';
import { TPersonsPayload } from '../../types';
import { LoadingStatus, SortType, PersonFields } from '../../const';


const DEFAULT_FIELD = Object.keys(PersonFields)[0];

interface IAction {
  type: PersonsType;
  payload?: TPersonsPayload;
};

const initialState = {
  status: LoadingStatus.LOADING,
  items: {},
  sortType: SortType.UP,
  sortField: DEFAULT_FIELD,
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
    case PersonsType.SET_PERSONS_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case PersonsType.SET_PERSONS_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };
    default:
      return state;
  };
};
