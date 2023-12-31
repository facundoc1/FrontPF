import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux'; // Importa el Provider de React Redux
import store from './Redux/store/store'; 

axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}> {/* Configura el Provider con tu store */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
