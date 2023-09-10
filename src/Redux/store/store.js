import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Importa Redux Thunk
import rootReducer from '../reducer/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk)); // Agrega Redux Thunk como middleware

export default store;
