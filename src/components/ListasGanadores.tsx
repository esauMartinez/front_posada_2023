import '../assets/style/ListaGanadores.scss';
import { Empleado, useTombolaStore } from '../store/tombola';
import avatar from '../../public/defaul-avatar.png';
import { useEffect } from 'react';
import { socket } from '../socket';

export const ListaGanadores = () => {
  const getGanadores = useTombolaStore((state) => state.getGanadores);
  const insertarganador = useTombolaStore((state) => state.insertarGanador);
  const ganadores = useTombolaStore((state) => state.ganadores);

  useEffect(() => {
    console.log('se conecta al docket');
    const connectSocketGanador = () => {
      socket.on('ganador', (ganador: Empleado) => {
        insertarganador(ganador);
      });
    };

    connectSocketGanador();

    getGanadores();
  }, [getGanadores, insertarganador]);

  return (
    <>
      <div className="container-fluid p-3">
        <div className="row">
          {ganadores.map((x, index) => (
            <div className="col-lg-4 col-md-4 col-sm-12" key={index}>
              <div className="card">
                <div className="card-body">
                  <img
                    className="avatar"
                    src={avatar}
                    alt="avatar"
                    width="100%"
                  ></img>
                  <h5 className="card-title">{x?.nombre.toUpperCase()}</h5>
                  <p className="card-text">
                    {x.departamento?.nombre} <br /> Regalo: {x.regalo?.numero}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
