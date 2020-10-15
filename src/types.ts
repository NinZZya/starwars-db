import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DataStatus, UserStatus } from './const';
import NameSpace from './redux/name-space';
import SwapiService from './services/swapi-service';


export type TId = string;

export interface IItem {
  image: string;
  name: string;
}

export interface IText {
  text: string,
}

export interface IAuthData {
  login: string;
  password: string;
}

export interface IUser {
  id: TId;
  login: string;
  avatar: string;
}

export interface IComment {
  id: string,
  rate: number;
  user: IUser;
  review: string;
}

export interface IComments {
  [key: string]: IComment[];
}

export type TSwapiServices = typeof SwapiService;

export interface IPlanet {
  [key: string]: string | number;
  id: TId;
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
  rate: number;
};

export interface IPlanets {
  [key: string]: IPlanet;
}

export interface IPerson {
  [key: string]: string | number;
  id: TId;
  name: string;
  gender: string;
  birthYear: string;
  height: number;
  mass: number;
  image: string;
  rate: number;
}

export interface IPersons {
  [key: string]: IPerson;
}

export interface IStarship {
  [key: string]: string | number;
  id: TId;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  crew: number;
  passengers: number;
  cargoCapacity: number;
  image: string;
  rate: number;
}

export interface IStarships {
  [key: string]: IStarship,
}

export type TUserPayload = UserStatus | IUser | string | null;
export type TPersonsPayload = DataStatus | IPersons | string | IComment[];
export type TPlanetsPayload = DataStatus | IPlanets | string | IComment[];
export type TStarshipsPayload = DataStatus | IStarships | string | IComment[];

export type TPayload = TUserPayload | TPersonsPayload | TPlanetsPayload | TStarshipsPayload ;


export interface IUserState {
  status: UserStatus;
  user: IUser;
  error: string;
};
export interface IPersonsState {
  status: DataStatus;
  items: IPersons;
  sortType: string;
  sortField: string;
  commentsStatus: DataStatus | null;
  comments: IComment[];
};

export interface IPlanetsState {
  status: DataStatus;
  items: IPlanets;
  sortType: string;
  sortField: string;
};

export interface IStarshipsState {
  status: DataStatus;
  items: IStarships;
  sortType: string;
  sortField: string;
};

export interface IState {
  [NameSpace.PERSONS]: IPersonsState;
  [NameSpace.PLANETS]: IPlanetsState;
  [NameSpace.STARSHIPS]: IStarshipsState;
  [NameSpace.USER]: IUserState;
};

export type TDispatch = ThunkDispatch<IState, TSwapiServices, Action>;

export type TGetPerson = (id: TId) => IPerson;
export type TGetPlanet = (id: TId) => IPlanet;
export type TGetStarship = (id: TId) => IStarship;
