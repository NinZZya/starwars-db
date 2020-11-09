import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect,
} from 'react-router-dom';
import {
  Header,
  PrivateRoute,
  RandomBlock
} from '../modules';
import {
  LoginScreen,
  PersonsScreen,
  PlanetScreen,
  PlanetsScreen,
  StarshipsScreen,
  NotFoundScreen,
} from '../screens';
import { AppPath, IdName } from '../constants/constants';
import './app';

const App = () => {
  const mainPath = [
    AppPath.ROOT,
    `${AppPath.PERSONS}:${IdName.PERSON}?`,
  ];

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={mainPath}>
          <RandomBlock />
          <PersonsScreen />
        </Route>
        <Route exact path={`${AppPath.PLANETS}`}>
          <PlanetsScreen />
        </Route>
        <Route exact path={`${AppPath.PLANETS}:${IdName.PLANET}`}>
          <PlanetScreen />
        </Route>
        <PrivateRoute path={`${AppPath.STARSHIPS}:${IdName.STARSHIP}?`}>
          <RandomBlock />
          <StarshipsScreen />
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.LOG_IN}>
          <LoginScreen />
        </PrivateRoute>
        <Route exact path={AppPath.NOT_FOUND} component={NotFoundScreen} />
        <Redirect to={AppPath.NOT_FOUND} />
      </Switch>
    </Router>
  );
};


export default App;
