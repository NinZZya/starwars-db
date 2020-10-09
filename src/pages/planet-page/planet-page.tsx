import React, { FC } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import PlanetDeils from '../../components/details/planet-details';
import Spiner from '../../components/spiner';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName } from '../../const';
import { IPlanets } from '../../types';


interface P {
  status: LoadingStatus,
  items: IPlanets,
}

interface IParams {
  [IdName.PLANET]: string;
}

interface IMatch {
  params: IParams;
}


const PlanetPage: FC<P> = (props) => {
  const { status, items: planets } = props;

  if (status === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (status === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  const planetsCount = Object.values(planets).length;

  const planetsPath = `${AppPath.PLANETS}:${IdName.PLANET}`;
  const planetsMatch: IMatch | null = useRouteMatch(planetsPath);
  const activeId = planetsMatch ?
    planetsMatch.params[IdName.PLANET] :
    '';

  const planet = planets[activeId];

  const isNotFound = (status === LoadingStatus.SUCCESS) && (!planetsCount || !planet);

  if (isNotFound) {
    return <Redirect to={AppPath.NOT_FOUND} />
  }

  return <PlanetDeils item={planet} />;
};


export default PlanetPage;
