import PlanetsType from './planets-types';
import { LoadingStatus } from '../../const';
import { TPlanetsPayload } from '../../types';


interface IAction {
  type: PlanetsType;
  payload: TPlanetsPayload;
};

const initialState = {
  status: LoadingStatus.LOADING,
  items: {},
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
    default:
      return state;
  };
};
