import PlanetsType from './planets-types';
import { makeActionCreator } from '../../utils/utils';


export const setPlanetsStatus = makeActionCreator(PlanetsType.SET_PLANETS_STATUS);
export const setPlanets = makeActionCreator(PlanetsType.SET_PLANETS);

