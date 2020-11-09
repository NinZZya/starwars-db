import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app';
import store from './store/store';
import { loadPersonsAsync } from './store/redux/persons/persons-operations';
import { loadPlanetsAsync } from './store/redux/planets/planets-operations';


store.dispatch(loadPersonsAsync());
store.dispatch(loadPlanetsAsync());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
