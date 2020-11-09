import React, { FC, ReactElement } from 'react';
import './row-three-col';


interface RowThreeColProp {
  first?: ReactElement | null;
  second?: ReactElement | null;
  third?: ReactElement | null;
}

const RowThreeCol: FC<RowThreeColProp> = (props) => {
  const { first, second, third } = props;

  return (
    <div className="row">
      <div className="col-sm-4">
        {first}
      </div>
      <div className="col-sm-4">
        {second}
      </div>
      <div className="col-sm-4">
        {third}
      </div>
    </div>
  );
};


export default RowThreeCol;
