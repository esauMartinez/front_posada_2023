import { useEffect } from 'react';
import { useTombolaStore } from '../store/tombola';


export const Empleados = () => {
  const empleados = useTombolaStore((state) => state.empleados);
  const getEmpleados = useTombolaStore((state) => state.getEmpleados);
  useEffect(() => {
    getEmpleados();
  }, [getEmpleados]);
  return (
    <>
      <div className="container mt-5 mb-5">
        <table className="table table-bordered" id='myTable'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Regalo</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((x) => (
              <tr key={x.id}>
                <td>{x.nombre}</td>
                <td>{x.departamento?.nombre}</td>
                <td>{x.regalo?.numero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
