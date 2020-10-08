import { combineReducers } from 'redux';
import NameSpace from './name-space';
import personsReducer from './persons/persons-reducer';
import planetsReducer from './planets/planets-reducer';
import starshipsReducer from './starships/starships-reducer';


const reducer = combineReducers({
  [NameSpace.PERSONS]: personsReducer,
  [NameSpace.PLANETS]: planetsReducer,
  [NameSpace.STARSHIPS]: starshipsReducer,
});


export default reducer;
