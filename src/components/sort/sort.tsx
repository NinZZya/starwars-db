import React, { FC } from 'react';
import withAtiveFlag from '../../hocs/with-active-flag';
import { SortType } from '../../const';


interface P {
  isActive?: boolean;
  onActiveChange?: () => void;
  activeType?: string;
  activeField: string;
  fields: { [key: string]: string };
  setSortType: (sortType: string) => void;
  setSortField: (sortField: string) => void;
}

const Sort: FC<P> = (props) => {
  const {
    activeType, activeField, fields,
    setSortType, setSortField,
    isActive, onActiveChange,
  } = props;

  return (
    <div className="sort d-flex">
      <span className="sort-label">Sorting by</span>
      <div className="dropdown sort-fields">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button" id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={onActiveChange}
        >
          {fields[activeField]}
        </button>
        <div className={`dropdown-menu ${isActive ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
          {Object.keys(fields).map((field) => (
            <span
              className="dropdown-item"
              key={field}
              onClick={() => {
                setSortField(field);
                if (onActiveChange) {
                  onActiveChange();
                }
              }}
            >
              {fields[field]}
            </span>
          ))}
        </div>
      </div>
      <div className="btn-group sort-btn-group" role="group" aria-label="Sorting button">
        {Object.keys(SortType).map((item) => (
          <button
            key={item}
            type="button"
            className={`btn btn-secondary ${activeType === SortType[item] ? `active` : ``}`}
            onClick={() => setSortType(SortType[item])}
          >
            {SortType[item]}
          </button>
        ))}

      </div>
    </div>

  );
};


export default withAtiveFlag<P>(Sort, false);
