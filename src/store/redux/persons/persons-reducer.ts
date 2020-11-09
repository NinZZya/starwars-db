import PersonsType from './persons-types';
import { PersonsPayload } from '../../../constants/types';
import { DataStatus, SortType, PersonSortFields } from '../../../constants/constants';


const DEFAULT_FIELD = Object.keys(PersonSortFields)[0];

interface Action {
  type: PersonsType;
  payload?: PersonsPayload;
};

const initialState = {
  status: DataStatus.LOADING,
  items: {},
  sortType: SortType.UP,
  sortField: DEFAULT_FIELD,
};


export default (state = initialState, action: Action) => {
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
