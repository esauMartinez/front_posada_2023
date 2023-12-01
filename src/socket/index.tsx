import { Socket, io } from 'socket.io-client';
import { Empleado } from '../models/empleado';
import { dev, url, url_prod } from '../helpers/axiosInstance';

interface ServerToClients {
  ganador: (empleado: Empleado) => void;
  contador: (contador: number) => void;
  reiniciarTodo: () => void;
  iniciar: () => void;
  estatus: (estatus: number) => void;
}

const instance: Socket<ServerToClients> = io(dev ? url : url_prod);

export const socket = instance.connect();
