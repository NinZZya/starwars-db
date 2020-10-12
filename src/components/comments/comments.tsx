import React, { FC } from 'react';
import ListElements from '../list-elements'
import Rate from '../rate';
import Message from '../messages/message';
import { IComment } from '../../types';


interface P {
  items: IComment[];
}

const renderComment = (comment: IComment) => {
  return (
    <div>
      <p className="h5">
        {comment.user.login}
      </p>
      <p>
        <Rate rate={comment.rate} />
      </p>
      <p>
        {comment.review}
      </p>
    </div>
  );
}

const Comments: FC<P> = (props) => {
  const { items } = props;

  return (
    <div className="jumbotron comments">
      <p className="h4">
        Comments
      </p>
      {items.length ?
        <ListElements items={items} renderItem={renderComment} /> :
        <Message title='No comments' />}
    </div>
  );
};

export default Comments;
