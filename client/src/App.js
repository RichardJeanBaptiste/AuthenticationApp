import { React } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Test1 from './components/Test1';



function App() {
  

  return (
      <Router>
        <Switch>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/">
              <Test1/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/profile/:id">
            <Profile/>
          </Route>
          <Route path="/edit/:id">
            <EditProfile/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
