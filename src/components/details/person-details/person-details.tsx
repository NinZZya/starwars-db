import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';
import { personFields } from '../../../const';


interface P {
  item: IItem
}

// Without name field
const fields = personFields.slice(1, personFields.length);

const PersonDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      {fields.map((item) => (
        <ItemDetail field={item.field} label={`${item.label}:`} key={item.field} />
      ))}
    </ItemDetails>
  );
};


export default PersonDetails;
