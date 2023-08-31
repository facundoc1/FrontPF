import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Contact from './components/Contact/Contact';
import Sale from './components/Sale/Sale';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="*" component={NavBar}/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/sale" component={Sale}/>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
