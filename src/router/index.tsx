import { createBrowserRouter } from 'react-router-dom';
import { Tombola } from '../pages/Tombola';
import { Seleccionados } from '../pages/Seleccionados';
import { Empleados } from '../pages/Empleados';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Navbar from '../common/Navbar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: '/admin/empleados',
        element: <Empleados />,
      },
    ],
  },
  {
    path: '/rifa',
    element: <Tombola />,
  },

  {
    path: '/ganadores',
    element: <Seleccionados />,
  },
]);
