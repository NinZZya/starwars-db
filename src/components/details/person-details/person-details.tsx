import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';
import { personFields } from '../../../const';


interface P {
  item: IItem
}

const PersonDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      {personFields.map((item) => (
        <ItemDetail field={item.field} label={`${item.label}:`} key={item.field} />
      ))}
    </ItemDetails>
  );
};

export default PersonDetails;
