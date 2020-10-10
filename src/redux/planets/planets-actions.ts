import PlanetsType from './planets-types';
import { makeActionCreator } from '../../utils/utils';


export const setPlanetsStatus = makeActionCreator(PlanetsType.SET_PLANETS_STATUS);
export const setPlanets = makeActionCreator(PlanetsType.SET_PLANETS);
export const setPlanetsSortType = makeActionCreator(PlanetsType.SET_PLANETS_SORT_TYPE);
export const setPlanetsSortField = makeActionCreator(PlanetsType.SET_PLANETS_SORT_FIELD);

