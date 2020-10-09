import React, { Children, FC, ReactNode } from 'react';
import { IText } from '../../../types';


interface P {
  title?: string;
  text?: string;
  cildren?: ReactNode;
}

export const MessageTitle: FC<IText> = ({text}) => <p className="h3">{text}</p>;
export const MessageText: FC<IText> = ({text}) => <span>{text}</span>;

const Message: FC<P> = (props) => {
  const { title, text, children } = props;

  return (
    <div className="jumbotron">
      {title ? <MessageTitle text={title} /> : null}
      {text ? <MessageText text={text} /> : null}
      {children ? Children.map(children, (child) => child) : null}
    </div>
  );
};


export default Message;
