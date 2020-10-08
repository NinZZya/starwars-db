import StarshipsType from './starships-types';
import { LoadingStatus } from '../../const';
import { TPlanetsPayload } from '../../types';


interface IAction {
  type: StarshipsType;
  payload: TPlanetsPayload;
};

const initialState = {
  status: LoadingStatus.LOADING,
  items: {},
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
    default:
      return state;
  };
};
