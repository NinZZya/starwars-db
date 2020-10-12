import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import Rate from '../../rate/rate';
import { IItem, IPlanet } from '../../../types';


interface P {
  item: IItem
}

const renderPopulation = (item: IPlanet) => item.population !== -1 ?  item.population : 'unknow';
const renderRotationPeriod = (item: IPlanet) => item.rotationPeriod !== -1 ?  `${item.rotationPeriod} km` : 'unknow';
const renderOrbitalPeriod = (item: IPlanet) => item.orbitalPeriod !== -1 ?  `${item.orbitalPeriod} km` : 'unknow';
const renderDiameter = (item: IPlanet) => item.diameter !== -1 ?  `${item.diameter} km` : 'unknow';
const renderSurfaceWater = (item: IPlanet) => item.surfaceWater !== -1 ?  item.surfaceWater : 'unknow';
const renderRate = (item: IPlanet) => <Rate rate={item.rate} />;

const PelanetDetails: FC<P> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="population" label="Population:" renderItem={renderPopulation} />
      <ItemDetail field="rotationPeriod" label="Rotation Period:" renderItem={renderRotationPeriod} />
      <ItemDetail field="orbitalPeriod" label="Orbital Period:" renderItem={renderOrbitalPeriod} />
      <ItemDetail field="diameter" label="Diameter:" renderItem={renderDiameter} />
      <ItemDetail field="climate" label="Climate:" />
      <ItemDetail field="gravity" label="Gravity:" />
      <ItemDetail field="surfaceWater" label="Surface Water:" renderItem={renderSurfaceWater} />
      <ItemDetail field="terrain" label="Terrain:" />
      <ItemDetail field="rate" label="Rate:" renderItem={renderRate} />
    </ItemDetails>
  );
};


export default PelanetDetails;
