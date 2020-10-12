import React, { FC } from 'react';
import ItemDetails from '../item-details';
import ItemDetail from '../item-details/components/item-detail';
import Rate from '../../rate/rate';
import { IItem, IStarship } from '../../../types';


interface P {
  item: IItem
}

const renderCost = (item: IStarship) => item.costInCredits !== -1 ?  `${item.costInCredits} credits`  : 'unknow';
const renderLength = (item: IStarship) => item.length !== -1 ?  `${item.length} m` : 'unknow';
const renderCrew = (item: IStarship) => item.crew !== -1 ?  item.crew : 'unknow';
const renderPassengers = (item: IStarship) => item.passengers !== -1 ?  item.passengers : 'unknow';
const renderCargoCapacity = (item: IStarship) => item.cargoCapacity !== -1 ?  item.cargoCapacity : 'unknow';
const renderRate = (item: IStarship) => <Rate rate={item.rate} />;

const StarshipDetails: FC<P> = (props) => {
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
      <ItemDetail field="rate" label="Rate:" renderItem={renderRate} />
    </ItemDetails>
  );
};

export default StarshipDetails;
