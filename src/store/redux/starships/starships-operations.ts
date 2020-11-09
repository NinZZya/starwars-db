import { Dispatch } from 'redux';
import { setStarships, setStarshipsStatus } from './starships-actions';
import { DataStatus } from '../../../constants/constants';
import { Starships, Api } from '../../../constants/types';


export const loadStarshipsAsync = () => (dispatch: Dispatch, getState: () => void, api: Api) => {
  return api.getStarships()
    .then((items: Starships) => {
      dispatch(setStarshipsStatus(DataStatus.SUCCESS));
      dispatch(setStarships(items));
    })
    .catch(() => {
      dispatch(setStarshipsStatus(DataStatus.ERROR));
    });
};
