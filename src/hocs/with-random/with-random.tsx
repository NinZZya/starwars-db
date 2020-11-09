import React, { PureComponent } from 'react';
import { Spiner } from '../../components';
import {
  Message,
  ErrorMessage,
  ItemDetails,
} from '../../components';
import { DataStatus } from '../../constants/constants';
import { Id } from '../../constants/types';
import './with-random';


type ComponentProp = typeof ItemDetails;

interface Item {
  [key: string]: string | number | Record<string, string | number>;
  name: string;
  image: string;
}

interface WithRandomProp {
  status: DataStatus;
  items: Item[];
}

interface WithRandomState {
  activeId: Id,
}

const TIMEOUT = 5000;

const withRandom = (Component: ComponentProp, getItem: (id: Id) => Item, timeout: number = TIMEOUT) => {

  class WithRandom extends PureComponent<WithRandomProp, WithRandomState> {
    constructor(props: WithRandomProp) {
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

      if (!items.length) {
        return;
      }

      if (status === DataStatus.SUCCESS) {
        this.setState({
          activeId: String(
            items[Math.floor(Math.random() * items.length)].id
          ),
        });
      }
    }

    private getCard() {
      const { status, items } = this.props;
      const { activeId } = this.state;
      const loaded = status === DataStatus.SUCCESS;

      if (!loaded) {
        return null;
      }

      if (items.length) {
        const id = !activeId ? items[0].id :activeId;
        return <Component item={getItem(String(id))} />;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }

      return <Message title={"No data"} />;
    }

    render() {
      const { status } = this.props;

      const loading = status === DataStatus.LOADING;
      const error = status === DataStatus.ERROR;

      const errorMessage = error ? <ErrorMessage /> : null;
      const spiner = loading ? <Spiner /> : null;

      const card = this.getCard();

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
