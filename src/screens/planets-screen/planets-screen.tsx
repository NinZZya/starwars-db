import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sort, ListElements, Spiner, Message, ErrorMessage } from '../../components';
import { LoadingData } from '../../modules';
import { PlanetsAction, PlanetsSelector } from '../../store/redux/planets';
import { AppPath, DataStatus, PlanetsSortFields } from '../../constants/constants';
import { State, ItemDetail, DispatchAsync } from '../../constants/types';
import './planets-screen';


interface P {
  status: DataStatus,
  items: ItemDetail[],
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortFiled: string) => void;
}

const SORT_FIELDS_KEYS = Object.keys(PlanetsSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;

const renderItem = (item: ItemDetail) => (
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
    status,
    items,
    sortType,
    setSortType,
    sortField,
    setSortField,
  } = props;

  return (
    <>
      <LoadingData status={status} items={items} />
      <Sort
        fields={PlanetsSortFields}
        activeType={sortType}
        setSortType={setSortType}
        activeField={sortField}
        setSortField={setSortField}
      />
      <ListElements
        items={items}
        renderItem={renderItem}
      />
    </>
  );
};

const mapStateToProps = (state: State) => ({
  status: PlanetsSelector.getPlanetsStatus(state),
  items: PlanetsSelector.getSortedPlanets(state),
  sortType: PlanetsSelector.getPlanetsSortType(state),
  sortField: PlanetsSelector.getPlanetsSortField(state),
});

const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  setSortType: (sortType: string) => {
    dispatch(PlanetsAction.setPlanetsSortType(sortType));
  },
  setSortField: (sortField: string) => {
    dispatch(PlanetsAction.setPlanetsSortField(sortField));
  },
});


export default connect(mapStateToProps, mapDispatchToPorops)(PlanetsPage);
