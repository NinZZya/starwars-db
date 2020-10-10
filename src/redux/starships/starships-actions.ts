import StarshipsType from './starships-types';
import { makeActionCreator } from '../../utils/utils';


export const setStarshipsStatus = makeActionCreator(StarshipsType.SET_STARSHIPS_STATUS);
export const setStarships = makeActionCreator(StarshipsType.SET_STARSHIPS);
export const setStarshipsSortType = makeActionCreator(StarshipsType.SET_STARSHIPS_SORT_TYPE);
export const setStarshipsSortField = makeActionCreator(StarshipsType.SET_STARSHIPS_SORT_FIELD);
