import React, { FC, Children, cloneElement, ReactElement } from 'react';
import { IItem } from '../../../types';

interface P {
  item: IItem;
  children?: Array<ReactElement>;
}

const ItemDetails: FC<P> = (props) => {
  const { item, children } = props;
  const { image, name } = item;

  return (
    <div className="item-details card">
      {image ? (
        <div className="item-image">
          <img
          src={image}
          alt={`image ${name}`}
        >
        </img>
        </div>

      ):
        null}


      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {children ?
            Children.map(children, (child) => {
              return cloneElement(child, { item });
            }) :
            null}
        </ul>
      </div>
    </div>
  );
};


export default ItemDetails;
