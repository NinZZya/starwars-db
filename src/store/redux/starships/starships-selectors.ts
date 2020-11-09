import { createSelector } from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../../utils/utils';
import { State, Id } from '../../../constants/types';
import { SortType } from '../../../constants/constants';


const STARSHIPS_SPACE = NameSpace.STARSHIPS;


export const getStarshipsStatus = (state: State) => state[STARSHIPS_SPACE].status;
export const getStarships = (state: State) => Object.values(state[STARSHIPS_SPACE].items);
export const getStarship = (state: State, id: Id) => state[STARSHIPS_SPACE].items[id];
export const getStarshipsSortType = (state: State) => state[STARSHIPS_SPACE].sortType;
export const getStarshipsSortField = (state: State) => state[STARSHIPS_SPACE].sortField;

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
