import { IComments } from '../types';


interface IC {
  [key: string]: IComments;
}

const comments: IC = {
  planets: {
    '2': [
      {id: '1', rate: 3, user: {id: '3', login: 'Mike', avatar: ''}, review: 'Alderaan (/ˈɔːldərɑːn, -ræn/) is a fictional planet featured in the Star Wars franchise.'},
      {id: '2', rate: 4, user: {id: '2', login: 'John', avatar: ''}, review: 'In the original 1977 film,[a] Alderaan is destroyed by the Death Star superlaser.'},
    ],
  },
  persons: {
    '1': [
      {id: '3', rate: 4, user: {id: '1', login: 'Test', avatar: ''}, review: 'Luke Skywalker is a fictional character and the main protagonist of the original film trilogy of the Star Wars franchise created by George Lucas.'},
      {id: '4', rate: 3, user: {id: '4', login: 'Pit', avatar: ''}, review: 'The character also briefly appears in the prequel film Episode III – Revenge of the Sith as an infant.'},
    ],
    '4': [
      {id: '6', rate: 5, user: {id: '4', login: 'Pit', avatar: ''}, review: 'Darth Vader is a fictional character in the Star Wars franchise.'},
      {id: '7', rate: 5, user: {id: '2', login: 'John', avatar: ''}, review: 'Originally a slave on Tatooine, Anakin Skywalker is a Jedi prophesied to bring balance to the Force.'},
      {id: '8', rate: 5, user: {id: '3', login: 'Mike', avatar: ''}, review: 'Star Wars creator George Lucas has collectively referred to the first six episodic films of the franchise as "the tragedy of Darth Vader".'},
    ],
    '5': [
      {id: '5', rate: 4, user: {id: '1', login: 'Test', avatar: ''}, review: 'Princess Leia Organa[a][b] is a fictional character in the Star Wars franchise, portrayed in films by Carrie Fisher.'},
    ],
  },
  starships: {
    '9': [
      {id: '9', rate: 5, user: {id: '4', login: 'Test', avatar: ''}, review: 'The Death Star is a fictional mobile space station and galactic superweapon featured in the Star Wars space-opera franchise.'},
      {id: '10', rate: 5, user: {id: '2', login: 'John', avatar: ''}, review: 'The first version, which appears in the original 1977 film Star Wars.'},
      {id: '11', rate: 5, user: {id: '3', login: 'Mike', avatar: ''}, review: '] The buzzing sound counting down to the Death Star firing its superlaser comes from the Flash Gordon serials.'},
    ],
  },
};

export default comments;
