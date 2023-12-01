import { useEffect } from 'react';
import { useTombolaStore } from '../store/tombola';

const Contador = () => {
  const setContador = useTombolaStore((state) => state.setContador);
  const contador = useTombolaStore((store) => store.contador);

  useEffect(() => {
    setContador();
  }, [setContador]);

  return (
    <>
      {contador > 0 && contador <= 3 ? (
        <section className="section-contador animate__animated animate__zoomIn">
          <p className="contador">{contador}</p>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Contador;
