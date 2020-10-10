import React, { FC } from 'react';
import { connect } from 'react-redux';
import RowThreeCol from '../../components/rows/row-three-col';
import PersonDetails from '../../components/details/person-details';
import PlanetDetails from '../../components/details/planet-details';
import StarshipDetails from '../../components/details/starship-details';
import ErrorBoundry from '../../components/error-boundry';
import ErrorMessage from '../../components/messages/error-message';
import withRandom from '../../hocs/with-random';
import * as UserSelector from '../../redux/user/user-selectors';
import * as PersonsSelector from '../../redux/persons/persons-selectors';
import * as PlanetsSelector from '../../redux/planets/planets-selectors';
import * as StarshipsSelector from '../../redux/starships/starships-selectors';
import * as Type from '../../types';
import { LoadingStatus, UserStatus } from '../../const';



interface P {
  userStatus: UserStatus;
  user: Type.IUser;
  personsStatus: LoadingStatus;
  persons: Type.IPerson[];
  getPerson: (id: Type.TId) => Type.IPerson;
  planetsStatus: LoadingStatus;
  planets: Type.IPlanet[];
  getPlanet: (id: Type.TId) => Type.IPlanet;
  starshipsStatus: LoadingStatus;
  starships: Type.IStarship[];
  getStarship: Type.TGetStarship;
}

const NO_AUTH_STARHIPS_RANDOM_TEXT = 'For get information about starships you must log in';

const RandomBlock: FC<P> = (props) => {
  const {
    personsStatus, persons, getPerson,
    planetsStatus, planets, getPlanet,
    starshipsStatus, starships, getStarship,
    userStatus, user,
  } = props;


  const isAuth = (userStatus === UserStatus.AUTH) && (user !== null);

  const RadomPerson = withRandom(PersonDetails, getPerson);
  const RadomPlanet = withRandom(PlanetDetails, getPlanet, 6500);
  const RadomStarship = withRandom(StarshipDetails, getStarship,  8000);

  return (
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
};

const mapStateToProps = (state: Type.IState) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  personsStatus: PersonsSelector.getPersonsStatus(state),
  persons: PersonsSelector.getSordedPerson(state),
  getPerson: (id: Type.TId) => PersonsSelector.getPerson(state, id),
  planetsStatus: PlanetsSelector.getPlanetsStatus(state),
  planets: PlanetsSelector.getPlanets(state),
  getPlanet: (id: Type.TId) => PlanetsSelector.getPlanet(state, id),
  starshipsStatus: StarshipsSelector.getStarshipsStatus(state),
  starships: StarshipsSelector.getStarships(state),
  getStarship: (id: Type.TId) => StarshipsSelector.getStarship(state, id),
});


export { RandomBlock };
export default connect(mapStateToProps)(RandomBlock);
