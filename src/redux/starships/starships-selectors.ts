import NameSpace from '../name-space';
import { IState, TId } from '../../types';


const STARSHIPS_SPACE = NameSpace.STARSHIPS;


export const getStarshipsStatus = (state: IState) => state[STARSHIPS_SPACE].status;
export const getStarships = (state: IState) => Object.values(state[STARSHIPS_SPACE].items);
export const getStarship = (state: IState, id: TId) => state[STARSHIPS_SPACE].items[id];
