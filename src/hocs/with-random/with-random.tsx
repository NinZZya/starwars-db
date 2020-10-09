import React, { PureComponent } from 'react';
import Spiner from '../../components/spiner';
import ErrorMessage from '../../components/messages/error-message';
import { LoadingStatus } from '../../const';
import {
  IPersons, IPlanets, IStarships, TId,
} from '../../types';
import ItemDetails from '../../components/details/item-details';


type T = typeof ItemDetails;

interface P {
  status: LoadingStatus;
  items: IPlanets | IPersons | IStarships;
}

interface S {
  activeId: TId,
  ids: TId[],
}

const TIMEOUT = 5000;

const withRandom = (Component: T, timeout: number = TIMEOUT) => {

  class WithRandom extends PureComponent<P, S> {
    constructor(props: P) {
      super(props);

      this.state = {
        activeId: '',
        ids: [],
      };
    };

    interval: NodeJS.Timeout | null = null;

    componentDidMount() {
      this.interval = setInterval(
        this.updateCard.bind(this),
        timeout
      );
    }

    componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }

    updateCard() {
      const { status, items } = this.props;
      const { activeId, ids } = this.state;

      if (status === LoadingStatus.SUCCESS) {
        if (activeId) {
          this.setState({
            activeId: ids[Math.floor(Math.random() * ids.length)],
          });
        } else {
          const ids = Object.keys(items);
          this.setState({
            activeId: ids[Math.floor(Math.random() * ids.length)],
            ids,
          });
        }
      }
    }

    _getCard() {
      const { status, items } = this.props;
      const { activeId } = this.state;
      const loaded = status === LoadingStatus.SUCCESS;

      if (!loaded) {
        return null;
      }

      const ids = Object.keys(items);

      if (ids.length) {
        const id = !activeId ? ids[0] : activeId;
        return <Component item={items[id]} />;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }

      return <div>No data</div>;
    }

    render() {
      const { status } = this.props;

      const loading = status === LoadingStatus.LOADING;
      const error = status === LoadingStatus.ERROR;

      const errorMessage = error ? <ErrorMessage /> : null;
      const spiner = loading ? <Spiner /> : null;

      const card = this._getCard();

      return (
        <div className="random-container jumbotron rounded">
          {spiner}
          {card}
          {errorMessage}
        </div>

      );
    }
  }
  return WithRandom;
};

export default withRandom;
