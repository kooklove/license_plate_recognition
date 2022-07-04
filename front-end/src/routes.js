import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';


// ----------------------------------------------------------------------

export default function Router(props) {
  const [keyword, setKeyword] = useState(undefined);

  return useRoutes([ 
    {
      path: '/dashboard',
      element: <DashboardLayout onKeyword={k => setKeyword(k)} />,
      children: [{ path: 'app', element: <DashboardApp keyword={keyword} /> },
      { path: 'user', element: <User /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: (props.isLoggedIn ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />) },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
