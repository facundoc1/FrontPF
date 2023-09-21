import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Form from './components/Form/Form';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Contact from './components/Contact/Contact';
import Sale from './components/Sale/Sale';
import Footer from './components/Footer/Footer';
import AddProduct from './components/AddProduct/AddProduct';
import ProductDetail from './components/ProductDetail/ProductDetail';
import UserProfile from './components/Profile/Profile';
import AdminDashboard from './components/Profile/AdminDashboard';
import PaymentPage from './components/Payment/Payment';
import PaymentGateway from './components/Payment/Payment_gateway';
import { loginSuccess } from './Redux/actions/actions_login';
import { getUserIdFromToken } from './Redux/actions/actions_auth';
import { getUserProfile } from './Redux/actions/actions_profile';
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, verificarTokenEnRuta, renewToken } from './Redux/actions/actions_auth';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  useEffect(() => {

    const verifyAndRenewToken = async () => {
      try {
        console.log(localStorage)
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (accessToken && refreshToken) {
          const verifyToken = await verificarTokenEnRuta();
          if (verifyToken) {
            const userId = getUserIdFromToken(accessToken);
            const userData = await dispatch(getUserProfile(userId));
            if (userData) {
              dispatch(loginSuccess(userData));
            }
          } else {
            const response = await renewToken(refreshToken);
            const newAccessToken = response.data.newAccessToken;
            dispatch(loginSuccess({ accessToken: newAccessToken }));
            setAccessToken(newAccessToken);
          }
        }
      } catch (error) {
        console.error('Error al verificar o renovar el token al cargar la aplicación:', error);
      }
    };

    verifyAndRenewToken();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/registro" component={Form} />
          <Route path="/profile" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/sale" component={Sale} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/userProfile/:id" component={UserProfile} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/payment-gateway" component={PaymentGateway} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
