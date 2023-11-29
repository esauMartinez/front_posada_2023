import { Socket, io } from 'socket.io-client';
import { Empleado } from '../models/empleado';

interface ServerToClients {
  ganador: (empleado: Empleado) => void;
  contador: (contador: number) => void;
  reiniciarTodo: () => void;
  iniciar: () => void;
  estatus: (estatus: number) => void;
}

const instance: Socket<ServerToClients> = io('http://192.168.4.17:1117');

export const socket = instance.connect();
