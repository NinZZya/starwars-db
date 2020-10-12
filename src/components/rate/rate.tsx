import React, { FC } from 'react';
import { MAX_RATE } from '../../const';



interface P{
  rate: number;
}

const renderRate = (rate: number) => Array(MAX_RATE).fill(`rate`).map((item, index) => {
  if (index < Math.floor(rate)) {
    return <span key={`${item}-${index}`} className="rate-item rate-fill"></span>;
  }

  if (index < Math.round(rate)) {
    return <span key={`${item}-${index}`} className="rate-item rate-half"></span>;
  }

  return <span key={`${item}-${index}`} className="rate-item"></span>;
});

const Rate: FC<P> = (props) => {
  const { rate } = props;

  return (
    <span className="rate">
      <span className="sr-only">{rate}</span>
      <span className="rate-list">{renderRate(rate)}</span>
    </span>
  )
};


export default Rate;
