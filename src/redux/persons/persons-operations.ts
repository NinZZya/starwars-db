import { Dispatch } from 'redux';
import { setPersonComments, setPersons, setPersonsCommentStatus, setPersonsStatus } from './persons-actions';
import { IComment, IPersons, TId, TSwapiServices } from '../../types';
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

export const loadPersonCommentsAsync = (id: TId) => (dispatch: Dispatch, getItems: () => void, api: TSwapiServices) => {
  dispatch(setPersonsCommentStatus(LoadingStatus.LOADING));

  return api.getPersonComments(id)
  .then((comments: IComment[]) => {
    dispatch(setPersonsCommentStatus(LoadingStatus.SUCCESS));
    dispatch(setPersonComments(comments));
  })
  .catch(() => {
    dispatch(setPersonsStatus(LoadingStatus.ERROR));
  });
}
