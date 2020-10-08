import StarshipsType from './starships-types';
import { makeActionCreator } from '../../utils/utils';


export const setStarshipsStatus = makeActionCreator(StarshipsType.SET_STARSHIPS_STATUS);
export const setStarships = makeActionCreator(StarshipsType.SET_STARSHIPS);
