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

export default function Router(props) {
  const [request, setRequest] = useState(undefined);

  const onLogin = (data) => {
    setRequest({ type: 'login', login: { username: data.email, password: data.password } });
  }

  const onLogout = () => {
    console.log("Router, logout")
    setRequest({ type: 'logout' });
  }

  const onSearch = (key) => {
    setRequest({ type: 'search', keyword: key });
  }

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout onSearch={k => onSearch(k)} onLogout={() => onLogout()} />,
      children: [{ path: 'app', element: <DashboardApp request={request} /> },
      { path: 'user', element: <User /> },
      { path: 'server', element: <Server /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: (props.isLoggedIn ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />) },
        { path: '/server', element: <Navigate to="/dashboard/server" /> },
        { path: 'login', element: <Login onLogin={(k) => onLogin(k)} /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
