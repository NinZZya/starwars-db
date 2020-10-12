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
}

export enum IdName {
  PERSON = 'idPerson',
  PLANET = 'idPlanet',
  STARSHIP = 'idStarship',
}

export const menuItems = [
  { name: 'People', path: AppPath.PERSONS },
  { name: 'Planets', path: AppPath.PLANETS },
  { name: 'Starships', path: AppPath.STARSHIPS },
];

export const SortType: { [key: string]: string } = {
  UP: '▲',
  DOWN: '▼',
}

export const MAX_RATE = 5;

export const PersonSortFields: { [key: string]: string } = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  rate: 'Rate',
};

export const PlanetsSortFields: { [key: string]: string } = {
  name: 'Name',
  population: 'Population',
  rotationPeriod: 'Rotation Period',
  orbitalPeriod: 'Orbital Period',
  diameter: 'Diameter',
  surfaceWater: 'Surface Water',
  rate: 'Rate',
};

export const StarshipsSortFields: { [key: string]: string } = {
  name: 'Name',
  model: 'Model',
  manufacturer: 'Manufacturer',
  costInCredits: 'Cost In Credits',
  length: 'Length',
  crew: 'Crew',
  passengers: 'Passengers',
  cargoCapacity: 'Cargo Capacity',
  rate: 'Rate',
};
