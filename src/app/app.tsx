import React, { PureComponent } from 'react';
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
import * as UserAction from '../redux/user/user-actions';
import * as UserOperation from '../redux/user/user-operations';
import * as UserSelector from '../redux/user/user-selectors';
import * as PersonsAction from '../redux/persons/persons-actions';
import * as PersonsOperation from '../redux/persons/persons-operations';
import * as PersonsSelector from '../redux/persons/persons-selectors';
import * as PlanetsAction from '../redux/planets/planets-actions';
import * as PlanetsSelector from '../redux/planets/planets-selectors';
import * as StarshipsAction from '../redux/starships/starships-actions';
import * as StarshipsOperation from '../redux/starships/starships-operations';
import * as StarshipsSelector from '../redux/starships/starships-selectors';
import * as Type from '../types';
import { AppPath, IdName, DataStatus, UserStatus } from '../const';



interface P {
  userStatus: UserStatus;
  user: Type.IUser;
  error: string;
  personsStatus: DataStatus;
  persons: Type.IPerson[];
  getPerson: (id: Type.TId) => Type.IPerson;
  personCommentsStatus: DataStatus | null;
  personComments: Type.IComment[];
  loadPersonComments: (id: Type.TId) => void;
  personsSortType: string;
  setPersonsSortType: (sortType: string) => void;
  personsSortField: string;
  setPersonsSortField: (sortFiled: string) => void;
  planetsStatus: DataStatus;
  planets: Type.IPlanet[];
  planetsSortType: string;
  setPlanetsSortType: (sortType: string) => void;
  planetsSortField: string;
  setPlanetsSortField: (sortFiled: string) => void;
  getPlanet: (id: Type.TId) => Type.IPlanet;
  starshipsStatus: DataStatus;
  starships: Type.IStarship[];
  getStarship: Type.TGetStarship;
  starshipsSortType: string;
  setStarshipsSortType: (sortType: string) => void;
  starshipsSortField: string;
  setStarshipsSortField: (sortFiled: string) => void;
  loadStarships: () => void;
  onLogin: (authData: Type.IAuthData) => void;
  onLogout: () => void;
}

const NO_AUTH_STARHIPS_RANDOM_TEXT = 'For get information about starships you must log in';

class App extends PureComponent<P> {
  constructor(props: P) {
    super(props);
  }

  componentDidUpdate() {
    const {
      loadStarships,
      starshipsStatus,
      userStatus, user,
    } = this.props;

    const needStartLoadingStarships = (
      (userStatus === UserStatus.AUTH) &&
      (user !== null) &&
      (starshipsStatus !== DataStatus.SUCCESS)
    );

    if (needStartLoadingStarships) {
      loadStarships();
    }
  }

  render() {
    const {
      personsStatus, persons, getPerson,
      personCommentsStatus, personComments, loadPersonComments,
      personsSortType, setPersonsSortType,
      personsSortField, setPersonsSortField,
      planetsStatus, planets, getPlanet,
      planetsSortType, setPlanetsSortType,
      planetsSortField, setPlanetsSortField,
      starshipsStatus, starships, getStarship,
      starshipsSortType, setStarshipsSortType,
      starshipsSortField, setStarshipsSortField,
      userStatus, user, error,
      onLogin, onLogout,
    } = this.props;

    const mainPath = [
      AppPath.ROOT,
      `${AppPath.PERSONS}:${IdName.PERSON}?`,
    ];

    const isAuth = (userStatus === UserStatus.AUTH) && (user !== null);

    const RadomPerson = withRandom(PersonDetails, getPerson);
    const RadomPlanet = withRandom(PlanetDetails, getPlanet, 6500);
    const RadomStarship = withRandom(StarshipDetails, getStarship, 8000);

    const randomBlock = (
      <ErrorBoundry>
        <RowThreeCol
          first={<RadomPerson status={personsStatus} items={persons} />}
          second={<RadomPlanet status={planetsStatus} items={planets} />}
          third={
            isAuth ? <RadomStarship status={starshipsStatus} items={starships} /> :
              <div className="jumbotron">
                <ErrorMessage text={NO_AUTH_STARHIPS_RANDOM_TEXT} />
              </div>
          }
        />
      </ErrorBoundry>
    );

    return (
      <Router>
        <Header
          user={user}
          userStatus={userStatus}
          onLogout={onLogout}
        />
        <Switch>
          <Route exact path={mainPath}>
            {randomBlock}
            <PersonsPage
              status={personsStatus}
              items={persons}
              user={user}
              userStatus={userStatus}
              getItem={getPerson}
              itemCommentsStatus={personCommentsStatus}
              itemComments={personComments}
              loadItemComments={loadPersonComments}
              sortType={personsSortType}
              setSortType={setPersonsSortType}
              sortField={personsSortField}
              setSortField={setPersonsSortField}
            />
          </Route>
          <Route exact path={`${AppPath.PLANETS}`}>
            <PlanetsPage
              status={planetsStatus}
              items={planets}
              sortType={planetsSortType}
              setSortType={setPlanetsSortType}
              sortField={planetsSortField}
              setSortField={setPlanetsSortField}
            />
          </Route>
          <Route exact path={`${AppPath.PLANETS}:${IdName.PLANET}`}>
            <PlanetPage
              status={planetsStatus}
              items={planets}
              getItem={getPlanet}
            />
          </Route>
          <PrivateRoue isAuth={isAuth} path={`${AppPath.STARSHIPS}:${IdName.STARSHIP}?`}>
            {randomBlock}
            <StarshipsPage
              status={starshipsStatus}
              items={starships}
              getItem={getStarship}
              sortType={starshipsSortType}
              setSortType={setStarshipsSortType}
              sortField={starshipsSortField}
              setSortField={setStarshipsSortField}
            />
          </PrivateRoue>
          <PrivateRoue isAuth={isAuth} exact path={AppPath.LOG_IN}>
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
  }
};

const mapStateToProps = (state: Type.IState) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  error: UserSelector.getError(state),
  personsStatus: PersonsSelector.getPersonsStatus(state),
  persons: PersonsSelector.getSordedPersons(state),
  personsSortType: PersonsSelector.getPersonsSortType(state),
  personsSortField: PersonsSelector.getPersonsSortField(state),
  getPerson: (id: Type.TId) => PersonsSelector.getPerson(state, id),
  personCommentsStatus: PersonsSelector.getPersonCommentsStatus(state),
  personComments: PersonsSelector.getPersonComments(state),
  planetsStatus: PlanetsSelector.getPlanetsStatus(state),
  planets: PlanetsSelector.getSortedPlanets(state),
  planetsSortType: PlanetsSelector.getPlanetsSortType(state),
  planetsSortField: PlanetsSelector.getPlanetsSortField(state),
  getPlanet: (id: Type.TId) => PlanetsSelector.getPlanet(state, id),
  starshipsStatus: StarshipsSelector.getStarshipsStatus(state),
  starships: StarshipsSelector.getSortedStarships(state),
  starshipsSortType: StarshipsSelector.getStarshipsSortType(state),
  starshipsSortField: StarshipsSelector.getStarshipsSortField(state),
  getStarship: (id: Type.TId) => StarshipsSelector.getStarship(state, id),
});


const mapDispatchToPorops = (dispatch: Type.TDispatch) => ({
  onLogin: (authData: Type.IAuthData) => {
    dispatch(UserOperation.loginAsync(authData));
  },
  onLogout: () => {
    dispatch(UserAction.resetUser());
  },
  setPersonsSortType: (sortType: string) => {
    dispatch(PersonsAction.setPersonsSortType(sortType));
  },
  setPersonsSortField: (sortField: string) => {
    dispatch(PersonsAction.setPersonsSortField(sortField));
  },
  loadPersonComments: (id: Type.TId) => {
    dispatch(PersonsOperation.loadPersonCommentsAsync(id));
  },
  setPlanetsSortType: (sortType: string) => {
    dispatch(PlanetsAction.setPlanetsSortType(sortType));
  },
  setPlanetsSortField: (sortField: string) => {
    dispatch(PlanetsAction.setPlanetsSortField(sortField));
  },
  setStarshipsSortType: (sortType: string) => {
    dispatch(StarshipsAction.setStarshipsSortType(sortType));
  },
  setStarshipsSortField: (sortField: string) => {
    dispatch(StarshipsAction.setStarshipsSortField(sortField));
  },
  loadStarships: () => {
    dispatch(StarshipsOperation.loadStarshipsAsync());
  },
});


export { App };
export default connect(mapStateToProps, mapDispatchToPorops)(App);
