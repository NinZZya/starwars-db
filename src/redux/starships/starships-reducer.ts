import StarshipsType from './starships-types';
import { DataStatus, SortType, StarshipsSortFields } from '../../const';
import { TPlanetsPayload } from '../../types';


const DEFAULT_FIELD = Object.keys(StarshipsSortFields)[0];

interface IAction {
  type: StarshipsType;
  payload: TPlanetsPayload;
};

const initialState = {
  status: DataStatus.LOADING,
  items: {},
  sortType: SortType.UP,
  sortField: DEFAULT_FIELD,
};


export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case StarshipsType.SET_STARSHIPS_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case StarshipsType.SET_STARSHIPS:
      return {
        ...state,
        items: action.payload,
      };
    case StarshipsType.SET_STARSHIPS_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case StarshipsType.SET_STARSHIPS_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };
    default:
      return state;
  };
};
