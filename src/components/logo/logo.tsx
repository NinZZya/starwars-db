import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface P {
  path: string;
}

const Logo: FC<P> = (props) => {
  const {path} = props;
  return (
    <Link to={path} >
      <img src="/img/star-wars.svg" alt="logo" width="100" height="45"></img>
    </Link>
  );
};


export default Logo;
