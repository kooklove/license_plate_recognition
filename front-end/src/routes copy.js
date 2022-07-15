import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Server from './pages/Server';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

const USE_MMVC = true;

Router.propTypes = {
  onRequest: PropTypes.func,
};
// ----------------------------------------------------------------------

export default function Router({ onRequest }) {
  const [request, setRequest] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cbLogin = (data) => {
    if (USE_MMVC) {
      onRequest({ type: 'login', login: { username: data.email, password: data.password } });
    } else {
      setRequest({ type: 'login', login: { username: data.email, password: data.password } });
    }
  }

  const cbLogout = () => {
    if (USE_MMVC) {
      onRequest({ type: 'logout' });
    } else {
      setRequest({ type: 'logout' });
    }
  }

  const cbSearch = (key) => {
    if (USE_MMVC) {
      onRequest({ type: 'search', keyword: key });
    } else {
      setRequest({ type: 'search', keyword: key });
    }
  }

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout onSearch={k => cbSearch(k)} onLogout={() => cbLogout()} />,
      children: [{ path: 'app', element: <DashboardApp request={request} /> },
      { path: 'user', element: <User /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: (isLoggedIn ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />) },
        { path: 'login', element: <Login onLogin={(k) => cbLogin(k)} /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/server',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/server', element: <Server /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
