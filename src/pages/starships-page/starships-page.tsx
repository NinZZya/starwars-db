import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import ListElements from '../../components/list-elements';
import StarshipDetails from '../../components/details/starship-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName } from '../../const';
import { IStarships, TId } from '../../types';


interface P {
  status: LoadingStatus,
  items: IStarships,
}

interface IParams {
  [IdName.STARSHIP]: string;
}

interface IMatch {
  params: IParams;
}

const getItemDetails = (props: P, activeId: TId) => {
  const { status, items: starships } = props;
  const isNull = (status === LoadingStatus.LOADING) ||
    !Object.values(props.items).length;

  if (isNull) {
    return null;
  }

  if (!activeId) {
    return <div>Select straship</div>;
  }

  const starship = starships[activeId];

  if (!starship) {
    return <div>No data</div>;
  }

  return <StarshipDetails item={starship} />;
};


const getListPersons = (props: P) => {
  const { status } = props;

  if (status === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (status === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  const starships = Object.values(props.items);

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
