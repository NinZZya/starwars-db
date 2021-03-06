import React, { FC, ReactNode, Children } from 'react';
import './error-message';


type Text = Record<string, string>;

interface ErrorMessageProp {
  title?: string;
  text?: string;
  children?: ReactNode;
}

export const ErrorMessageTitle: FC<Text> = ({text}) => <p className="boom">{text}</p>;
export const ErrorMessageText: FC<Text> = ({text}) => <span>{text}</span>;

const ErrorMessage: FC<ErrorMessageProp> = (props) => {
  const { title, text, children } = props;
  const texts = text ? text.split('\n') : null;

  return (
    <div className="error-message">
      <img src="/img/death-star.png" alt="error icon" />
      {title ? <ErrorMessageTitle text={title} /> : null}
      {texts ? texts.map((item, index) => <ErrorMessageText text={item} key={`text-error-${index}`} />) : null}
      {children ? Children.map(children, (child) => child)  : null}
    </div>
  );
};

ErrorMessage.defaultProps = {
  title: 'BOOM!',
  text: 'something has gone terribly wrong \n (but we already sent droids to fix it)',
}


export default ErrorMessage;
