import '../assets/style/ListaGanadores.scss';
import Opciones from '../components/Opciones';
import Reiniciar from '../components/Reiniciar';
import { Iniciar } from '../components/Iniciar';
import { useTombolaStore } from '../store/tombola';
import { useEffect } from 'react';

const Admin = () => {
  const contador = useTombolaStore((store) => store.contador);
  const getOpciones = useTombolaStore((state) => state.getOpciones);
  const setEstatus = useTombolaStore((state) => state.setEstatus);

  useEffect(() => {
    getOpciones();
    setEstatus();
  }, [getOpciones, setEstatus, contador]);

  return (
    <>
      <section className="section-admin mt-5">
        <div className="container">
          <Opciones />
          <Iniciar />
          <Reiniciar />
        </div>
      </section>
    </>
  );
};

export default Admin;
