import React, { FC } from 'react';
import Sort from '../../components/sort';
import ListElements from '../../components/list-elements';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, PlanetsSortFields } from '../../const';
import * as Type from '../../types';


interface P {
  status: LoadingStatus,
  items: Type.IPlanet[],
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortFiled: string) => void;
}

const PlanetsPage: FC<P> = (props) => {
  const {
    status, items: planets,
    sortType, setSortType,
    sortField, setSortField,
  } = props;

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
    <>
      <Sort
        fields={PlanetsSortFields}
        activeType={sortType}
        setSortType={setSortType}
        activeField={sortField}
        setSortField={setSortField}
      />
      <ListElements
        items={planets}
        path={AppPath.PLANETS}
      />
    </>
  );
};


export default PlanetsPage;
