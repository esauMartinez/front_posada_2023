import { createBrowserRouter } from 'react-router-dom';
import { Tombola } from '../pages/Tombola';
import { Iniciar } from '../pages/Iniciar';
import { Ganadores } from '../pages/Ganadores';
import { Empleados } from '../pages/Empleados';
import Navbar from '../common/Navbar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Tombola />,
      },
      {
        path: '/iniciar',
        element: <Iniciar />,
      },
      {
        path: '/ganadores',
        element: <Ganadores />,
      },
      {
        path: '/empleados',
        element: <Empleados />,
      },
    ],
  },
]);
