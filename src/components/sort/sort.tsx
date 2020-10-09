import React, { FC } from 'react';
import { SortType } from '../../const';


interface P {
  activeType?: SortType;
}

const Sort: FC<P> = (props) => {
  const { activeType } = props;
  return (
    <div className="btn-group sort" role="group" aria-label="Basic example">
      <button
        type="button"
        className={`btn btn-secondary ${activeType === SortType.UP ? `active` : ``}`}
      >
        &#9650;
      </button>
      <button
        type="button"
        className={`btn btn-secondary ${activeType === SortType.DOWN ? `active` : ``}`}
      >
        &#9660;
      </button>
    </div>
  );
};


export default Sort;
