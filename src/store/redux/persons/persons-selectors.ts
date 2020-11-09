import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../../utils/utils';
import { State, Id, Person } from '../../../constants/types';
import { SortType } from '../../../constants/constants';


const PERSONS_SPACE = NameSpace.PERSONS;

export const getPersonsStatus = (state: State) => state[PERSONS_SPACE].status;
export const getPersons = (state: State): Person[] => Object.values(state[PERSONS_SPACE].items);
export const getPerson = (state: State, id: Id) => state[PERSONS_SPACE].items[id];
export const getPersonsSortType = (state: State) => state[PERSONS_SPACE].sortType;
export const getPersonsSortField = (state: State) => state[PERSONS_SPACE].sortField;

export const getSordedPersons = createSelector(
  getPersons,
  getPersonsSortType,
  getPersonsSortField,
  (persons, sortType, sortField) => {
    if (!persons.length) {
      return [];
    }

    if (sortType === SortType.UP) {
      return persons.sort((a, b) => sortingUp<string | number>(a[sortField], b[sortField]));
    }

    return persons.sort((a, b) => sortingDown<string | number>(a[sortField], b[sortField]));
  }
);
