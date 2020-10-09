export enum LoadingStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'SUCSESS',
};

export enum AppPath {
  ROOT = '/',
  PERSONS = '/persons/',
  PLANETS = '/planets/',
  STARSHIPS = '/starships/',
  NOT_FOUND = '/not-found/',
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
