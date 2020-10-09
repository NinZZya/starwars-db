import NameSpace from '../name-space';
import { IState, TId } from '../../types';


const PERSONS_SPACE = NameSpace.PERSONS;


export const getPersonsStatus = (state: IState) => state[PERSONS_SPACE].status;
export const getPersons = (state: IState) => Object.values(state[PERSONS_SPACE].items);
export const getPerson = (state: IState, id: TId) => state[PERSONS_SPACE].items[id];
