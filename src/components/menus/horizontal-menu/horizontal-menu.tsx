import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface IItem {
  name: string;
  path: string;
  onClickItem?: () => void;
}

interface P {
  items: IItem[];
}

const HorizontalMenu: FC<P> = (props) => {
  const { items } = props;
  return (
    <ul className="d-flex menu">
      {items.map((item, index) => (
        <li
          key={`menu-item-${index}`}
          className="menu-item"
        >
          <Link to={item.path}
            className="menu-item-link"
            onClick={item.onClickItem}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};


export default HorizontalMenu;
