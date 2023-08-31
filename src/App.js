import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
