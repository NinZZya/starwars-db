import ListItems from 'components/lists/list-elements';
import React from 'react';
import AppHeader from '../headers/app-header';
import RandomPlanet from '../random/random-planet';
import ListElements from '../lists/list-elements';
import DetailsPerson from '../details/details-person';

const App = () => {
  return (
    <div>
      <AppHeader />
      <RandomPlanet />

      <div className="row mb-2">
        <div className="col-mb-6">
          <ListElements />
        </div>
        <div className="col-mb-6">
          <DetailsPerson />
        </div>
      </div>
    </div>
  );
};

export default App;
