import { Dispatch } from 'redux';
import { setPlanets, setPlanetsStatus } from './planets-actions';
import { Planets, Api } from '../../../constants/types';
import { DataStatus } from '../../../constants/constants';



export const loadPlanetsAsync = () => (dispatch: Dispatch, getState: () => void, api: Api) => {

  return api.getPlanets()
    .then((items: Planets) => {
      dispatch(setPlanets(items));
      dispatch(setPlanetsStatus(DataStatus.SUCCESS));
    })
    .catch(() => {
      dispatch(setPlanetsStatus(DataStatus.ERROR));
    });
};
