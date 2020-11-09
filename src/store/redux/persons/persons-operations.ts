import { Dispatch } from 'redux';
import { setPersons, setPersonsStatus } from './persons-actions';
import { Persons, Api } from '../../../constants/types';
import { DataStatus } from '../../../constants/constants';


export const loadPersonsAsync = () => (dispatch: Dispatch, getState: () => void, api: Api) => {

  return api.getPersons()
    .then((items: Persons) => {
      dispatch(setPersonsStatus(DataStatus.SUCCESS));
      dispatch(setPersons(items));
    })
    .catch(() => {
      dispatch(setPersonsStatus(DataStatus.ERROR));
    });
};
