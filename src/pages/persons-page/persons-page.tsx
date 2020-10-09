import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import ListElements from '../../components/list-elements';
import PersonDetails from '../../components/details/person-details';
import Spiner from '../../components/spiner';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName } from '../../const';
import { IPersons, TId } from '../../types';


interface P {
  status: LoadingStatus,
  items: IPersons,
}

interface IParams {
  [IdName.PERSON]: string;
}

interface IMatch {
  params: IParams;
}

const getItemDetails = (props: P, activeId: TId) => {
  const { status, items: persons } = props;
  const isNull = (status === LoadingStatus.LOADING) ||
    !Object.values(props.items).length;

  if (isNull) {
    return null;
  }

  if (!activeId) {
    return <div>Select person</div>;
  }

  const person = persons[activeId];

  if (!person) {
    return <div>No data</div>;
  }

  return <PersonDetails item={person} />;
};


const getListPersons = (props: P) => {
  const { status } = props;

  if (status === LoadingStatus.LOADING) {
    return <Spiner />;
  }

  if (status === LoadingStatus.ERROR) {
    return <ErrorMessage />;
  }

  const persons = Object.values(props.items);

  if (!persons.length) {
    return <div>No data</div>;
  }

  return (
    <ListElements
      items={persons}
      path={AppPath.PERSONS}
    />
  );
}

const PersonsPage: FC<P> = (props) => {
  const personsPath = `${AppPath.PERSONS}:${IdName.PERSON}`;
  const personsMatch: IMatch | null = useRouteMatch(personsPath);
  const activeId = personsMatch ?
    personsMatch.params[IdName.PERSON] :
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


export default PersonsPage;
