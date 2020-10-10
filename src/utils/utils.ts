import { SortType } from '../const';
import { TPayload } from '../types';


export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const makeActionCreator = (type: string) => (payload?: TPayload) => ({
  type,
  payload,
});

export const sortingUp = <T>(a: T, b: T) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const sortingDown = <T>(a: T, b: T) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
};
