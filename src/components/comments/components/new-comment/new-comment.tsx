import React, { FC } from 'react';
import { MAX_RATE } from '../../../../const';



interface P {
  onSubmitComment: (arg?: any) => void;
}


const RateItem = (props: {name: string, rate: number}) => {
  const {name, rate} = props;
  return (
    <>
    <input type="radio" id={`rate-${rate}`} name={name} value={rate} className="rate-input sr-only" />
    <label htmlFor={`rate-${rate}`} className="rate-label"></label>
  </>
  );
}

const RateList = () => {

  return (
    <div className="rate-list-stars d-flex">
      {new Array(MAX_RATE)
            .fill('rate-list-star')
            .map((item, index) => {
              const value: number = MAX_RATE - index;
              return (
                <RateItem name={item} rate={value} key={`${item}-${value}`} />
              );
            })}
    </div>
  );
}


const NewComment: FC<P> = (props) => {
  const {onSubmitComment} = props;

  return (
    <form className="new-comment" onSubmit={onSubmitComment}>
      <div className="form-group">
        <RateList />
        <textarea className="form-control" id="comment-tex" rows={5}></textarea>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}


export default NewComment;
