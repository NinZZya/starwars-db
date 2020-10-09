import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import ListElements from '../../components/list-elements';
import StarshipDetails from '../../components/details/starship-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName } from '../../const';
import * as Type from '../../types';


interface P {
  status: LoadingStatus;
  items: Type.IStarship[];
  getItem: Type.TGetStarship;
}

interface IParams {
  [IdName.STARSHIP]: string;
}

interface IMatch {
  params: IParams;
}

const getItemDetails = (props: P, activeId: Type.TId) => {
  const { status, items: starships, getItem } = props;
  const isNull = (status === LoadingStatus.LOADING) ||
    !starships.length;

  if (isNull) {
    return null;
  }

  if (!activeId) {
    return <div>Select straship</div>;
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
      path={AppPath.STARSHIPS}
    />
  );
}

const StarshipsPage: FC<P> = (props) => {
  const starshipsPath = `${AppPath.STARSHIPS}:${IdName.STARSHIP}`;
  const starshipMatch: IMatch | null = useRouteMatch(starshipsPath);
  const activeId = starshipMatch ?
    starshipMatch.params[IdName.STARSHIP] :
    '';

  const itemsDetails = getItemDetails(props, activeId);
  const listItems = getListPersons(props);

  return (
    <>
      <RowTwoCol
        first={listItems}
        second={itemsDetails}
      />
    </>
  );
};


export default StarshipsPage;
