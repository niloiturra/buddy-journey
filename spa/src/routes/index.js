import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { authProtectedRoutes, publicRoutes } from './routes';

import NonAuthLayout from '../layouts/NonAuth';
import AuthLayout from '../layouts/AuthLayout/';

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !localStorage.getItem('authUser')) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

const Routes = (props) => {
  return (
    <BrowserRouter>
      <>
        <Suspense fallback={<div></div>}>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={AuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
              />
            ))}
          </Switch>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routes;
