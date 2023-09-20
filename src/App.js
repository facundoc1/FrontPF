import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Form from './components/Form/Form'; 
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Contact from './components/Contact/Contact';
import Sale from './components/Sale/Sale';
import Footer from './components/Footer/Footer';
import AddProduct from './components/AddProduct/AddProduct';
import ProductDetail from './components/ProductDetail/ProductDetail'
import UserProfile from './components/Profile/Profile'

import { loginSuccess } from './Redux/actions/actions_login';
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, verificarTokenEnRuta, renewToken } from './Redux/actions/actions_auth'




function App() {
  const dispatch = useDispatch();
  const [sessionExpired, setSessionExpired] = useState(false);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  useEffect(() => {
    const verifyAndRenewToken = async () => {
      try {
        if (isAuthenticated) { 
          console.log('autenticación correcta')
          const userData = await verificarTokenEnRuta();
          if (userData) {
            dispatch(loginSuccess(userData));
          } else {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
              const response = await renewToken(refreshToken);
              const newAccessToken = response.data.newAccessToken;
              dispatch(loginSuccess({ accessToken: newAccessToken }));
              setAccessToken(newAccessToken);
            } else {
              setSessionExpired(true);
            }
          }
        }
      } catch (error) {
        console.error('Error al verificar o renovar el token al cargar la aplicación:', error);
      }
    };

    verifyAndRenewToken();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (sessionExpired) {
      window.location.href = '/login';
    }
  }, [sessionExpired]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registro" component={Form} />
          <Route path="/profile" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/sale" component={Sale} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/userProfile/:id" component={UserProfile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;