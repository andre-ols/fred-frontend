import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        return(
        <Route {...rest} render={props =>  (
            <Redirect to={{ pathname: '/', state: { from: props.location}}} />
        )}/>
        );
    }
    const parts = token.split(' ');
    if(parts.length !== 2) {
        return(
            <Route {...rest} render={props =>  (
                <Redirect to={{ pathname: '/', state: { from: props.location}}} />
            )}/>
        );
    }
    const scheme  = parts[0];
    if(!/^Bearer$/i.test(scheme)) {
        return(
            <Route {...rest} render={props =>  (
                <Redirect to={{ pathname: '/', state: { from: props.location}}} />
            )}/>
        );
    }
    return(
        <Route {...rest} render={props => (
            <Component {...props} />
        )}/>
    );
}

export default PrivateRoute;