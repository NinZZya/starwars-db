import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  RowThreeCol,
  ErrorMessage,
} from '../../components';
import {
  ErrorBoundry,
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from '../../modules';
import { UserSelector } from '../../store/redux/user';
import { PersonsSelector} from '../../store/redux/persons';
import { PlanetsSelector } from '../../store/redux/planets';
import { StarshipsOperation, StarshipsSelector } from '../../store/redux/starships';
import { withRandom } from '../../hocs';
import { Id, State, Person, Planet, Starship, DispatchAsync, User } from '../../constants/types';
import { DataStatus, UserStatus } from '../../constants/constants';
import './random-block';


interface RandomBlockProp {
  user: User;
  userStatus: UserStatus;
  personsStatus: DataStatus;
  persons: Person[];
  getPerson: (id: Id) => Person;
  planetsStatus: DataStatus;
  planets: Planet[];
  getPlanet: (id: Id) => Planet;
  starshipsStatus: DataStatus;
  starships: Starship[];
  getStarship: (id: Id) => Starship;
  loadStarships: () => void;
}

const NO_AUTH_STARHIPS_RANDOM_TEXT = 'For get information about starships you must log in';

class RandomBlock extends PureComponent<RandomBlockProp> {
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
      userStatus,
      personsStatus,
      persons,
      getPerson,
      planetsStatus,
      planets,
      getPlanet,
      starshipsStatus,
      starships,
      getStarship,
    } = this.props;

    const RadomPerson = withRandom(PersonDetails, getPerson);
    const RadomPlanet = withRandom(PlanetDetails, getPlanet, 6500);
    const RadomStarship = withRandom(StarshipDetails, getStarship, 8000);
    const isAuth = userStatus === UserStatus.AUTH;

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
  }
}

const mapStateToProps = (state: State) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  personsStatus: PersonsSelector.getPersonsStatus(state),
  persons: PersonsSelector.getSordedPersons(state),
  getPerson: (id: Id) => PersonsSelector.getPerson(state, id),
  planetsStatus: PlanetsSelector.getPlanetsStatus(state),
  planets: PlanetsSelector.getSortedPlanets(state),
  getPlanet: (id: Id) => PlanetsSelector.getPlanet(state, id),
  starshipsStatus: StarshipsSelector.getStarshipsStatus(state),
  starships: StarshipsSelector.getSortedStarships(state),
  getStarship: (id: Id) => StarshipsSelector.getStarship(state, id),
});

const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  loadStarships: () => {
    dispatch(StarshipsOperation.loadStarshipsAsync());
  },
});


export { RandomBlock }
export default connect(mapStateToProps, mapDispatchToPorops)(RandomBlock);
