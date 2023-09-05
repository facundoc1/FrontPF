import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Form from './components/Form/Form'; 
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Contact from './components/Contact/Contact';
import Sale from './components/Sale/Sale';

import AddProduct from './components/AddProduct/AddProduct';
import Footer from './components/Footer/Footer';

function App() {
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
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
