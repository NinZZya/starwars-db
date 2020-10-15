import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Sort from '../../components/sort';
import ListElements from '../../components/list-elements';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, DataStatus, PlanetsSortFields } from '../../const';
import * as Type from '../../types';


interface P {
  status: DataStatus,
  items: Type.IPlanet[],
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortFiled: string) => void;
}

const SORT_FIELDS_KEYS = Object.keys(PlanetsSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;

const renderItem = (item: Type.IPlanet) => (
  <Link to={`${AppPath.PLANETS}${item.id}`}>
    <p className="h4">{item.name} </p>
    ({SORT_FIELDS_KEYS.slice(1, SORT_FIELDS_KEYS.length).map((key, index) => (
      <span key={`${key}-${index}`}>
        <small>
          {`${PlanetsSortFields[key]}: ${item[key] !== -1 ?
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

const PlanetsPage: FC<P> = (props) => {
  const {
    status, items: planets,
    sortType, setSortType,
    sortField, setSortField,
  } = props;

  if (status === DataStatus.LOADING) {
    return <Spiner />;
  }

  if (status === DataStatus.ERROR) {
    return <ErrorMessage />;
  }

  if (!planets.length) {
    return <Message title={"No data"} />
  }

  return (
    <>
      <Sort
        fields={PlanetsSortFields}
        activeType={sortType}
        setSortType={setSortType}
        activeField={sortField}
        setSortField={setSortField}
      />
      <ListElements
        items={planets}
        renderItem={renderItem}
      />
    </>
  );
};


export default PlanetsPage;
