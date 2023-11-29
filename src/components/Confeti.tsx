import confeti from '../../public/confeti.gif';
import '../assets/style/confeti.scss';
import { useTombolaStore } from '../store/tombola';

const Confeti = () => {
  const ganador = useTombolaStore((state) => state.ganador);
  return (
    <>
      <div className="confeti-container animate__animated animate__zoomIn">
        <img src={confeti} alt="confeti" height={'100%'} width={'100%'} />
        <div className="ganador-container">
          <p className="text-ganador">Nuevo ganador </p>
          <p className="text-ganador">{ganador.nombre}</p>
          <p className="text-ganador">{ganador.departamento}</p>
        </div>
      </div>
    </>
  );
};

export default Confeti;
