import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';

interface P {
  item: IItem
}

const PersonDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="gender" label="Gender:" />
      <ItemDetail field="birthYear" label="Birth Year:" />
      <ItemDetail field="height" label="Height:" />
      <ItemDetail field="mass" label="Mass:" />
    </ItemDetails>
  );
};

export default PersonDetails;
