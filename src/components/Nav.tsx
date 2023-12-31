import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/style/Nav.scss';
import { useAuthStore } from '../store/auth';
import { useEffect } from 'react';

const Nav = () => {
  const logged = useAuthStore((state) => state.logged);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate('/');
    }
  }, [logged, navigate]);

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TSM Connect
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to={'/admin'}>
                  Opciones
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/admin/empleados'}>
                  Empleados
                </NavLink>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => logout()}
            >
              Salir
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Nav;
