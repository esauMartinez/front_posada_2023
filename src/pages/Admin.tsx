import Opciones from '../components/Opciones';
import BotonReiniciar from '../components/BotonReiniciar';
import { BotonIniciar } from '../components/BotonIniciar';
import { useTombolaStore } from '../store/tombola';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import '../assets/style/Ganadores.scss';

const Admin = () => {
  const contador = useTombolaStore((store) => store.contador);
  const estatus = useTombolaStore((store) => store.estatus);
  const usuario = useAuthStore((state) => state.usuario);
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

          {estatus !== 3 && <BotonIniciar />}

          {usuario.rol === 'administrador' && <BotonReiniciar />}
        </div>
      </section>
    </>
  );
};

export default Admin;
