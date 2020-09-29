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
  population: number;
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


export default class SwapiService {
  _baseUrl = 'https://swapi.dev/api';
  _personsUrl = '/people/';
  _planetsUrl = '/planets/';
  _starshipsUrl = '/starships/';

  async getResource(url: string) {
    const endPoint = `${this._baseUrl}${url}`;
    const res = await fetch(endPoint);

    if (!res.ok) {
      throw new Error(`Could not fetch: ${endPoint}, received ${res.status}`);
    }

    return await res.json();
  }

  async getAllPersons() {
    const responce = await this.getResource(this._personsUrl);
    return responce.results.map(this._adaptPerson);
  }

  async getPerson(id: string) {
    const responce = await this.getResource(`${this._personsUrl}${id}`);
    return this._adaptPerson(responce);
  }

  async getAllPlanets() {
    const responce = await this.getResource(this._planetsUrl);
    return responce.results.map(this._adaptPlanet);
  }

  async getPlanet(id: string) {
    const responce = await this.getResource(`${this._planetsUrl}${id}`);
    return this._adaptPlanet(responce);
  }

  async getAllStarships() {
    const responce = await this.getResource(this._starshipsUrl);
    return responce.results.map(this._adaptStarship);
  }

  async getStarship(id: string) {
    const responce = await this.getResource(`${this._starshipsUrl}${id}`);
    return this._adaptStarship(responce);
  }


  _extractId(item: IRPerson | IRPlanet | IRStarship) {
    const idRegExp = /\/([0-9]*)\/$/;
    const id = item.url.match(idRegExp);
    return id ? id[1] : '';
  }

  _adaptPerson(person: IRPerson) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  }

  _adaptPlanet(planet: IRPlanet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: Number(planet.population),
      rotationPeriod: Number(planet.rotation_period),
      diameter: Number(planet.diameter),
    };
  }

  _adaptStarship(starship: IRStarship) {
    return {
      id: this._extractId(starship),
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


