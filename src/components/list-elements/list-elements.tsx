import React, { FC, ReactNode } from 'react';

interface Item {
  [key: string]: string | number | Record<string, string | number>;
}

type RenderItem = (item: Item) => ReactNode;

interface ListElementsProp {
  items: Item[],
  renderItem?: RenderItem;
}

const renderItems = (items: Item[], renderItem?: RenderItem) => {
  if (items.length) {
    return items.map((item, index) => {

      return (
        <li
          key={`list-element-${index}`}
        >
          <div className="list-group-item">
            {renderItem ? renderItem(item) : item}
          </div>
        </li>
      )
    })
  }

}

const ListElements: FC<ListElementsProp> = (props) => {
  const { items, renderItem } = props;

  return (
    <ul className="item-list list-group">
      {renderItems(items, renderItem)}
    </ul>
  );
};


export default ListElements;
