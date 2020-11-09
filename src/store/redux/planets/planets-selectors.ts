import { createSelector } from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../../utils/utils';
import { State, Id } from '../../../constants/types';
import { SortType } from '../../../constants/constants';


const PLANETS_SPACE = NameSpace.PLANETS;


export const getPlanetsStatus = (state: State) => state[PLANETS_SPACE].status;
export const getPlanets = (state: State) => Object.values(state[PLANETS_SPACE].items);
export const getPlanet = (state: State, id: Id) => state[PLANETS_SPACE].items[id];
export const getPlanetsSortType = (state: State) => state[PLANETS_SPACE].sortType;
export const getPlanetsSortField = (state: State) => state[PLANETS_SPACE].sortField;

export const getSortedPlanets = createSelector(
  getPlanets,
  getPlanetsSortType,
  getPlanetsSortField,
  (planets, sortType, sortField) => {
    if (!planets.length) {
      return [];
    }

    if (sortType === SortType.UP) {
      return planets.sort((a, b) => sortingUp<string | number>(a[sortField], b[sortField]));
    }

    return planets.sort((a, b) => sortingDown<string | number>(a[sortField], b[sortField]));
  }
);
