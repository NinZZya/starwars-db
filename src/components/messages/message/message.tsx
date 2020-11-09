import React, { Children, FC, ReactNode } from 'react';
import './message';


type Text = Record<string, string>;

interface MessageProp {
  title?: string;
  text?: string;
  cildren?: ReactNode;
}

export const MessageTitle: FC<Text> = ({text}) => <p className="h3">{text}</p>;
export const MessageText: FC<Text> = ({text}) => <span>{text}</span>;

const Message: FC<MessageProp> = (props) => {
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
