import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import { IItem } from '../../../types';

interface P {
  item: IItem
}

const PelanetDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="population" label="Population:" />
      <ItemDetail field="rotationPeriod" label="Rotation Period:" />
      <ItemDetail field="orbitalPeriod" label="Orbital Period:" />
      <ItemDetail field="diameter" label="Diameter:" />
      <ItemDetail field="climate" label="Climate:" />
      <ItemDetail field="gravity" label="Gravity:" />
      <ItemDetail field="surfaceWater" label="Surface Water:" />
      <ItemDetail field="terrain" label="Terrain:" />
    </ItemDetails>
  );
};


export default PelanetDetails;
