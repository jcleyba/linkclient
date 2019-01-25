import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Providers, Sales, Cash, Login } from '../pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const CustomRouter = () => (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Sales} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/providers" component={Providers} />
      <PrivateRoute path="/sales" component={Sales} />
      <PrivateRoute path="/cash" component={Cash} />
    </Switch>
  </div>
);

export default CustomRouter;
