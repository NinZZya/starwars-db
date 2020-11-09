import React, { FC } from 'react';
import { ItemDetails, ItemDetail } from '../../../components';
import { ItemDetail as ItemDetailType, Starship, Item } from '../../../constants/types';
import './starship-details';


interface StarshipItem extends ItemDetailType, Item {};
interface StarshipDetailsProp {
  item: StarshipItem
}

const renderCost = (item: Starship) => item.costInCredits !== -1 ?  `${item.costInCredits} credits`  : 'unknow';
const renderLength = (item: Starship) => item.length !== -1 ?  `${item.length} m` : 'unknow';
const renderCrew = (item: Starship) => item.crew !== -1 ?  item.crew : 'unknow';
const renderPassengers = (item: Starship) => item.passengers !== -1 ?  item.passengers : 'unknow';
const renderCargoCapacity = (item: Starship) => item.cargoCapacity !== -1 ?  item.cargoCapacity : 'unknow';

const StarshipDetails: FC<StarshipDetailsProp> = (props) => {
  const { item } = props;

  return (
    <ItemDetails item={item} >
      <ItemDetail field="model" label="Model:" />
      <ItemDetail field="manufacturer" label="Manufacturer:" />
      <ItemDetail field="costInCredits" label="Cost In Credits:" renderItem={renderCost} />
      <ItemDetail field="length" label="Length:" renderItem={renderLength} />
      <ItemDetail field="crew" label="Crew:" renderItem={renderCrew} />
      <ItemDetail field="passengers" label="Passengers:" renderItem={renderPassengers} />
      <ItemDetail field="cargoCapacity" label="Cargo Capacity:" renderItem={renderCargoCapacity} />
    </ItemDetails>
  );
};

export default StarshipDetails;
