import { Dispatch } from 'redux';
import { setStarships, setStarshipsStatus } from './starships-actions';
import { IStarships, TSwapiServices } from '../../types';
import { DataStatus } from '../../const';



export const loadStarshipsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {
  return api.getStarships()
    .then((items: IStarships) => {
      dispatch(setStarshipsStatus(DataStatus.SUCCESS));
      dispatch(setStarships(items));
    })
    .catch(() => {
      dispatch(setStarshipsStatus(DataStatus.ERROR));
    });
};
