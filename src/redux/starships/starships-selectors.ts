import { createSelector } from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../utils/utils';
import { IState, TId } from '../../types';
import { SortType } from '../../const';


const STARSHIPS_SPACE = NameSpace.STARSHIPS;


export const getStarshipsStatus = (state: IState) => state[STARSHIPS_SPACE].status;
export const getStarships = (state: IState) => Object.values(state[STARSHIPS_SPACE].items);
export const getStarship = (state: IState, id: TId) => state[STARSHIPS_SPACE].items[id];
export const getStarshipsSortType = (state: IState) => state[STARSHIPS_SPACE].sortType;
export const getStarshipsSortField = (state: IState) => state[STARSHIPS_SPACE].sortField;

export const getSortedStarships = createSelector(
  getStarships,
  getStarshipsSortType,
  getStarshipsSortField,
  (starships, sortType, sortField) => {
    if (!starships.length) {
      return [];
    }

    if (sortType === SortType.UP) {
      return starships.sort((a, b: any) => sortingUp<string | number>(a[sortField], b[sortField]));
    }

    return starships.sort((a, b) => sortingDown<string | number>(a[sortField], b[sortField]));
  }
);
