import users from '../mocks/users';
import {
  Persons, Planets, Starships, Id, AuthData
} from '../constants/types';

interface PersonResponse {
  url: string;
  name: string;
  gender: string;
  birth_year: string;
  height: number;
  mass: number;
}

interface PlanetResponse {
  url: string;
  name: string;
  population: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  surface_water: number;
  terrain: string;
}

interface StarshipResponse {
  url: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
}

type ItemResponse = PersonResponse | PlanetResponse | StarshipResponse;

enum Url {
  BASE = 'https://swapi.dev/api/',
  PERSONS = 'people/',
  PLANETS = 'planets/',
  STARSHIPS = 'starships/',
  IMG = 'https://starwars-visualguide.com/assets/img/',
  PERSONS_IMG = 'characters/',
  PLANETS_IMG = 'planets/',
}


const DELAY_MS = 500;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const extractId = (item: ItemResponse) => {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = item.url.match(idRegExp);
  return id ? id[1] : '';
}

const calcRate = <T extends {rate: number}>(items: T[]) => {
  if (items.length) {
    return items.reduce(
      (rate, item) => rate = rate + item.rate,
      0) / items.length;
  }

  return 0;
}

export default class SwapiService {
  static async auth(authData: AuthData) {
    const { login, password } = authData;

    await delay(DELAY_MS)
    const user = users.find((item) => item.login.toLowerCase() === login.toLowerCase());

    if (!user) {
      throw new Error(`User not found`);
    }

    if (user && user.password === password) {
      return {
        id: user.id,
        login: user.login,
        avatar: '',
      };
    }

    throw new Error(`Bad authorization. Try again.`);
  }

  static async getResource(url: string) {
    const endPoint = `${Url.BASE}${url}`;
    const res = await fetch(endPoint);

    if (!res.ok) {
      throw new Error(`Could not fetch: ${endPoint}, received ${res.status}`);
    }

    return await res.json();
  }

  static async getPersons() {
    const response = await this.getResource(Url.PERSONS);
    const persons = response.results.reduce((map: Persons, person: PersonResponse) => {
      const adaptPerson = SwapiService.adaptPerson(person);
      map[adaptPerson.id] = adaptPerson;
      return map;
    }, {});

    return persons;
  }

  static async getPerson(id: Id) {
    const response = await this.getResource(`${Url.PERSONS}${id}`);
    return SwapiService.adaptPerson(response);
  }

  static async getPlanets() {
    const response = await this.getResource(Url.PLANETS);
    const planets = response.results.reduce((map: Planets, planet: PlanetResponse) => {
      const adaptPlanet = SwapiService.adaptPlanet(planet);
      map[adaptPlanet.id] = adaptPlanet;
      return map;
    }, {});
    return planets;
  }

  static async getPlanet(id: Id) {
    const response = await this.getResource(`${Url.PLANETS}${id}`);
    return SwapiService.adaptPlanet(response);
  }

  static async getStarships() {
    const response = await this.getResource(Url.STARSHIPS);
    const starships = response.results.reduce((map: Starships, starship: StarshipResponse) => {
      const adaptStarship = SwapiService.adaptStarship(starship);
      map[adaptStarship.id] = adaptStarship;
      return map;
    }, {});

    return starships;
  }

  static async getStarship(id: Id) {
    const response = await this.getResource(`${Url.STARSHIPS}${id}`);
    return SwapiService.adaptStarship(response);
  }

  static adaptPerson(person: PersonResponse) {
    const id = extractId(person);
    const height = Number(person.height);
    const mass = Number(person.mass);

    return {
      id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      height: isNaN(height) ? -1 : height,
      mass: isNaN(mass) ? -1 : mass,
      image: `${Url.IMG}${Url.PERSONS_IMG}${Number(id)}.jpg`,
    }
  }

  static adaptPlanet(planet: PlanetResponse) {
    const id = extractId(planet);
    const population = Number(planet.population);
    const rotationPeriod = Number(planet.rotation_period);
    const orbitalPeriod = Number(planet.orbital_period);
    const diameter = Number(planet.diameter);
    const surfaceWater = Number(planet.surface_water);

    return {
      id,
      name: planet.name,
      population: isNaN(population) ? -1 : population,
      rotationPeriod: isNaN(rotationPeriod) ? -1 : rotationPeriod,
      orbitalPeriod: isNaN(orbitalPeriod) ? -1 : orbitalPeriod,
      diameter: isNaN(diameter) ? -1 : diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      surfaceWater: isNaN(surfaceWater) ? -1 : surfaceWater,
      terrain: planet.terrain,
      image: `${Url.IMG}${Url.PLANETS_IMG}${Number(id) + 1}.jpg`,
    };
  }

  static adaptStarship(starship: StarshipResponse) {
    const id = extractId(starship);
    const costInCredits = Number(starship.cost_in_credits);
    const length = Number(starship.length);
    const crew = Number(starship.crew);
    const passengers = Number(starship.passengers);
    const cargoCapacity = Number(starship.cargo_capacity);

    return {
      id,
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: isNaN(costInCredits) ? -1 : costInCredits,
      length: isNaN(length) ? -1 : length,
      crew: isNaN(crew) ? -1 : crew,
      passengers: isNaN(passengers) ? -1 : passengers,
      cargoCapacity: isNaN(cargoCapacity) ? -1 : cargoCapacity,
      image: '',
    }
  }
}
