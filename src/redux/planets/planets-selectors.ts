import NameSpace from '../name-space';
import { IState, TId } from '../../types';


const PLANETS_SPACE = NameSpace.PLANETS;


export const getPlanetsStatus = (state: IState) => state[PLANETS_SPACE].status;
export const getPlanets = (state: IState) => state[PLANETS_SPACE].items;
export const getPlanet = (state: IState, id: TId) => state[PLANETS_SPACE].items[id];
