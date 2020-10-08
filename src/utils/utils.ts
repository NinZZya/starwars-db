import { TPayload } from '../types';

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const makeActionCreator = (type: string) => (payload: TPayload) => ({
  type,
  payload,
});
