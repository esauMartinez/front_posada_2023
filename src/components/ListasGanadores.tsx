import '../assets/style/ListaGanadores.scss';
import { useTombolaStore } from '../store/tombola';
import { useEffect } from 'react';
import Card from './Card';

export const ListaGanadores = () => {
  const getGanadores = useTombolaStore((state) => state.getGanadores);
  const ganadores = useTombolaStore((state) => state.ganadores);

  useEffect(() => {
    getGanadores();
  }, [getGanadores]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {ganadores.map((x, index) => (
            <div className="col-lg-4 col-md-4 col-sm-12" key={index}>
              <Card
                nombre={x.nombre}
                departamento={x.departamento}
                regalo={x.regalo?.numero}
                idr={x.idr}
                key={index}
                tombola={false}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
