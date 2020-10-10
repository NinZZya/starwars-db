import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { LoadingStatus, SortType, UserStatus } from './const';
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

export type TSwapiServices = typeof SwapiService;

export interface IPlanet {
  [key: string]: string | number;
  id: TId;
  name: string;
  population: string;
  rotationPeriod: number;
  orbitalPeriod: number;
  diameter: number;
  climate: string;
  gravity: string;
  surfaceWater: number;
  terrain: string;
  image: string;
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
}

export interface IStarships {
  [key: string]: IStarship,
}

export type TUserPayload = UserStatus | IUser | string | null;
export type TPersonsPayload = LoadingStatus | IPersons | string;
export type TPlanetsPayload = LoadingStatus | IPlanets | string;
export type TStarshipsPayload = LoadingStatus | IStarships | string;

export type TPayload = TUserPayload | TPersonsPayload | TPlanetsPayload | TStarshipsPayload ;


export interface IUserState {
  status: UserStatus;
  user: IUser;
  error: string;
};
export interface IPersonsState {
  status: LoadingStatus;
  items: IPersons;
  sortType: string;
  sortField: string;
};

export interface IPlanetsState {
  status: LoadingStatus;
  items: IPlanets;
  sortType: string;
  sortField: string;
};

export interface IStarshipsState {
  status: LoadingStatus;
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
