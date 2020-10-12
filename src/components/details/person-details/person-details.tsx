import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import Rate from '../../rate/rate';
import { IItem, IPerson } from '../../../types';


interface P {
  item: IItem
}

const renderHeight = (item: IPerson) => item.height !== -1 ?  `${item.height} cm`: 'unknow';
const renderMass = (item: IPerson) => item.mass !== -1 ?  `${item.mass} kg` : 'unknow';
const renderRate = (item: IPerson) => <Rate rate={item.rate} />;

const PersonDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="gender" label="Gender:" />
      <ItemDetail field="birthYear" label="Birth Year:" />
      <ItemDetail field="height" label="Height:" renderItem={renderHeight} />
      <ItemDetail field="mass" label="Mass:" renderItem={renderMass} />
      <ItemDetail field="rate" label="Rate:"renderItem={renderRate} />
    </ItemDetails>
  );
};


export default PersonDetails;
