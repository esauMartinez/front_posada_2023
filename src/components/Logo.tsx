import { useEffect } from 'react';
import logo from '../../public/300.png';
import { useTombolaStore } from '../store/tombola';
import CardRuleta from './CardRuleta';

export const Logo = () => {
  const empleados = useTombolaStore((store) => store.empleados);
  const estatus = useTombolaStore((store) => store.estatus);
  const contador = useTombolaStore((store) => store.contador);
  const getEmpleados = useTombolaStore((store) => store.getEmpleados);
  const getOpciones = useTombolaStore((store) => store.getOpciones);
  const setContador = useTombolaStore((store) => store.setContador);

  useEffect(() => {
    getEmpleados();
    getOpciones();
    setContador();
    
  }, [getEmpleados, getOpciones, setContador, contador]);

  return (
    <>
      <img src={logo} alt="logo tsm connect" width={'60%'} />

      {contador > 0 && contador <= 3 ? (
        <section className="section-contador">
          <p className="contador">{contador}</p>
        </section>
      ) : (
        ''
      )}

      {estatus === 0 || estatus === 2 ? (
        <section className="section-ruleta">
          {empleados.map((x, index) => (
            <CardRuleta
              nombre={x.nombre}
              departamento={x.departamento}
              regalo={x.regalo?.numero}
              idr={x.idr}
              key={index}
              tombola={true}
            />
          ))}
        </section>
      ) : (
        ''
      )}
    </>
  );
};
