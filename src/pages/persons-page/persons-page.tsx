import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RowTwoCol from '../../components/rows/row-two-col';
import Sort from '../../components/sort';
import ListElements from '../../components/list-elements';
import PersonDetails from '../../components/details/person-details';
import Spiner from '../../components/spiner';
import Message from '../../components/messages/message';
import ErrorMessage from '../../components/messages/error-message';
import { AppPath, LoadingStatus, IdName } from '../../const';
import { IPerson, TId } from '../../types';


interface P {
  status: LoadingStatus;
  items: IPerson[];
  getItem: (id: TId) => IPerson;
}

interface IParams {
  [IdName.PERSON]: string;
}

interface IMatch {
  params: IParams;
}

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
    <>
      <Sort />
      <ListElements
        items={persons}
        path={AppPath.PERSONS}
      />
    </>
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
