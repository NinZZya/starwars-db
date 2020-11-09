import NameSpace from '../name-space';
import { State } from '../../../constants/types';


const USER_SPACE = NameSpace.USER;


export const getUserStatus = (state: State) => state[USER_SPACE].status;
export const getUser= (state: State) => state[USER_SPACE].user;
export const getError= (state: State) => state[USER_SPACE].error;
