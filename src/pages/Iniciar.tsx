import '../assets/style/Iniciar.scss';
import { useTombolaStore } from '../store/tombola';

export const Iniciar = () => {
  const iniciar = useTombolaStore((state) => state.iniciar);
  return (
    <>
      <div className="inicializador">
        <button className="btn-inicializador" onClick={() => iniciar()}>
          <i className="fa-solid fa-play"></i>
        </button>
      </div>
    </>
  );
};
