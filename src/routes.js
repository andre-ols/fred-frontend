import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function Routes(){
    return(
        <Switch>
        <Route path="/" exact component={Login}/>
        <PrivateRoute path="/dashboard" component={Dashboard}/>
        </Switch>
    );
}

export default Routes;