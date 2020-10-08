import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';

interface P {
  item: IItem
}

const StarshipDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="model" label="Model:" />
      <ItemDetail field="manufacturer" label="Manufacturer:" />
      <ItemDetail field="costInCredits" label="Cost In Credits:" />
      <ItemDetail field="length" label="Length:" />
      <ItemDetail field="crew" label="Crew:" />
      <ItemDetail field="passengers" label="Passengers:" />
      <ItemDetail field="cargoCapacity" label="Cargo Capacity:" />
    </ItemDetails>
  );
};

export default StarshipDetails;
