import { createStore, applyMiddleware, compose } from 'redux'; // Importa 'compose'
import thunk from 'redux-thunk';
import rootReducer from '../reducer/rootReducer';

// Añade esta línea para habilitar Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
