export enum LoadingStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'SUCSESS',
};

export enum UserStatus {
  NO_AUTH = 'NO_AUTH',
  AUTH = 'AUTH',
  AUTH_ERROR = 'AUTH_ERROR',
}

export enum AppPath {
  ROOT = '/',
  PERSONS = '/persons/',
  PLANETS = '/planets/',
  STARSHIPS = '/starships/',
  NOT_FOUND = '/not-found/',
  LOG_IN = '/log-in/',
  LOG_OUT = '/log-out/',
}

export enum IdName {
  PERSON = 'idPerson',
  PLANET = 'idPlanet',
  STARSHIP = 'idStarship',
}

export const menuItems = [
  {name: 'People', path: AppPath.PERSONS},
  {name: 'Planets', path: AppPath.PLANETS},
  {name: 'Starships', path: AppPath.STARSHIPS},
];
