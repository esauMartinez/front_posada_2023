import { Logo } from '../components/Logo';
import { ListaGanadores } from '../components/ListasGanadores';
import '../assets/style/Tombola.scss';
import Particles from 'react-particles';
import { useCallback, useEffect } from 'react';
import { loadSlim } from 'tsparticles-slim';
import { Engine } from 'tsparticles-engine';
import { useTombolaStore } from '../store/tombola';

export const Tombola = () => {
  const getGanadores = useTombolaStore((state) => state.getGanadores);
  const ganadores = useTombolaStore((state) => state.ganadores);
  
  useEffect(() => {
    getGanadores();
  }, [getGanadores]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // const particlesLoaded = useCallback(
  //   async (container: Container | undefined) => {
  //     await console.log(container);
  //   },
  //   []
  // );

  return (
    <>
      <Particles
        id="tsparticles"
        url="../../public/particles.json"
        init={particlesInit}
        // loaded={particlesLoaded}
      />

      <div className="tombola">
        <section className={ganadores.length === 0 ? 'logo-100' : 'logo'}>
          <Logo />
        </section>
        {ganadores.length !== 0 && (
          <section className="ganadores">
            <ListaGanadores />
          </section>
        )}
      </div>
    </>
  );
};
