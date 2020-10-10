import PersonsType from './persons-types';
import { makeActionCreator } from '../../utils/utils';


export const setPersonsStatus = makeActionCreator(PersonsType.SET_PERSONS_STATUS);
export const setPersons = makeActionCreator(PersonsType.SET_PERSONS);
export const setPersonsSortType = makeActionCreator(PersonsType.SET_PERSONS_SORT_TYPE);
export const setPersonsSortField = makeActionCreator(PersonsType.SET_PERSONS_SORT_FIELD);
