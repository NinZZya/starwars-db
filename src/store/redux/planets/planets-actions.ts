import PlanetsType from './planets-types';
import { makeActionCreator } from '../../../utils/utils';
import { PlanetsPayload } from '../../../constants/types';

export const setPlanetsStatus = makeActionCreator<PlanetsPayload>(PlanetsType.SET_PLANETS_STATUS);
export const setPlanets = makeActionCreator<PlanetsPayload>(PlanetsType.SET_PLANETS);
export const setPlanetsSortType = makeActionCreator<PlanetsPayload>(PlanetsType.SET_PLANETS_SORT_TYPE);
export const setPlanetsSortField = makeActionCreator<PlanetsPayload>(PlanetsType.SET_PLANETS_SORT_FIELD);

