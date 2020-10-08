import React, { FC } from 'react';
// import { IPerson, IPlanet, TId, TKeyPlanet, TKeyPerson } from 'types';


interface P {
  item?: {[key: string]: string | number};
  field: string;
  label: string;
}

export const ItemDetail: FC<P> = (props) => {
  const { item, field, label } = props;

  if (!item) {
    return null;
  }

  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>
        {item[field] !== -1 ? item[field] : 'unknown'}
        </span>
    </li>
  );
}


export default ItemDetail;
