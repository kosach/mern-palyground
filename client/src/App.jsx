import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Signup, Login} from './components/auth';
import {Provider} from 'react-redux';

import store from './store';
import Alert from './components/layout/Alert';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/layout/Navbar';
import Main from './components/layout/Main';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
  <Provider store={store}>
    <Router>
      <div className="App">
        <MainNavBar />
        <Route exact path='/' component={ Main }/>
        <section>
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Switch>
        </section>
      </div>
    </Router>
  </Provider>
)};

export default App;
