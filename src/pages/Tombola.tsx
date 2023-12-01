import { Logo } from '../components/Logo';
import { Ganadores } from '../components/Ganadores';
import { useCallback, useEffect } from 'react';
import { loadSlim } from 'tsparticles-slim';
import { Engine } from 'tsparticles-engine';
import { useTombolaStore } from '../store/tombola';
import Particles from 'react-particles';
import Confeti from '../components/Confeti';
import Contador from '../components/Contador';
import Ruleta from '../components/Ruleta';
import EndPage from '../components/EndPage';
import '../assets/style/Tombola.scss';
import Fin from '../components/Fin';

export const Tombola = () => {
  const getGanadores = useTombolaStore((state) => state.getGanadores);
  const setGanador = useTombolaStore((state) => state.setGanador);
  const setReiniciarTodo = useTombolaStore((state) => state.setReiniciarTodo);
  const getOpciones = useTombolaStore((state) => state.getOpciones);
  const setEstatus = useTombolaStore((state) => state.setEstatus);
  const ganador = useTombolaStore((state) => state.ganador);
  const estatus = useTombolaStore((state) => state.estatus);

  useEffect(() => {
    getGanadores();
    setGanador();
    setReiniciarTodo();
    getOpciones();
    setEstatus();
  }, [
    // estatus,
    getGanadores,
    setGanador,
    setReiniciarTodo,
    getOpciones,
    setEstatus,
  ]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        url="../../public/particles.json"
        init={particlesInit}
      />

      <div className="tombola">
        <section
          className={
            estatus === 0 || estatus === 3
              ? 'logo-100'
              : 'logo animate__fadeOutLeft'
          }
        >
          <Logo />

          {estatus === 1 || estatus === 2 ? <Ruleta /> : ''}
        </section>

        <Contador />

        <Fin estatus={estatus} />

        {ganador.nombre !== '' && <Confeti />}

        {estatus === 1 && (
          <section className="ganadores">
            <Ganadores />
            <EndPage show={false} />
          </section>
        )}
      </div>
    </>
  );
};
