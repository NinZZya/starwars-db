import React, { PureComponent } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import Sort from '../../components/sort';
import ListElements from '../../components/list-elements';
import PersonDetails from '../../components/details/person-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import Comments from '../../components/comments';
import NewComment from '../../components/comments/components/new-comment';
import { AppPath, LoadingStatus, IdName, PersonSortFields, UserStatus } from '../../const';
import { IComment, IPerson, IUser, TId } from '../../types';


interface IParams {
  [IdName.PERSON]: string;
}

interface IMatch {
  params: IParams;
}

interface I {
  status: LoadingStatus;
  items: IPerson[];
  user: IUser;
  userStatus: UserStatus;
  getItem: (id: TId) => IPerson;
  itemCommentsStatus: LoadingStatus | null;
  itemComments: IComment[];
  loadItemComments: (id: TId) => void;
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortField: string) => void;
  match: IMatch;
}

type P = I & RouteComponentProps;

interface S {
  activeId: TId;
}

const SORT_FIELDS_KEYS = Object.keys(PersonSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;


class PersonsPage extends PureComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      activeId: '',
    };
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(item: IPerson) {

    return (
      <Link
        to={`${AppPath.PERSONS}${item.id}`}
        onClick={() => this.setState({activeId: item.id})}
      >
        <p className="h4">{item.name}</p>
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

  _getListPersons() {
    const { status, items: persons } = this.props;

    if (status === LoadingStatus.LOADING) {
      return <Spiner />;
    }

    if (status === LoadingStatus.ERROR) {
      return <ErrorMessage />;
    }

    if (!persons.length) {
      <Message title={"No data"} />
    }

    return (
      <ListElements
        items={persons}
        renderItem={this._renderItem}
      />
    );
  }

  _getComments = () => {
    const {
      itemComments,
      loadItemComments,
      itemCommentsStatus,
    } = this.props;

    const { activeId } = this.state;

    if (itemCommentsStatus === LoadingStatus.LOADING || itemCommentsStatus === null) {
      return <Spiner />;
    }

    if (itemCommentsStatus === LoadingStatus.ERROR) {
      return (
        <ErrorMessage
          title="Loading comments error"
        >
          <button onClick={() => loadItemComments(activeId)}>
            Try again
          </button>
        </ErrorMessage>
      );
    }

  if (itemCommentsStatus === LoadingStatus.SUCCESS && !itemComments.length) {
      return <Message text="No comments yet ..." />;
    }
  }

  _getItemDetails = () => {
    const {
      status, userStatus, user,
      items: persons,
      getItem,
      itemComments,
    } = this.props;

    const isAuth = userStatus === UserStatus.AUTH && user;
    const commentsContent = this._getComments();

    const { activeId } = this.state;
    const isNull = (status === LoadingStatus.LOADING) ||
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
        <PersonDetails item={person} />
        <Comments
          items={itemComments}
        >
          {commentsContent}
          {isAuth && <NewComment onSubmitComment={() => {}}/>}
        </Comments>
      </>
    );
  }

  componentDidUpdate(prevProps: P, prevState: S) {
    const {
      loadItemComments,
      match,
    } = this.props;

    const activeId = this.state.activeId;
    if (activeId !== prevState.activeId) {
      loadItemComments(activeId);
    }
  }

  componentDidMount() {
    const {
      match,
    } = this.props;

    const personsPath = `${AppPath.PERSONS}:${IdName.PERSON}`;
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

    const { activeId } = this.state;

    const listItems = this._getListPersons();
    const itemDetails = this._getItemDetails();

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


export default withRouter(PersonsPage);
