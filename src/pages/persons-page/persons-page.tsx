import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import Sort from '../../components/sort';
import ListElements from '../../components/list-elements';
import PersonDetails from '../../components/details/person-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName, PersonSortFields } from '../../const';
import { IPerson, TId } from '../../types';


interface P {
  status: LoadingStatus;
  items: IPerson[];
  getItem: (id: TId) => IPerson;
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortField: string) => void;
}

interface IParams {
  [IdName.PERSON]: string;
}

interface IMatch {
  params: IParams;
}

const SORT_FIELDS_KEYS = Object.keys(PersonSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;

const renderItem = (item: IPerson) => (
  <Link to={`${AppPath.PERSONS}${item.id}`}>
    <p className="h4">{item.name}</p>
    ({SORT_FIELDS_KEYS.slice(1, SORT_FIELDS_KEYS.length).map((key, index) => (
      <span key={`${key}-${index}`}>
        <small>
          {`${PersonSortFields[key]}: ${item[key]}
            ${index !== LAST_FIELD_INDEX ?
            ', ' :
            ''
          }`}
        </small>
      </span>
    ))})
  </Link>
);

const getItemDetails = (props: P, activeId: TId) => {
  const { status, items: persons, getItem } = props;
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

  return <PersonDetails item={person} />;
};


const getListPersons = (props: P) => {
  const { status, items: persons } = props;

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
      renderItem={renderItem}
      // path={AppPath.PERSONS}
    />
  );
}

const PersonsPage: FC<P> = (props) => {
  const {
    sortType, setSortType,
    sortField, setSortField,
  } = props;

  const personsPath = `${AppPath.PERSONS}:${IdName.PERSON}`;
  const personsMatch: IMatch | null = useRouteMatch(personsPath);
  const activeId = personsMatch ?
    personsMatch.params[IdName.PERSON] :
    '';

  const itemsDetails = getItemDetails(props, activeId);
  const listItems = getListPersons(props);

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
        second={itemsDetails}
      />
    </>
  );
};


export default PersonsPage;
