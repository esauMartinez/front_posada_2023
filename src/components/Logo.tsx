import { useEffect, useState } from 'react';
import logo from '../../public/300.png';
import { socket } from '../socket';
// import { useTombolaStore } from '../store/tombola';

export const Logo = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const contadorInterval = () => {
      setInterval(() => {
        console.log('se le quita');
        setContador(contador - 1);
      }, 1000);
    };
    
    socket.on('inicio', () => {
      setContador(3);
      contadorInterval()
    });
  }, [contador]);

  return (
    <>
      <img src={logo} alt="logo tsm connect" width={'60%'} />
      {contador !== 0 && <p className="text-white contador">{contador}</p>}
    </>
  );
};
