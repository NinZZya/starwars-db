import { LoadingStatus, UserStatus } from './const';
import NameSpace from './redux/name-space';
import SwapiService from './services/swapi-service';


export type TId = string;

export interface IItem {
  image: string;
  name: string;
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
export type TPersonsPayload = LoadingStatus | IPersons;
export type TPlanetsPayload = LoadingStatus | IPlanets;
export type TStarshipsPayload = LoadingStatus | IStarships ;

export type TPayload = TUserPayload| TPersonsPayload | TPlanetsPayload | TStarshipsPayload ;


export interface IUserState {
  status: UserStatus;
  user: IUser;
  error: string;
};
export interface IPersonsState {
  status: LoadingStatus;
  items: IPersons;
};

export interface IPlanetsState {
  status: LoadingStatus;
  items: IPlanets;
};

export interface IStarshipsState {
  status: LoadingStatus;
  items: IStarships;
};

export interface IState {
  [NameSpace.PERSONS]: IPersonsState;
  [NameSpace.PLANETS]: IPlanetsState;
  [NameSpace.STARSHIPS]: IStarshipsState;
  [NameSpace.USER]: IUserState;
};
