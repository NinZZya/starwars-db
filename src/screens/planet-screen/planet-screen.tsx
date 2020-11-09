import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect, useRouteMatch, withRouter } from 'react-router-dom';
import { Spiner, ErrorMessage} from '../../components';
import { PlanetDetails } from '../../modules';
import { PlanetsSelector } from '../../store/redux/planets';
import { AppPath, DataStatus, IdName } from '../../constants/constants';
import { Id, Planet, State } from '../../constants/types';
import './planet-screen';


interface PlanetScreenProp {
  status: DataStatus,
  items: Planet[],
  getItem: (id: Id) => Planet;
  match: Match;
}


interface Match {
  params: Record<IdName.PLANET, string>;
}


const PlanetScreen: FC<PlanetScreenProp> = (props) => {
  const { status, items: planets, getItem, match } = props;

  if (status === DataStatus.LOADING) {
    return <Spiner />;
  }

  if (status === DataStatus.ERROR) {
    return <ErrorMessage />;
  }

  const planetsCount = planets.length;

  const activeId = match ?
    match.params[IdName.PLANET] :
    '';

  const planet = getItem(activeId);

  const isNotFound = (status === DataStatus.SUCCESS) && (!planetsCount || !planet);

  if (isNotFound) {
    return <Redirect to={AppPath.NOT_FOUND} />
  }

  return <PlanetDetails item={planet} />;
};


const mapStateToProps = (state: State) => ({
  status: PlanetsSelector.getPlanetsStatus(state),
  items: PlanetsSelector.getSortedPlanets(state),
  getItem: (id: Id) => PlanetsSelector.getPlanet(state, id),
});


export { PlanetScreen };
export default withRouter(
  connect(mapStateToProps)(PlanetScreen)
);
