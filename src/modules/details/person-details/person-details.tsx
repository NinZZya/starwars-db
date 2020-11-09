import React, { FC } from 'react';
import { ItemDetails, ItemDetail } from '../../../components';
import { ItemDetail as ItemDetailType, Person, Item } from '../../../constants/types';

interface PersonItem extends ItemDetailType, Item {};
interface PersonDetailsProp {
  item: PersonItem
}

const renderHeight = (item: Person) => {
  const { height } = item as Person;
  return height !== -1 ?  `${height} cm`: 'unknow'
};

const renderMass = (item: Person) => {
  const { mass } = item as Person;
  return mass !== -1 ?  `${mass} kg`: 'unknow'
};

const PersonDetails: FC<PersonDetailsProp> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="gender" label="Gender:" />
      <ItemDetail field="birthYear" label="Birth Year:" />
      <ItemDetail field="height" label="Height:" renderItem={renderHeight} />
      <ItemDetail field="mass" label="Mass:" renderItem={renderMass} />
    </ItemDetails>
  );
};


export default PersonDetails;
