import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  Providers,
  Products,
  CashFlow,
  Login,
  AddProduct,
  AddProvider,
  AddSale,
  CashOut,
} from '../pages';
import AddCashOut from '../pages/AddCashOut';

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
      <PrivateRoute
        path={`${props.match.path}/add/:id`}
        component={AddProduct}
      />
      <PrivateRoute path={`${props.match.path}/add`} component={AddProduct} />
    </Switch>
  );
};

const CashOutRoutes = props => {
  return (
    <Switch>
      <PrivateRoute exact path={`${props.match.path}`} component={CashOut} />
      <PrivateRoute
        path={`${props.match.path}/add/:id`}
        component={AddCashOut}
      />
      <PrivateRoute path={`${props.match.path}/add`} component={AddCashOut} />
    </Switch>
  );
};

const ProviderRoutes = props => {
  return (
    <Switch>
      <PrivateRoute exact path={`${props.match.path}`} component={Providers} />
      <PrivateRoute
        path={`${props.match.path}/add/:id`}
        component={AddProvider}
      />
      <PrivateRoute
        path={`${props.match.path}/:id/products`}
        component={Products}
      />
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
      <PrivateRoute path="/cash-flow" component={CashFlow} />
      <PrivateRoute path="/cash-out" component={CashOutRoutes} />
    </Switch>
  </div>
);

export default CustomRouter;
