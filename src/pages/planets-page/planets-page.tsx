import React, { FC } from 'react';
import ListElements from '../../components/list-elements';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus } from '../../const';
import * as Type from '../../types';


interface P {
  status: LoadingStatus,
  items: Type.IPlanet[],
}

const PlanetsPage: FC<P> = (props) => {
  const { status, items: planets } = props;

  if (status === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (status === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  if (!planets.length) {
    return <Message title={"No data"} />
  }

  return (
    <ListElements
      items={planets}
      path={AppPath.PLANETS}
    />
  );
};


export default PlanetsPage;
