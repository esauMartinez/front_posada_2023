import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import { useTombolaStore } from '../store/tombola';
import { useEffect } from 'react';

const Navbar = () => {
  const setReiniciarTodo = useTombolaStore((state) => state.setReiniciarTodo);
  useEffect(() => {
    setReiniciarTodo();
  }, [setReiniciarTodo]);
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Navbar;
