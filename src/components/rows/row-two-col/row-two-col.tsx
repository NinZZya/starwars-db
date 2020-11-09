import React, { FC, ReactElement } from 'react';
import './row-two-col';


interface RowTwoColProp {
  first?: ReactElement | null;
  second?: ReactElement | null;
}

const RowTwoCol: FC<RowTwoColProp> = (props) => {
  const { first, second } = props;

  return (
    <div className="row mb-2">
      <div className="col-md-6">
        {first}
      </div>
      <div className="col-md-6">
        {second}
      </div>
    </div>
  );
};


export default RowTwoCol;
