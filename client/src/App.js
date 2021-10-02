/**
 *  TODO
 *  - Create Breakpoints for mobile login/reg
 *  - Add Login Page
 *  - Create Personal Info
 *  - Create Personal Info mobile
 */


import { React } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';




function App() {
  

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
