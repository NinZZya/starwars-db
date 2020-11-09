import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Sort, RowTwoCol, ListElements, Message } from '../../components';
import { StarshipDetails, LoadingData } from '../../modules';
import { StarshipsAction, StarshipsSelector} from '../../store/redux/starships';
import { AppPath, DataStatus, IdName, StarshipsSortFields } from '../../constants/constants';
import { Id, Item, ItemDetail, State, DispatchAsync } from '../../constants/types';

interface StarshipItem extends ItemDetail, Item { };

interface Match {
  params: Record<IdName.STARSHIP, string>;
}

interface Prop {
  status: DataStatus;
  items: ItemDetail[];
  getItem: (id: Id) => ItemDetail;
  sortType: string;
  setSortType: (sortType: string) => void;
  sortField: string;
  setSortField: (sortFiled: string) => void;
  match: Match;
}

type StarshipScreenProp = Prop & RouteComponentProps;

const SORT_FIELDS_KEYS = Object.keys(StarshipsSortFields);
const LAST_FIELD_INDEX = SORT_FIELDS_KEYS.length - 2;

const renderItem = (item: ItemDetail) => (
  <Link to={`${AppPath.STARSHIPS}${item.id}`}>
    <p className="h4">{item.name}</p>
    ({SORT_FIELDS_KEYS.slice(1, SORT_FIELDS_KEYS.length).map((key, index) => (
      <span key={`${key}-${index}`}>
        <small>
          {`${StarshipsSortFields[key]}: ${item[key] !== -1 ?
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

const getItemDetails = (props: StarshipScreenProp, activeId: Id) => {
  const { status, items: starships, getItem } = props;
  const isNull = (status === DataStatus.LOADING) ||
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

  return <StarshipDetails item={starship as StarshipItem} />;
};


const getListStarships = (props: StarshipScreenProp) => {
  const { status, items } = props;

  return (
    <>
      <LoadingData status={status} items={items} />
      <ListElements
        items={items}
        renderItem={renderItem}
      />
    </>
  );
}

const StarshipsScreen: FC<StarshipScreenProp> = (props) => {
  const {
    sortType,
    setSortType,
    sortField,
    setSortField,
    match,
  } = props;

  const activeId = match ?
    match.params[IdName.STARSHIP] :
    '';

  const itemsDetails = getItemDetails(props, activeId);
  const listItems = getListStarships(props);

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

const mapStateToProps = (state: State) => ({
  status: StarshipsSelector.getStarshipsStatus(state),
  items: StarshipsSelector.getSortedStarships(state),
  sortType: StarshipsSelector.getStarshipsSortType(state),
  sortField: StarshipsSelector.getStarshipsSortField(state),
  getItem: (id: Id) => StarshipsSelector.getStarship(state, id),
});


const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  setSortType: (sortType: string) => {
    dispatch(StarshipsAction.setStarshipsSortType(sortType));
  },
  setSortField: (sortField: string) => {
    dispatch(StarshipsAction.setStarshipsSortField(sortField));
  },
});


export { StarshipsScreen };
export default withRouter(
  connect(mapStateToProps, mapDispatchToPorops)(StarshipsScreen)
);
