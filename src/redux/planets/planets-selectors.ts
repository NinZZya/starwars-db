import { createSelector } from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../utils/utils';
import { IState, TId } from '../../types';
import { SortType } from '../../const';


const PLANETS_SPACE = NameSpace.PLANETS;


export const getPlanetsStatus = (state: IState) => state[PLANETS_SPACE].status;
export const getPlanets = (state: IState) => Object.values(state[PLANETS_SPACE].items);
export const getPlanet = (state: IState, id: TId) => state[PLANETS_SPACE].items[id];
export const getPlanetsSortType = (state: IState) => state[PLANETS_SPACE].sortType;
export const getPlanetsSortField = (state: IState) => state[PLANETS_SPACE].sortField;

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
