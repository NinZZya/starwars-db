import React, { PureComponent } from 'react';
import Spiner from '../../spiner';
import ErrorMessage from '../../error-message';
import PlanetCard from './components/planet-card';
import SwapiService from '../../../services/swapi-service';
import { getRandomInt } from '../../../utils/random';
import { IPlanet } from '../../../types';

const TIMEOUT = 5000;
class RandomPlanet extends PureComponent {
  swapiService = new SwapiService();

  interval: NodeJS.Timeout | number | null = null;

  state = {
    planet: {
      id: '',
      name: '',
      population: '',
      rotationPeriod: 0,
      diameter: 0,
    },
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(
      this.updatePlanet.bind(this),
      TIMEOUT
    );
  }

  onPlanetLoaded = (planet: IPlanet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  }

  updatePlanet() {
    const id = String(getRandomInt(2, 17));

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasDate = !(loading || error);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spiner /> : null;
    const planetCard = hasDate ? <PlanetCard planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spiner}
        {planetCard}
        {errorMessage}
      </div>

    );
  }

}

export default RandomPlanet;
