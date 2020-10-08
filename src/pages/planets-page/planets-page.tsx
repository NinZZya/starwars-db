import React, { FC } from 'react';
import { connect } from 'react-redux';
import ListElements from '../../components/list-elements';
import Spiner from '../../components/spiner';
import ErrorMessage from '../../components/error-message';
import { getPlanets, getPlanetsStatus } from '../../redux/planets/planets-selectors';
import { AppPath, LoadingStatus } from '../../const';
import { IPlanets, IState } from '../../types';


interface P {
  planetsStatus: LoadingStatus,
  planets: IPlanets,
}

const PlanetsPage: FC<P> = (props) => {
  const { planetsStatus } = props;
  if (planetsStatus === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (planetsStatus === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  const planets = Object.values(props.planets);

  if (!planets.length) {
    return <div>No data</div>;
  }

  return (
    <ListElements
      items={planets}
      path={AppPath.PLANETS}
    />
  );
};


const mapStateToProps = (state: IState) => ({
  planetsStatus: getPlanetsStatus(state),
  planets: getPlanets(state),
});


export { PlanetsPage };
export default connect(mapStateToProps)(PlanetsPage);
