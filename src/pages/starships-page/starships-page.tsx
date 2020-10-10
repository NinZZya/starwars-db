import React, { FC } from 'react';
import Sort from '../../components/sort';
import { Link, useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import ListElements from '../../components/list-elements';
import StarshipDetails from '../../components/details/starship-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName, StarshipsSortFields } from '../../const';
import * as Type from '../../types';


interface P {
  status: LoadingStatus;
  items: Type.IStarship[];
  getItem: Type.TGetStarship;
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortFiled: string) => void;
}

interface IParams {
  [IdName.STARSHIP]: string;
}

interface IMatch {
  params: IParams;
}

const SORT_FIELDS_KEYS = Object.keys(StarshipsSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;

const renderItem = (item: Type.IStarship) => (
  <Link to={`${AppPath.STARSHIPS}${item.id}`}>
    <p className="h4">{item.name}</p>
    ({SORT_FIELDS_KEYS.slice(1, SORT_FIELDS_KEYS.length).map((key, index) => (
      <span key={`${key}-${index}`}>
        <small>
          {`${StarshipsSortFields[key]}: ${item[key]}
            ${index !== LAST_FIELD_INDEX ?
            ', ' :
            ''
          }`}
        </small>
      </span>
    ))})
  </Link>
);

const getItemDetails = (props: P, activeId: Type.TId) => {
  const { status, items: starships, getItem } = props;
  const isNull = (status === LoadingStatus.LOADING) ||
    !starships.length;

  if (isNull) {
    return null;
  }

  if (!activeId) {
    return <Message title={"Select straship"} />;
  }

  const starship = getItem(activeId);

  if (!starship) {
    return <div>No data</div>;
  }

  return <StarshipDetails item={starship} />;
};


const getListPersons = (props: P) => {
  const { status, items: starships } = props;

  if (status === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (status === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  if (!starships.length) {
    return <Message title={"No data"} />
  }

  return (
    <ListElements
      items={starships}
      renderItem={renderItem}
    />
  );
}

const StarshipsPage: FC<P> = (props) => {
  const {
    sortType, setSortType,
    sortField, setSortField,
  } = props;

  const starshipsPath = `${AppPath.STARSHIPS}:${IdName.STARSHIP}`;
  const starshipMatch: IMatch | null = useRouteMatch(starshipsPath);
  const activeId = starshipMatch ?
    starshipMatch.params[IdName.STARSHIP] :
    '';

  const itemsDetails = getItemDetails(props, activeId);
  const listItems = getListPersons(props);

  return (
    <>
      <Sort
        fields={StarshipsSortFields}
        activeType={sortType}
        setSortType={setSortType}
        activeField={sortField}
        setSortField={setSortField}
      />
      <RowTwoCol
        first={listItems}
        second={itemsDetails}
      />
    </>
  );
};


export default StarshipsPage;
