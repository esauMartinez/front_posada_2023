import axios from 'axios';
import { produce } from 'immer';
import { create } from 'zustand';

interface Departamento {
  id: number;
  nombre: string;
}

interface Regalo {
  id: number;
  numero: number;
}

export interface Empleado {
  id: number;
  nombre: string;
  seleccionado: boolean;
  departamento: Departamento;
  regalo: Regalo;
}

interface TombolaState {
  empleados: Empleado[];
  ganadores: Empleado[];
  getGanadores: () => void;
  getEmpleados: () => void;
  iniciar: () => void;
  insertarGanador: (ganador: Empleado) => void;
}

const instance = axios.create({
  baseURL: 'http://localhost:1117',
});
// usar get para acceder a los demas metodos o funciones en el strore
export const useTombolaStore = create<TombolaState>()((set /*get*/) => ({
  empleados: [],
  ganadores: [],
  getGanadores: async () => {
    await instance
      .get('/ganadores')
      .then(({ data }) => {
        set(() => ({ ganadores: data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getEmpleados: async () => {
    await instance
      .get('/empleados')
      .then(({ data }) => {
        set(() => ({ empleados: data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  iniciar: async () => {
    await instance
      .get('/iniciar')
      .then(({ data }) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  insertarGanador: (ganador: Empleado) => {
    set(
      produce((draft) => {
        draft.ganadores.push(ganador);
      })
    );
  },
}));
