import PersonsType from './persons-types';
import { makeActionCreator } from '../../utils/utils';


export const setPersonsStatus = makeActionCreator(PersonsType.SET_PERSONS_STATUS);
export const setPersons = makeActionCreator(PersonsType.SET_PERSONS);
