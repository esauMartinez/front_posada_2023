import { ListaGanadores } from '../components/ListasGanadores';
import '../assets/style/ListaGanadores.scss';
import { useTombolaStore } from '../store/tombola';
import { useEffect, useRef } from 'react';
import Confeti from '../components/Confeti';

export const Ganadores = () => {
  const setGanador = useTombolaStore((state) => state.setGanador);
  const setReiniciarTodo = useTombolaStore((state) => state.setReiniciarTodo);
  const ganador = useTombolaStore((state) => state.ganador);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setGanador();
    setReiniciarTodo();
  }, [setGanador, setReiniciarTodo]);

  const scrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  return (
    <>
      <section className="section-ganadores">
        <ListaGanadores />

        {ganador.nombre !== '' && <Confeti />}

        <button className="scroll-down" onClick={() => scrollDown()}>
          <i className="fa fa-arrow-down"></i>
        </button>

        <div ref={bottomRef}>.</div>
      </section>
    </>
  );
};
