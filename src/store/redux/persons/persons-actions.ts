import PersonsType from './persons-types';
import { makeActionCreator } from '../../../utils/utils';
import { PersonsPayload } from '../../../constants/types';

export const setPersonsStatus = makeActionCreator<PersonsPayload>(PersonsType.SET_PERSONS_STATUS);
export const setPersons = makeActionCreator<PersonsPayload>(PersonsType.SET_PERSONS);
export const setPersonsSortType = makeActionCreator<PersonsPayload>(PersonsType.SET_PERSONS_SORT_TYPE);
export const setPersonsSortField = makeActionCreator<PersonsPayload>(PersonsType.SET_PERSONS_SORT_FIELD);
