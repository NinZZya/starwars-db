import React, { FC, ReactNode } from 'react';
import './item-detail.css';


type TF = (item?: any) => ReactNode;

interface P {
  item?: {[key: string]: string | number};
  renderItem?: TF | undefined;
  field: string;
  label: string;
}

export const ItemDetail: FC<P> = (props) => {
  const { item, field, label, renderItem } = props;

  if (!item) {
    return null;
  }

  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>
        {renderItem ? renderItem(item) : item[field]}
      </span>
    </li>
  );
}


export default ItemDetail;
