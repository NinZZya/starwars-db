import PlanetsType from './planets-types';
import { DataStatus, SortType, PlanetsSortFields } from '../../../constants/constants';
import { PlanetsPayload } from '../../../constants/types';


const DEFAULT_FIELD = Object.keys(PlanetsSortFields)[0];

interface Action {
  type: PlanetsType;
  payload: PlanetsPayload;
};

const initialState = {
  status: DataStatus.LOADING,
  items: {},
  sortType: SortType.UP,
  sortField: DEFAULT_FIELD,
};


export default (state = initialState, action: Action) => {
  switch (action.type) {
    case PlanetsType.SET_PLANETS_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case PlanetsType.SET_PLANETS:
      return {
        ...state,
        items: action.payload,
      };
    case PlanetsType.SET_PLANETS_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case PlanetsType.SET_PLANETS_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload,
      };
    default:
      return state;
  };
};
