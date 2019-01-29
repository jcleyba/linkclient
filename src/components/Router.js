import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  Providers,
  Products,
  Cash,
  Login,
  AddProduct,
  AddProvider,
  AddSale,
} from '../pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      {props =>
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
    </Route>
  );
};

const ProductRoutes = props => {
  return (
    <Switch>
      <PrivateRoute exact path={`${props.match.path}`} component={Products} />
      <PrivateRoute path={`${props.match.path}/add`} component={AddProduct} />
    </Switch>
  );
};

const ProviderRoutes = props => {
  return (
    <Switch>
      <PrivateRoute exact path={`${props.match.path}`} component={Providers} />
      <PrivateRoute path={`${props.match.path}/add`} component={AddProvider} />
    </Switch>
  );
};

const CustomRouter = () => (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={AddSale} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/products" component={ProductRoutes} />
      <PrivateRoute path="/providers" component={ProviderRoutes} />
      <PrivateRoute path="/cash" component={Cash} />
    </Switch>
  </div>
);

export default CustomRouter;
