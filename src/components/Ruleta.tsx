import { useEffect } from 'react';
import { useTombolaStore } from '../store/tombola';
import Card from './Card';

const Ruleta = () => {
  const empleados = useTombolaStore((store) => store.empleados);
  const scrollStatus = useTombolaStore((store) => store.scrollStatus);
  const getEmpleados = useTombolaStore((store) => store.getEmpleados);

  useEffect(() => {
    getEmpleados();
  }, [getEmpleados]);

  const verificarScrollStatus = (scrollStatus: boolean): string => {
    if (scrollStatus) {
      return 'scrollNames';
    }
    return '';
  };

  return (
    <>
      <section className="section-ruleta">
        <div className="animation-container">
          <div
            className={`name-container ${verificarScrollStatus(scrollStatus)}`}
          >
            {empleados.map((x, index) => (
              <Card
                nombre={x.nombre}
                departamento={x.departamento}
                regalo={x.regalo?.numero}
                idr={x.idr}
                key={index}
                tombola={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Ruleta;
