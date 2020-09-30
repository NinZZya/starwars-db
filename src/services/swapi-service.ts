import { TId } from "types";

interface IRPerson {
  url: string;
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
}

interface IRPlanet {
  url: string;
  name: string;
  population: string;
  rotation_period: number;
  diameter: number;
}

interface IRStarship {
  url: string;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  crew: number;
  passengers: number;
  cargoCapacity: number;
}

enum Url {
  BASE = 'https://swapi.dev/api',
  PERSONS = '/people/',
  PLANETS = '/planets/',
  STARSHIPS = '/starships/',
}

const extractId = (item: IRPerson | IRPlanet | IRStarship) => {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = item.url.match(idRegExp);
  return id ? id[1] : '';
}

export default class SwapiService {
  static async getResource(url: string) {
    const endPoint = `${Url.BASE}${url}`;
    const res = await fetch(endPoint);

    if (!res.ok) {
      throw new Error(`Could not fetch: ${endPoint}, received ${res.status}`);
    }

    return await res.json();
  }

  static async getAllPersons() {
    const responce = await this.getResource(Url.PERSONS);
    return responce.results.map(SwapiService.adaptPerson);
  }

  static async getPerson(id: TId) {
    const responce = await this.getResource(`${Url.PERSONS}${id}`);
    return SwapiService.adaptPerson(responce);
  }

  static async getAllPlanets() {
    const responce = await this.getResource(Url.PLANETS);
    return responce.results.map(SwapiService.adaptPlanet);
  }

  static async getPlanet(id: TId) {
    const responce = await this.getResource(`${Url.PLANETS}${id}`);
    return SwapiService.adaptPlanet(responce);
  }

  static async getAllStarships() {
    const responce = await this.getResource(Url.STARSHIPS);
    return responce.results.map(SwapiService.adaptStarship);
  }

  static async getStarship(id: TId) {
    const responce = await this.getResource(`${Url.STARSHIPS}${id}`);
    return SwapiService.adaptStarship(responce);
  }

  static adaptPerson(person: IRPerson) {
    return {
      id: extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  }

  static adaptPlanet(planet: IRPlanet) {
    return {
      id: extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: Number(planet.rotation_period),
      diameter: Number(planet.diameter),
    };
  }

  static adaptStarship(starship: IRStarship) {
    return {
      id: extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: Number(starship.costInCredits),
      length: Number(starship.length),
      crew: Number(starship.crew),
      passengers: Number(starship.passengers),
      cargoCapacity: Number(starship.cargoCapacity),
    }
  }
}


