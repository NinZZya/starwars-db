import React, { PureComponent } from 'react';
import SwapiService from '../../../services/swapi-service';
import { IPlanet } from '../../../types';

interface S {
  planet: IPlanet;
}

const swapiService = new SwapiService();
class RandomPlanet extends PureComponent<{}, S>{

  constructor(props = {}) {
    super(props);

    this.state = {
      planet: {
        id: '',
        name: '',
        population: 0,
        rotationPeriod: 0,
        diameter: 0,
      }
    };

    this.updatePlanet();
  }

  onPlanetLoaded = (planet: IPlanet) => {
    this.setState({ planet });
  };

  updatePlanet() {
    const id = '12';
    swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {

    const {
      id,
      name,
      population,
      rotationPeriod,
      diameter,
    } = this.state.planet;

    if (!id) {
      return <div></div>
    }

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }

}

export default RandomPlanet;
