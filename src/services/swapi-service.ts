
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
    return responce.results;
  }

  async getPerson(id: string) {
    const responce = await this.getResource(`${this._personsUrl}${id}`);
    return responce;
  }

  async getAllPlanets() {
    const responce = await this.getResource(this._planetsUrl);
    return responce.results;
  }

  async getPlanet(id: string) {
    const responce = await this.getResource(`${this._planetsUrl}${id}`);
    return responce;
  }

  async getAllStarships() {
    const responce = await this.getResource(this._starshipsUrl);
    return responce.results;
  }

  async getStarship(id: string) {
    const responce = await this.getResource(`${this._starshipsUrl}${id}`);
    return responce;
  }
}


