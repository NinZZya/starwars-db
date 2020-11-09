import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DataStatus, UserStatus } from './constants';
import NameSpace from '../store/redux/name-space';
import SwapiService from '../services/swapi-service';


export type Id = string;

export type ItemDetail = {
  [key: string]: string | number | Record<string, string | number>;
};

export interface Item {
  image: string;
  name: string;
}

export interface Text {
  text: string,
}

export interface AuthData {
  login: string;
  password: string;
}

export interface User {
  [key: string]: string | number;
  id: Id;
  login: string;
  avatar: string;
}

export type Api = typeof SwapiService;

export interface Planet {
  [key: string]: string | number;
  id: Id;
  name: string;
  population: number;
  rotationPeriod: number;
  orbitalPeriod: number;
  diameter: number;
  climate: string;
  gravity: string;
  surfaceWater: number;
  terrain: string;
  image: string;
};

export interface Planets {
  [key: string]: Planet;
}

export interface Person {
  [key: string]: string | number;
  id: Id;
  name: string;
  gender: string;
  birthYear: string;
  height: number;
  mass: number;
  image: string;
}

export interface Persons {
  [key: string]: Person;
}

export interface Starship {
  [key: string]: string | number;
  id: Id;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  crew: number;
  passengers: number;
  cargoCapacity: number;
  image: string;
}

export interface Starships {
  [key: string]: Starship,
}

export type UserPayload = UserStatus | User | string | null;
export type PersonsPayload = DataStatus | Persons | string;
export type PlanetsPayload = DataStatus | Planets | string;
export type StarshipsPayload = DataStatus | Starships | string;

export type Payload = UserPayload | PersonsPayload | PlanetsPayload | StarshipsPayload;


export interface UserState {
  status: UserStatus;
  user: User;
  error: string;
};
export interface PersonsState {
  status: DataStatus;
  items: Persons;
  sortType: string;
  sortField: string;
};

export interface PlanetsState {
  status: DataStatus;
  items: Planets;
  sortType: string;
  sortField: string;
};

export interface StarshipsState {
  status: DataStatus;
  items: Starships;
  sortType: string;
  sortField: string;
};

export interface State {
  [NameSpace.PERSONS]: PersonsState;
  [NameSpace.PLANETS]: PlanetsState;
  [NameSpace.STARSHIPS]: StarshipsState;
  [NameSpace.USER]: UserState;
};

export type DispatchAsync = ThunkDispatch<State, Api, Action>;
