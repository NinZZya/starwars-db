import PlanetsType from './planets-types';
import { DataStatus, SortType, PlanetsSortFields } from '../../const';
import { TPlanetsPayload } from '../../types';


const DEFAULT_FIELD = Object.keys(PlanetsSortFields)[0];

interface IAction {
  type: PlanetsType;
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
