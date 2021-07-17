import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../pages/dashboard/index'));
const StarterPage = React.lazy(() => import('../pages/StarterPage/index'));

const Login = React.lazy(() => import('../pages/Auth/Login'));
const Logout = React.lazy(() => import('../pages/Auth/Logout'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword'));
const Register = React.lazy(() => import('../pages/Auth/Register'));
const RecoverPassword = React.lazy(() =>
  import('../pages/Auth/RecoverPassword')
);

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/pages-starter', component: StarterPage },

  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/register', component: Register },
  { path: '/recover-password/:code/:email', component: RecoverPassword },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };
