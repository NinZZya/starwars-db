import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  RowTwoCol,
  Sort,
  ListElements,
  Message,
} from '../../components';
import { PersonDetails, LoadingData } from '../../modules';
import {
  AppPath,
  DataStatus,
  IdName,
  PersonSortFields,
  UserStatus,
} from '../../constants/constants';
import { PersonsAction, PersonsSelector } from '../../store/redux/persons';
import { UserSelector } from '../../store/redux/user';
import { User, Id, Item, ItemDetail, State, DispatchAsync } from '../../constants/types';
import './persons-screen'


interface PersonItem extends ItemDetail, Item { };

interface Match {
  params: Record<IdName.PERSON, string>;
}

interface Prop {
  status: DataStatus;
  items: ItemDetail[];
  user: User;
  userStatus: UserStatus;
  getItem: (id: Id) => Item;
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortField: string) => void;
  match: Match;
}

type PersonsScreenProp = Prop & RouteComponentProps;

interface PersonsScreenState {
  activeId: Id;
}

const SORT_FIELDS_KEYS = Object.keys(PersonSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;


class PersonsScreen extends PureComponent<PersonsScreenProp, PersonsScreenState> {
  constructor(props: PersonsScreenProp) {
    super(props);
    this.state = {
      activeId: '',
    };
    this.renderItem = this.renderItem.bind(this);
  }

  private renderItem(item: ItemDetail) {
    const { id, name } = item;
    return (
      <Link
        to={`${AppPath.PERSONS}${id}`}
        onClick={() => this.setState({ activeId: String(id) })}
      >
        <p className="h4">{name}</p>
        ({SORT_FIELDS_KEYS.slice(1, SORT_FIELDS_KEYS.length).map((key, index) => (
          <span key={`${key}-${index}`}>
            <small>
              {`${PersonSortFields[key]}: ${item[key] !== -1 ?
                item[key] :
                'unknow'}
                ${index !== LAST_FIELD_INDEX ?
                  ', ' :
                  ''
                }`}
            </small>
          </span>
        ))})
      </Link>
    );
  }

  private getListPersons() {
    const { status, items } = this.props;

    return (
      <>
        <LoadingData status={status} items={items} />
        <ListElements
          items={items}
          renderItem={this.renderItem}
        />
      </>
    );
  }

  private getItemDetails() {
    const {
      status,
      items: persons,
      getItem,
    } = this.props;


    const { activeId } = this.state;
    const isNull = (status === DataStatus.LOADING) ||
      !persons.length;

    if (isNull) {
      return null;
    }

    if (!activeId) {
      return <Message title={"Select person"} />;
    }

    const person = getItem(activeId);

    if (!person) {
      return <Message title={"No data"} />;
    }

    return (
      <>
        <PersonDetails item={person as PersonItem} />
      </>
    );
  }

  componentDidMount() {
    const {
      match,
    } = this.props;

    if (match) {
      const activeId = match.params[IdName.PERSON];
      this.setState({ activeId });
    }
  }

  render() {
    const {
      sortType, setSortType,
      sortField, setSortField,
    } = this.props;

    const listItems = this.getListPersons();
    const itemDetails = this.getItemDetails();

    return (
      <>
        <Sort
          activeType={sortType}
          activeField={sortField}
          fields={PersonSortFields}
          setSortType={setSortType}
          setSortField={setSortField}
        />
        <RowTwoCol
          first={listItems}
          second={itemDetails}
        />
      </>
    );
  }
};


const mapStateToProps = (state: State) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
  status: PersonsSelector.getPersonsStatus(state),
  items: PersonsSelector.getSordedPersons(state),
  sortType: PersonsSelector.getPersonsSortType(state),
  sortField: PersonsSelector.getPersonsSortField(state),
  getItem: (id: Id) => PersonsSelector.getPerson(state, id),
});


const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  setSortType: (sortType: string) => {
    dispatch(PersonsAction.setPersonsSortType(sortType));
  },
  setSortField: (sortField: string) => {
    dispatch(PersonsAction.setPersonsSortField(sortField));
  },
});

export { PersonsScreen };
export default withRouter(
  connect(mapStateToProps, mapDispatchToPorops)(PersonsScreen)
);
