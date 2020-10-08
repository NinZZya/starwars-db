import { Dispatch } from 'redux';
import { setPlanets, setPlanetsStatus } from './planets-actions';
import { IPlanets, TSwapiServices } from '../../types';
import { LoadingStatus } from '../../const';



export const loadPlanetsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {

  return api.getPlanets()
    .then((items: IPlanets) => {
      dispatch(setPlanets(items));
      dispatch(setPlanetsStatus(LoadingStatus.SUCCESS));
    })
    .catch(() => {
      dispatch(setPlanetsStatus(LoadingStatus.ERROR));
    });
};
