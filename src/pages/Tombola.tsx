import { Logo } from '../components/Logo';
import { ListaGanadores } from '../components/ListasGanadores';
import '../assets/style/Tombola.scss';
// import Particles from 'react-particles';
import { /*useCallback,*/ useEffect, useRef } from 'react';
// import { loadSlim } from 'tsparticles-slim';
// import { Engine } from 'tsparticles-engine';
import { useTombolaStore } from '../store/tombola';
import Confeti from '../components/Confeti';

export const Tombola = () => {
  const getGanadores = useTombolaStore((state) => state.getGanadores);
  const setGanador = useTombolaStore((state) => state.setGanador);
  const setReiniciarTodo = useTombolaStore((state) => state.setReiniciarTodo);
  const getOpciones = useTombolaStore((state) => state.getOpciones);
  const setEstatus = useTombolaStore((state) => state.setEstatus);
  const nuevo_ganador = useTombolaStore((state) => state.nuevo_ganador);
  const ganador = useTombolaStore((state) => state.ganador);
  const estatus = useTombolaStore((state) => state.estatus);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGanador();
    setReiniciarTodo();
    getGanadores();
    getOpciones();
    setEstatus();
    if (bottomRef.current && nuevo_ganador !== 0) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [
    getGanadores,
    getOpciones,
    setGanador,
    setReiniciarTodo,
    setEstatus,
    nuevo_ganador,
  ]);

  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadSlim(engine);
  // }, []);

  return (
    <>
      {/* <Particles
        id="tsparticles"
        url="../../public/particles.json"
        init={particlesInit}
      /> */}

      <div className="tombola">
        <section className={estatus === 0 ? 'logo-100' : 'logo'}>
          <Logo />
        </section>

        {ganador.nombre !== '' && <Confeti />}

        {estatus === 0 && (
          <section className="ganadores">
            <ListaGanadores />
            <div ref={bottomRef}>.</div>
          </section>
        )}
      </div>
    </>
  );
};
