import '../assets/style/Iniciar.scss';
import { useTombolaStore } from '../store/tombola';

export const Iniciar = () => {
  const iniciar = useTombolaStore((state) => state.iniciar);
  const estatus = useTombolaStore((state) => state.estatus);

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
              {estatus === 1 ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
