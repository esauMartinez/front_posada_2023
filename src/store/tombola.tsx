import { produce } from 'immer';
import { create } from 'zustand';
import { question, success } from '../helpers/message';
import { socket } from '../socket';
import { Empleado } from '../models/empleado';
import { OpcionesRifa } from '../models/opcionesRifa';
import { instance } from '../helpers/axiosInstance';

interface TombolaState {
  empleados: Empleado[];
  ganadores: Empleado[];
  ganador: Empleado;
  opcionesRifa: OpcionesRifa;
  contador: number;
  nuevo_ganador: number;
  estatus: number;
  getGanadores: () => void;
  getEmpleados: () => void;
  getOpciones: () => void;
  iniciar: () => void;
  setContador: () => void;
  setGanador: () => void;
  setGanadorObject: () => void;
  reiniciarTodo: () => void;
  setReiniciarTodo: () => void;
  setEstatus: () => void;
  putOpciones: (opciones: OpcionesRifa) => void;
}

// usar get para acceder a los demas metodos o funciones en el strore
export const useTombolaStore = create<TombolaState>()((set, get) => ({
  empleados: [],
  ganadores: [],
  ganador: {
    id: 0,
    nombre: '',
    seleccionado: false,
    departamento: '',
    idr: '',
    regalo: {
      id: 0,
      numero: 0,
    },
  },
  contador: 0,
  nuevo_ganador: 0,
  estatus: 0,
  opcionesRifa: {
    id: 0,
    estatus: 0,
    timepo_segundos: '',
  },
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
  getOpciones: async () => {
    await instance
      .get('/opciones')
      .then(({ data }) => {
        set(() => ({ opcionesRifa: data.data, estatus: data.data.estatus }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  putOpciones: async (opciones: OpcionesRifa) => {
    await instance
      .put('/opciones', opciones)
      .then(({ data }) => {
        success(data.data);
        get().getOpciones();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  iniciar: async () => {
    const title = 'Estas por iniciar la rifa';
    const text = 'Deseas continuar?';
    const response = await question({ title, text });
    if (response) {
      socket.emit('iniciar');
    }
  },
  setContador: async () => {
    socket.on('contador', (contador: number) => {
      set(
        produce((draft) => {
          draft.contador = contador;
        })
      );
    });
  },
  setGanador: () => {
    socket.on('ganador', (ganador: Empleado) => {
      set(
        produce((draft) => {
          draft.nuevo_ganador += 1;
          draft.ganadores.push(ganador);
          draft.ganador = ganador;
          setTimeout(() => {
            get().setGanadorObject();
          }, 4000);
        })
      );
    });
  },
  setGanadorObject: () => {
    set(
      produce((draft) => {
        draft.ganador = {
          id: 0,
          nombre: '',
          seleccionado: false,
          departamento: '',
          idr: '',
          regalo: {
            id: 0,
            numero: 0,
          },
        };
      })
    );
  },
  reiniciarTodo: async () => {
    const title = 'Estas seguro?';
    const text = 'No podras revertir esto!';
    const respuesta = await question({ title, text });
    if (respuesta) {
      await instance
        .get('/reiniciar-todo')
        .then(({ data }) => {
          success(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  setReiniciarTodo: () => {
    socket.on('reiniciarTodo', () => {
      get().getEmpleados();
      get().getGanadores();
      get().getOpciones();
      get().setGanadorObject();
    });
  },
  setEstatus: () => {
    socket.on('estatus', (estatus) => {
      set(
        produce((draft) => {
          draft.estatus = estatus;
          get().getOpciones();
        })
      );
    });
  },
}));
