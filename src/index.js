import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux'; // Importa el Provider de React Redux
import store from './Redux/store/store'; 


axios.defaults.baseURL = 'https://grtech.onrender.com/';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-c4244ab4-dc76-40b7-b5cf-9b18b0b6bed0');
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
