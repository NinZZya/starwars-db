import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoue from '../components/private-route';
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
import * as UserSelector from '../redux/user/user-selectors';
import * as PersonsSelector from '../redux/persons/persons-selectors';
import * as PlanetsSelector from '../redux/planets/planets-selectors';
import * as StarshipsSelector from '../redux/starships/starships-selectors';
import { resetUser } from '../redux/user/user-actions';
import { loginAsync } from '../redux/user/user-operations';
import * as Type from '../types';
import { AppPath, IdName, LoadingStatus, menuItems, UserStatus } from '../const';



interface P {
  userStatus: UserStatus;
  user: Type.IUser;
  error: string;
  personsStatus: LoadingStatus;
  persons: Type.IPerson[];
  getPerson: (id: Type.TId) => Type.IPerson;
  planetsStatus: LoadingStatus;
  planets: Type.IPlanet[];
  getPlanet: (id: Type.TId) => Type.IPlanet;
  starshipsStatus: LoadingStatus;
  starships: Type.IStarship[];
  getStarship: Type.TGetStarship;
  login: (authData: Type.IAuthData) => void;
  logout: () => void;
}

const NO_AUTH_STARHIPS_RANDOM_TEXT = 'For get information about starships you must log in';

const App: FC<P> = (props) => {
  const {
    personsStatus, persons, getPerson,
    planetsStatus, planets, getPlanet,
    starshipsStatus, starships, getStarship,
    userStatus, user, error,
    login: onLogin, logout: onLogout,
  } = props;

  const mainPath = [
    AppPath.ROOT,
    `${AppPath.PERSONS}:${IdName.PERSON}?`,
  ];

  const isAuth = (userStatus === UserStatus.AUTH) && (user !== null);

  const PersonWithRadom = withRandom(PersonDetails, getPerson);
  const PlanetWithRadom = withRandom(PlanetDetails, getPlanet, 6500);
  const StarshipWithRadom = withRandom(StarshipDetails, getStarship,  8000);

  const randonBlock = (
    <ErrorBoundry>
      <RowThreeCol
        first={<PersonWithRadom status={personsStatus} items={persons} />}
        second={<PlanetWithRadom status={planetsStatus} items={planets} />}
        third={
          isAuth ? <StarshipWithRadom status={starshipsStatus} items={starships} /> :
            <div className="jumbotron">
              <ErrorMessage text={NO_AUTH_STARHIPS_RANDOM_TEXT} />
            </div>
        }
      />
    </ErrorBoundry>
  );

  return (
    <Router>
      <Header isAuth={isAuth} menuItems={menuItems} onLogout={onLogout} />
      <Switch>
        <Route exact path={mainPath}>
          {randonBlock}
          <PersonsPage status={personsStatus} items={persons} getItem={getPerson} />
        </Route>
        <Route exact path={`${AppPath.PLANETS}`}>
          <PlanetsPage status={planetsStatus} items={planets} />
        </Route>
        <Route exact path={`${AppPath.PLANETS}:${IdName.PLANET}`}>
          <PlanetPage status={planetsStatus} items={planets} getItem={getPlanet} />
        </Route>
        <PrivateRoue isAuth={isAuth} exact={true} path={`${AppPath.STARSHIPS}:${IdName.STARSHIP}?`}>
          {randonBlock}
          <StarshipsPage status={starshipsStatus} items={starships} getItem={getStarship} />
        </PrivateRoue>
        <PrivateRoue isAuth={isAuth} exact={true} path={AppPath.LOG_IN}>
          <LoginPage
            isError={userStatus === UserStatus.AUTH_ERROR}
            error={error}
            onLogin={onLogin}
          />
        </PrivateRoue>
        <Route exact path={AppPath.NOT_FOUND} component={NotFoundPage} />
        <Redirect to={AppPath.NOT_FOUND} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: Type.IState) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  error: UserSelector.getError(state),
  personsStatus: PersonsSelector.getPersonsStatus(state),
  persons: PersonsSelector.getPersons(state),
  getPerson: (id: Type.TId) => PersonsSelector.getPerson(state, id),
  planetsStatus: PlanetsSelector.getPlanetsStatus(state),
  planets: PlanetsSelector.getPlanets(state),
  getPlanet: (id: Type.TId) => PlanetsSelector.getPlanet(state, id),
  starshipsStatus: StarshipsSelector.getStarshipsStatus(state),
  starships: StarshipsSelector.getStarships(state),
  getStarship: (id: Type.TId) => StarshipsSelector.getStarship(state, id),
});


const mapDispatchToPorops = (dispatch: Type.TDispatch) => ({
  login: (authData: Type.IAuthData) => {
    dispatch(loginAsync(authData));
  },
  logout: () => {
    dispatch(resetUser());
  },
});


export { App };
export default connect(mapStateToProps, mapDispatchToPorops)(App);
