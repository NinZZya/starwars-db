import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';
import { PlanetsFields } from '../../../const';


interface P {
  item: IItem
}

const fields = Object.keys(PlanetsFields);

const PelanetDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      {fields.slice(1, fields.length).map((field: string) => (
        <ItemDetail field={field} label={`${PlanetsFields[field]}:`} key={field} />
      ))}
    </ItemDetails>
  );
};


export default PelanetDetails;
