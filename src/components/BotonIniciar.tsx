import '../assets/style/Iniciar.scss';
import { useTombolaStore } from '../store/tombola';

export const BotonIniciar = () => {
  const iniciar = useTombolaStore((state) => state.iniciar);
  const estatus = useTombolaStore((state) => state.estatus);

  const verificarEstatus = (estatus: number) => {
    if (estatus === 0 || estatus === 2) {
      return <i className="fa-solid fa-play"></i>;
    } else if (estatus === 1) {
      return <i className="fa-solid fa-pause"></i>;
    }
  };

  return (
    <>
      <div className="card mt-5 mb-5">
        <div className="card-body">
          <div className="card-title">
            <h5>Boton iniciar-pausar rifa</h5>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className={
                estatus === 0 || estatus === 2
                  ? 'btn-inicializador-play btn-inicializador'
                  : 'btn-inicializador-pause btn-inicializador'
              }
              onClick={() => iniciar()}
            >
              {verificarEstatus(estatus)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
