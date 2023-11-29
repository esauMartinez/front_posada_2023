import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTombolaStore } from '../store/tombola';

const Opciones = () => {
  const opcionesRifa = useTombolaStore((state) => state.opcionesRifa);
  const estatus = useTombolaStore((state) => state.estatus);
  const putOpciones = useTombolaStore((state) => state.putOpciones);

  const [tiempo, setTiempo] = useState<string>(opcionesRifa.timepo_segundos);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    opcionesRifa.timepo_segundos = tiempo;
    putOpciones(opcionesRifa);
  };

  interface Estatus {
    text: string;
    color: string;
  }

  const verificarEstatus = (estatus: number): Estatus => {
    if (estatus === 0) {
      return { text: 'Sin iniciar', color: 'alert-danger' };
    } else if (estatus === 1) {
      return { text: 'Curso', color: 'alert-success' };
    } else {
      return { text: 'Pausa', color: 'alert-warning' };
    }
  };

  useEffect(() => {
    setTiempo(opcionesRifa.timepo_segundos);
  }, [opcionesRifa.timepo_segundos]);

  const handleChangeTimepo = (e: ChangeEvent<HTMLInputElement>) => {
    setTiempo(e.currentTarget.value);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Opciones de rifa</h5>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                <label htmlFor="" className="form-label">
                  Tiempo
                </label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="timepo_segundos"
                  value={tiempo}
                  onChange={(e) => handleChangeTimepo(e)}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div
                  className={'alert' + ' ' + verificarEstatus(estatus).color}
                  role="alert"
                >
                  Rifa en estatus{': '}
                  <strong>{verificarEstatus(estatus).text}</strong>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Guardar opciones
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Opciones;
