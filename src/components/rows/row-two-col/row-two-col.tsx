import React, { FC, ReactElement } from 'react';


interface P {
  first?: ReactElement | null;
  second?: ReactElement | null;
}

const RowTwoCol: FC<P> = (props) => {
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
