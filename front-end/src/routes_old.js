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

// ----------------------------------------------------------------------

export default function Router() {
  const [request, setRequest] = useState(undefined);
  const [isLoggedIn,] = useState(false);

  const cbLogin = (data) => {
    console.log("cbLogin()", data);
    setRequest({ type: 'login', login: { username: data.email, password: data.password } });
  }

  const cbLogout = () => {
    setRequest({ type: 'logout' });
  }

  const cbSearch = (key) => {
    setRequest({ type: 'search', keyword: key });
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
