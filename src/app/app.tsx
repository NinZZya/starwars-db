import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect,
} from 'react-router-dom';
import Header from '../components/header';
import RowThreeCol from '../components/rows/row-three-col';
import PersonDetails from '../components/details/person-details';
import PlanetDetails from '../components/details/planet-details';
import StarshipDetails from '../components/details/starship-details';
import ErrorBoundry from '../components/error-boundry';
import PersonsPage from '../pages/persons-page';
import PlanetsPage from '../pages/planets-page';
import PlanetPage from '../pages/planet-page';
import StarshipsPage from '../pages/starships-page';
import NotFoundPage from '../pages/not-found-page';
import withRandom from '../hocs/with-random';
import { getPersons, getPersonsStatus } from '../redux/persons/persons-selectors';
import { getPlanets, getPlanetsStatus } from '../redux/planets/planets-selectors';
import { getStarships, getStarshipsStatus } from '../redux/starships/starships-selectors';
import { IState, IPersons, IPlanets, IStarships } from '../types';
import { AppPath, IdName, LoadingStatus } from '../const';



interface P {
  personsStatus: LoadingStatus;
  persons: IPersons;
  planetsStatus: LoadingStatus;
  planets: IPlanets;
  starshipsStatus: LoadingStatus;
  starships: IStarships;
}

const App: FC<P> = (props) => {
  const {
    personsStatus,persons,
    planetsStatus, planets,
    starshipsStatus, starships
   } = props;

  const mainPath = [
    AppPath.ROOT,
    `${AppPath.PERSONS}:${IdName.PERSON}?`,
  ];

  const PersonWithRadom = withRandom(PersonDetails);
  const PlanetWithRadom = withRandom(PlanetDetails, 6500);
  const StarshipWithRadom = withRandom(StarshipDetails, 8000);

  return (
    <Router>
      <Header />
      <ErrorBoundry>
        <RowThreeCol
          first={<PersonWithRadom status={personsStatus} items={persons} />}
          second={<StarshipWithRadom status={starshipsStatus} items={starships} />}
          third={<PlanetWithRadom status={planetsStatus} items={planets} />}
        />

      </ErrorBoundry>
      <Switch>
        <Route exact path={mainPath}>
          <PersonsPage status={personsStatus} items={persons} />
        </Route>
        <Route exact path={`${AppPath.PLANETS}`}>
          <PlanetsPage />
        </Route>
        <Route exact path={`${AppPath.PLANETS}:${IdName.PLANET}`}>
          <PlanetPage status={planetsStatus} items={planets} />
        </Route>
        <Route exact path={`${AppPath.STARSHIPS}:${IdName.STARSHIP}?`}>
          <StarshipsPage status={starshipsStatus} items={starships} />
        </Route>
        <Route exact path={AppPath.NOT_FOUND} component={NotFoundPage} />
        <Redirect to={AppPath.NOT_FOUND} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: IState) => ({
  personsStatus: getPersonsStatus(state),
  persons: getPersons(state),
  planetsStatus: getPlanetsStatus(state),
  planets: getPlanets(state),
  starshipsStatus: getStarshipsStatus(state),
  starships: getStarships(state),
});


export { App };
export default connect(mapStateToProps)(App);
