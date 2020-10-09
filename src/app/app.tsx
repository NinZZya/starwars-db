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
import ErrorMessage from '../components/messages/error-message';
import PersonsPage from '../pages/persons-page';
import PlanetsPage from '../pages/planets-page';
import PlanetPage from '../pages/planet-page';
import StarshipsPage from '../pages/starships-page';
import NotFoundPage from '../pages/not-found-page';
import LoginPage from '../pages/login-page';
import withRandom from '../hocs/with-random';
import { getPersons, getPersonsStatus } from '../redux/persons/persons-selectors';
import { getPlanets, getPlanetsStatus } from '../redux/planets/planets-selectors';
import { getStarships, getStarshipsStatus } from '../redux/starships/starships-selectors';
import { IState, IPersons, IPlanets, IStarships } from '../types';
import { AppPath, IdName, LoadingStatus, menuItems } from '../const';



interface P {
  personsStatus: LoadingStatus;
  persons: IPersons;
  planetsStatus: LoadingStatus;
  planets: IPlanets;
  starshipsStatus: LoadingStatus;
  starships: IStarships;
}

const NO_AUTH_STARHIPS_RANDOM_TEXT = 'For get information about starships you must log in';

const App: FC<P> = (props) => {
  const {
    personsStatus, persons,
    planetsStatus, planets,
    starshipsStatus, starships
  } = props;

  const mainPath = [
    AppPath.ROOT,
    `${AppPath.PERSONS}:${IdName.PERSON}?`,
  ];

  const isAuth = true;

  const PersonWithRadom = withRandom(PersonDetails);
  const PlanetWithRadom = withRandom(PlanetDetails, 6500);
  const StarshipWithRadom = withRandom(StarshipDetails, 8000);

  const randonBlock = (
    <ErrorBoundry>
      <RowThreeCol
        first={<PersonWithRadom status={personsStatus} items={persons} />}
        second={<PlanetWithRadom status={planetsStatus} items={planets} />}
        third={
          isAuth ? <StarshipWithRadom status={starshipsStatus} items={starships} /> :
            <div className="random-planet jumbotron rounded">
              <ErrorMessage text={NO_AUTH_STARHIPS_RANDOM_TEXT} />
            </div>
        }
      />
    </ErrorBoundry>
  );

  return (
    <Router>
      <Header isAuth={isAuth} menuItems={menuItems} />
      <Switch>
        <Route exact path={mainPath}>
          {randonBlock}
          <PersonsPage status={personsStatus} items={persons} />
        </Route>
        <Route exact path={`${AppPath.PLANETS}`}>
          <PlanetsPage />
        </Route>
        <Route exact path={`${AppPath.PLANETS}:${IdName.PLANET}`}>
          <PlanetPage status={planetsStatus} items={planets} />
        </Route>
        <Route exact path={`${AppPath.STARSHIPS}:${IdName.STARSHIP}?`}>
          {randonBlock}
          <StarshipsPage status={starshipsStatus} items={starships} />
        </Route>
        <Route exact path={AppPath.LOG_IN}>
          <LoginPage />
        </Route>
        <Route exact path={AppPath.LOG_OUT} render={() => {
          console.log(1);
          return <Redirect to={AppPath.ROOT} />
        }} />
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
