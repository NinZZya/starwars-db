import users from '../mocks/users';
import comments from '../mocks/comments';
import {
  IPersons, IPlanets, IStarships, TId, IAuthData
} from '../types';

interface IRPerson {
  url: string;
  name: string;
  gender: string;
  birth_year: string;
  height: number;
  mass: number;
}

interface IRPlanet {
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

interface IRStarship {
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

const extractId = (item: IRPerson | IRPlanet | IRStarship) => {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = item.url.match(idRegExp);
  return id ? id[1] : '';
}

export default class SwapiService {
  static async auth(authData: IAuthData) {
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
    const responce = await this.getResource(Url.PERSONS);
    const persons = responce.results.reduce((map: IPersons, person: IRPerson) => {
      const adaptPerson = SwapiService.adaptPerson(person);
      map[adaptPerson.id] = adaptPerson;
      return map;
    }, {});

    return persons;
  }

  static async getPerson(id: TId) {
    const responce = await this.getResource(`${Url.PERSONS}${id}`);
    return SwapiService.adaptPerson(responce);
  }

  static async getPersonComments(id: TId) {
    await delay(DELAY_MS);
    const presonComments = comments.persons[id];
    return presonComments ? presonComments: [];
  }

  static async getPlanets() {
    const responce = await this.getResource(Url.PLANETS);
    const planets = responce.results.reduce((map: IPlanets, planet: IRPlanet) => {
      const adaptPlanet = SwapiService.adaptPlanet(planet);
      map[adaptPlanet.id] = adaptPlanet;
      return map;
    }, {});
    return planets;
  }

  static async getPlanet(id: TId) {
    const responce = await this.getResource(`${Url.PLANETS}${id}`);
    return SwapiService.adaptPlanet(responce);
  }

  static async getStarships() {
    const responce = await this.getResource(Url.STARSHIPS);
    const starships = responce.results.reduce((map: IStarships, starship: IRStarship) => {
      const adaptStarship = SwapiService.adaptStarship(starship);
      map[adaptStarship.id] = adaptStarship;
      return map;
    }, {});

    return starships;
  }

  static async getStarship(id: TId) {
    const responce = await this.getResource(`${Url.STARSHIPS}${id}`);
    return SwapiService.adaptStarship(responce);
  }

  static adaptPerson(person: IRPerson) {
    const id = extractId(person);
    const height = Number(person.height);
    const mass = Number(person.mass);
    const rate = comments.persons[id] ?
      comments.persons[id].reduce((rate, review) => rate = rate + review.rate, 0) / comments.persons[id].length :
      0;

    return {
      id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      height: isNaN(height) ? -1 : height,
      mass: isNaN(mass) ? -1 : mass,
      image: `${Url.IMG}${Url.PERSONS_IMG}${Number(id)}.jpg`,
      rate,
    }
  }

  static adaptPlanet(planet: IRPlanet) {
    const id = extractId(planet);
    const population = Number(planet.population);
    const rotationPeriod = Number(planet.rotation_period);
    const orbitalPeriod = Number(planet.orbital_period);
    const diameter = Number(planet.diameter);
    const surfaceWater = Number(planet.surface_water);
    const rate = comments.planets[id] ?
      comments.planets[id].reduce((rate, review) => rate = rate + review.rate, 0) / comments.planets[id].length :
      0;

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
      rate,
    };
  }

  static adaptStarship(starship: IRStarship) {
    const id = extractId(starship);
    const costInCredits = Number(starship.cost_in_credits);
    const length = Number(starship.length);
    const crew = Number(starship.crew);
    const passengers = Number(starship.passengers);
    const cargoCapacity = Number(starship.cargo_capacity);
    const rate = comments.starships[id] ?
      comments.starships[id].reduce((rate, review) => rate = rate + review.rate, 0) / comments.starships[id].length :
      0;

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
      rate,
    }
  }
}
