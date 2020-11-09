import React, { FC } from 'react';
import { Spiner, ErrorMessage, Message} from '../../components';
import { DataStatus } from '../../constants/constants';
import './loading-data';

interface Item { [key: string]: string | number | boolean | Record<string, string | number | boolean> }
interface LoadingDataProp {
  status: DataStatus,
  items?: Item[],
}

const LoadingData: FC<LoadingDataProp> = (props) => {
  const { status, items } = props;

  if (status === DataStatus.LOADING) {
    return <Spiner />;
  }

  if (status === DataStatus.ERROR) {
    return <ErrorMessage />;
  }

  if (items !== undefined) {
    return !items.length ? <Message title={"No data"} /> : null;
  }

  return null;
};


export default LoadingData;
