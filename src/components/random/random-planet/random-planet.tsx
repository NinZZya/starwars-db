import React, { PureComponent } from 'react';
import Spiner from '../../spiner';
import PlanetCard from './components/planet-card';
import SwapiService from '../../../services/swapi-service';
import { IPlanet } from '../../../types';

interface S {
  planet: IPlanet;
  loading: boolean;
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
      },
      loading: true,
    };

    this.updatePlanet();
  }

  onPlanetLoaded = (planet: IPlanet) => {
    this.setState({
      planet,
      loading: false,
    });
  };

  updatePlanet() {
    const id = '12';
    swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {
    const { planet, loading } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {loading ?
        <Spiner /> :
        <PlanetCard planet={planet} />}
      </div>

    );
  }

}

export default RandomPlanet;
