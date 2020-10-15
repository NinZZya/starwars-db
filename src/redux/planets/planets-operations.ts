import { Dispatch } from 'redux';
import { setPlanets, setPlanetsStatus } from './planets-actions';
import { IPlanets, TSwapiServices } from '../../types';
import { DataStatus } from '../../const';



export const loadPlanetsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {

  return api.getPlanets()
    .then((items: IPlanets) => {
      dispatch(setPlanetsStatus(DataStatus.SUCCESS));
      dispatch(setPlanets(items));
    })
    .catch(() => {
      dispatch(setPlanetsStatus(DataStatus.ERROR));
    });
};
