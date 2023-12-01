import { Ganadores } from '../components/Ganadores';
import { useTombolaStore } from '../store/tombola';
import { useEffect } from 'react';
import Confeti from '../components/Confeti';
import EndPage from '../components/EndPage';
import '../assets/style/Ganadores.scss';

export const Seleccionados = () => {
  const setGanador = useTombolaStore((state) => state.setGanador);
  const setReiniciarTodo = useTombolaStore((state) => state.setReiniciarTodo);
  const ganador = useTombolaStore((state) => state.ganador);
  useEffect(() => {
    setGanador();
    setReiniciarTodo();
  }, [setGanador, setReiniciarTodo]);

  return (
    <>
      <section className="section-ganadores">
        <Ganadores />

        {ganador.nombre !== '' && <Confeti />}

        <EndPage show={true} />
      </section>
    </>
  );
};
