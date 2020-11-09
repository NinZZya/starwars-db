import StarshipsType from './starships-types';
import { makeActionCreator } from '../../../utils/utils';
import { StarshipsPayload } from '../../../constants/types';


export const setStarshipsStatus = makeActionCreator<StarshipsPayload>(StarshipsType.SET_STARSHIPS_STATUS);
export const setStarships = makeActionCreator<StarshipsPayload>(StarshipsType.SET_STARSHIPS);
export const setStarshipsSortType = makeActionCreator<StarshipsPayload>(StarshipsType.SET_STARSHIPS_SORT_TYPE);
export const setStarshipsSortField = makeActionCreator<StarshipsPayload>(StarshipsType.SET_STARSHIPS_SORT_FIELD);
