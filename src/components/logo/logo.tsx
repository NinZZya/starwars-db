import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './logo.css';


interface LogoProp {
  path: string;
}

const Logo: FC<LogoProp> = (props) => {
  const {path} = props;
  return (
    <Link to={path} >
      <img src="/img/star-wars.svg" alt="logo" width="100" height="45"></img>
    </Link>
  );
};


export default Logo;
