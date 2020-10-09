import { combineReducers } from 'redux';
import NameSpace from './name-space';
import userReducer from './user/user-reducer';
import personsReducer from './persons/persons-reducer';
import planetsReducer from './planets/planets-reducer';
import starshipsReducer from './starships/starships-reducer';


const reducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.PERSONS]: personsReducer,
  [NameSpace.PLANETS]: planetsReducer,
  [NameSpace.STARSHIPS]: starshipsReducer,
});


export default reducer;
