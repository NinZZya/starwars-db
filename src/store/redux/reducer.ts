import { combineReducers } from 'redux';
import NameSpace from './name-space';
import { userReducer } from './user';
import { personsReducer } from './persons';
import { planetsReducer } from './planets';
import { starshipsReducer } from './starships';


const reducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.PERSONS]: personsReducer,
  [NameSpace.PLANETS]: planetsReducer,
  [NameSpace.STARSHIPS]: starshipsReducer,
});


export default reducer;
