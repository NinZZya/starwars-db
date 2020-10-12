import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import store from './store';
import { loadPersonsAsync } from './redux/persons/persons-operations';
import { loadPlanetsAsync } from './redux/planets/planets-operations';
import './main.scss';


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
