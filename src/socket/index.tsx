import { Socket, io } from 'socket.io-client';
import { Empleado } from '../store/tombola';

interface ServerToClients {
  ganador: (empleado: Empleado) => void;
  inicio: () => void;
}

const instance: Socket<ServerToClients> = io('http://localhost:1117');

export const socket = instance.connect();
