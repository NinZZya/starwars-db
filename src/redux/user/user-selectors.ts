import NameSpace from '../name-space';
import { IState } from '../../types';


const USER_SPACE = NameSpace.USER;


export const getUserStatus = (state: IState) => state[USER_SPACE].status;
export const getUser= (state: IState) => state[USER_SPACE].user;
export const getError= (state: IState) => state[USER_SPACE].error;
