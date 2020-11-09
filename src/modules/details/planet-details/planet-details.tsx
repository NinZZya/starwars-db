import React, { FC } from 'react';
import { ItemDetails, ItemDetail } from '../../../components';
import { ItemDetail as ItemDetailType, Planet, Item } from '../../../constants/types';
import './planet-details';


interface PlanetItem extends ItemDetailType, Item {};
interface PelanetDetailsProp {
  item: PlanetItem
}

const renderPopulation = (item: Planet) => item.population !== -1 ?  item.population : 'unknow';
const renderRotationPeriod = (item: Planet) => item.rotationPeriod !== -1 ?  `${item.rotationPeriod} km` : 'unknow';
const renderOrbitalPeriod = (item: Planet) => item.orbitalPeriod !== -1 ?  `${item.orbitalPeriod} km` : 'unknow';
const renderDiameter = (item: Planet) => item.diameter !== -1 ?  `${item.diameter} km` : 'unknow';
const renderSurfaceWater = (item: Planet) => item.surfaceWater !== -1 ?  item.surfaceWater : 'unknow';

const PelanetDetails: FC<PelanetDetailsProp> = (props) => {
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
    </ItemDetails>
  );
};


export default PelanetDetails;
