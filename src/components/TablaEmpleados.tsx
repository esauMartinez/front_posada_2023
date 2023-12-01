import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useTombolaStore } from '../store/tombola';
import '../assets/style/Ganadores.scss';

const TablaEmpleados = () => {
  const empleados = useTombolaStore((state) => state.empleados);
  const getEmpleados = useTombolaStore((state) => state.getEmpleados);
  const putEmpleado = useTombolaStore((state) => state.putEmpleado);
  const usuario = useAuthStore((state) => state.usuario);

  useEffect(() => {
    getEmpleados();
  }, [getEmpleados]);

  return (
    <>
      <section className="section-empleados mt-5">
        <div className="container">
          <table className="table table-bordered table-hover" id="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Departamento</th>
                <th>Regalo</th>
                {usuario.rol === 'administrador' && <th></th>}
              </tr>
            </thead>
            <tbody>
              {empleados.map((x) => (
                <tr
                  key={x.id}
                  className={x.seleccionado ? 'table-success' : ''}
                >
                  <td>{x.id}</td>
                  <td>{x.nombre}</td>
                  <td>{x.departamento}</td>
                  <td>{x.regalo?.numero}</td>
                  {usuario.rol === 'administrador' && (
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className={`btn ${
                            x.gana === false ? 'btn-danger' : 'btn-success'
                          }`}
                          onClick={() => putEmpleado(x)}
                        >
                          {x.gana ? 'Gana' : 'No gana'}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default TablaEmpleados;
