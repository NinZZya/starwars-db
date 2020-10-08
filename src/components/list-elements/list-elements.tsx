import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TId } from '../../types';
import { AppPath } from 'const';

interface TItem {
  id: TId;
  name: string;
};

interface P {
  items: Array<TItem>,
  path: AppPath;
}

const ListElements: FC<P> = (props) => {
  const { items, path } = props;

  return (
    <div className="item-list list-group">
      {items.map((item: TItem) => (
        <Link
          to={`${path}${item.id}`}
          key={`list-element-${item.id}`}
        >
          <div className="list-group-item">
              {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};


export default ListElements;
