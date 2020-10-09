import React, { PureComponent } from 'react';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import ItemDetails from '../../components/details/item-details';
import { LoadingStatus } from '../../const';
import {
  IPerson, IPlanets, IStarships, TId,
} from '../../types';
import PrivateRoue from 'components/private-route';


type T = typeof ItemDetails;

type TGetItem = (
  (id: TId) => IPerson
);

interface P {
  status: LoadingStatus;
  items: IPerson[];
}

interface S {
  activeId: TId,
}

const TIMEOUT = 5000;

const withRandom = (Component: T, getItem: TGetItem, timeout: number = TIMEOUT) => {

  class WithRandom extends PureComponent<P, S> {
    constructor(props: P) {
      super(props);

      this.state = {
        activeId: '',
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
      const { activeId } = this.state;

      if (!items.length) {
        return;
      }

      if (status === LoadingStatus.SUCCESS) {
        if (activeId) {
          this.setState({
            activeId: items[Math.floor(Math.random() * items.length)].id,
          });
        } else {
          const ids = Object.keys(items);
          this.setState({
            activeId: ids[Math.floor(Math.random() * ids.length)],
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

      if (items.length) {
        const id = !activeId ? items[0].id : activeId;
        return <Component item={getItem(id)} />;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }

      return <Message title={"No data"} />;
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
