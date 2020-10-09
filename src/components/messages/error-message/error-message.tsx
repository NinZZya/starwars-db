import React, { FC, ReactElement, Children } from 'react';

interface IText {
  text: string,
}

interface P {
  title?: string;
  text?: string;
  children?: ReactElement | ReactElement[];
}

export const ErrorMessageTitle: FC<IText> = ({text}) => <p className="boom">{text}</p>;
export const ErrorMessageText: FC<IText> = ({text}) => <span>{text}</span>;

const ErrorMessage: FC<P> = (props) => {
  const { title, text, children } = props;
  const texts = text ? text.split('\n') : null;


  return (
    <div className="error-message">
      <img src="/img/death-star.png" alt="error icon" />
      {title ? <ErrorMessageTitle text={title} /> : null}
      {texts ? texts.map((item) => <ErrorMessageText text={item} />) : null}
      {children ? Children.map(children, (child) => child)  : null}
    </div>
  );
};

ErrorMessage.defaultProps = {
  title: 'BOOM!',
  text: 'something has gone terribly wrong \n (but we already sent droids to fix it)',
}

export default ErrorMessage;
