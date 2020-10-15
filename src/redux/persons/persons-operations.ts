import { Dispatch } from 'redux';
import { setPersonComments, setPersons, setPersonsCommentStatus, setPersonsStatus } from './persons-actions';
import { IComment, IPersons, TId, TSwapiServices } from '../../types';
import { DataStatus } from '../../const';


export const loadPersonsAsync = () => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {

  return api.getPersons()
    .then((items: IPersons) => {
      dispatch(setPersonsStatus(DataStatus.SUCCESS));
      dispatch(setPersons(items));
    })
    .catch(() => {
      dispatch(setPersonsStatus(DataStatus.ERROR));
    });
};

export const loadPersonCommentsAsync = (id: TId) => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {
  dispatch(setPersonsCommentStatus(DataStatus.LOADING));

  return api.getPersonComments(id)
  .then((comments: IComment[]) => {
    dispatch(setPersonsCommentStatus(DataStatus.SUCCESS));
    dispatch(setPersonComments(comments));
  })
  .catch(() => {
    dispatch(setPersonsStatus(DataStatus.ERROR));
  });
}
