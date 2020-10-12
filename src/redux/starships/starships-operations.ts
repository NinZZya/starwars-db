import { Dispatch } from 'redux';
import { setStarships, setStarshipsStatus } from './starships-actions';
import { IStarships, TSwapiServices } from '../../types';
import { LoadingStatus } from '../../const';



export const loadStarshipsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {
  return api.getStarships()
    .then((items: IStarships) => {
      dispatch(setStarshipsStatus(LoadingStatus.SUCCESS));
      dispatch(setStarships(items));
    })
    .catch(() => {
      dispatch(setStarshipsStatus(LoadingStatus.ERROR));
    });
};
