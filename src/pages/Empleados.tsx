import { useEffect } from 'react';
import { useTombolaStore } from '../store/tombola';
import '../assets/style/ListaGanadores.scss';

export const Empleados = () => {
  const empleados = useTombolaStore((state) => state.empleados);
  const getEmpleados = useTombolaStore((state) => state.getEmpleados);
  useEffect(() => {
    getEmpleados();
  }, [getEmpleados]);
  return (
    <>
      <section className="section-empleados mt-5">
        <div className="container">
          <table className="table table-bordered" id="myTable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Departamento</th>
                {/* <th>Foto</th> */}
                <th>Regalo</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((x) => (
                <tr
                  key={x.id}
                  className={x.seleccionado ? 'table-warning' : ''}
                >
                  <td>{x.nombre}</td>
                  <td>{x.departamento}</td>
                  {/* <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        className="avatar"
                        src={`https://www.tsmconnect.com/empleados_tsmconnect/${x.idr}.jpg`}
                        alt="avatar"
                        width={'100px'}
                        height={'100px'}
                      />
                    </div>
                  </td> */}
                  <td>{x.regalo?.numero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
