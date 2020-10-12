import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import { sortingUp, sortingDown } from '../../utils/utils';
import { IState, TId, IPerson } from '../../types';
import { SortType } from '../../const';


const PERSONS_SPACE = NameSpace.PERSONS;

export const getPersonsStatus = (state: IState) => state[PERSONS_SPACE].status;
export const getPersons = (state: IState): IPerson[] => Object.values(state[PERSONS_SPACE].items);
export const getPerson = (state: IState, id: TId) => state[PERSONS_SPACE].items[id];
export const getPersonsSortType = (state: IState) => state[PERSONS_SPACE].sortType;
export const getPersonsSortField = (state: IState) => state[PERSONS_SPACE].sortField;
export const getPersonCommentsStatus = (state: IState) => state[PERSONS_SPACE].commentsStatus;
export const getPersonComments = (state: IState) => state[PERSONS_SPACE].comments;

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
