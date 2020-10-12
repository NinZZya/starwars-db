import { Dispatch } from 'redux';
import { setPersons, setPersonsStatus } from './persons-actions';
import { IPersons, TSwapiServices } from '../../types';
import { LoadingStatus } from '../../const';


export const loadPersonsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {

  return api.getPersons()
    .then((items: IPersons) => {
      dispatch(setPersonsStatus(LoadingStatus.SUCCESS));
      dispatch(setPersons(items));
    })
    .catch(() => {
      dispatch(setPersonsStatus(LoadingStatus.ERROR));
    });
};
