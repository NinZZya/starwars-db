import NameSpace from '../name-space';
import { IState, TId } from '../../types';


const PERSONS_STATE = NameSpace.PERSONS;

export const getPersonsStatus = (state: IState) => state[PERSONS_STATE].status;
export const getPersons = (state: IState) => state[PERSONS_STATE].items;
export const getPerson = (state: IState, id: TId) => state[PERSONS_STATE].items[id];
