import React, { FC, ReactNode } from 'react';


type TI= Array<ReactNode>;
type TF = (item?: any) => ReactNode;

interface P {
  items: TI,
  renderItem?: TF | undefined;
}

const renderItems = (items: TI, renderItem?: TF) => items.map((item, index) => (
  <li
    key={`list-element-${index}`}
  >
    <div className="list-group-item">
      {renderItem ? renderItem(item) : item}
    </div>
  </li>
))

const ListElements: FC<P> = (props) => {
  const { items, renderItem } = props;

  return (
    <ul className="item-list list-group">
      {renderItems(items, renderItem)}
    </ul>
  );
};


export default ListElements;
