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
  scrollStatus: boolean;
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
  putEmpleado: (empleado: Empleado) => void;
}

// usar get para acceder a los demas metodos o funciones en el strore
export const useTombolaStore = create<TombolaState>()((set, get) => ({
  empleados: [],
  ganadores: [],
  ganador: {
    id: 0,
    nombre: '',
    seleccionado: false,
    gana: false,
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
  scrollStatus: true,
  opcionesRifa: {
    id: 0,
    estatus: 0,
    timepo_segundos: '',
  },
  getGanadores: async () => {
    await instance
      .get('/ganadores')
      .then(({ data }) => {
        console.log('ganadores');
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
        console.log('empleados');
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
        console.log('opciones');
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
  putEmpleado: async (empleado: Empleado) => {
    empleado.gana = !empleado.gana;
    await instance
      .put('/empleado', empleado)
      .then((/*{ data }*/) => {
        // success(data.data);
        get().getEmpleados();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  iniciar: async () => {
    console.log('iniciar');
    const title = 'Estas por iniciar la rifa';
    const text = 'Deseas continuar?';
    const response = await question({ title, text });
    if (response) {
      socket.emit('iniciar');
    }
  },
  setContador: async () => {
    console.log('contador');
    socket.on('contador', (contador: number) => {
      set(
        produce((draft) => {
          draft.contador = contador;
        })
      );
    });
  },
  setGanador: () => {
    console.log('ganador');
    socket.on('ganador', (ganador: Empleado) => {
      set(
        produce((draft) => {
          draft.nuevo_ganador += 1;
          draft.ganadores.push(ganador);
          draft.ganador = ganador;
          // draft.scrollStatus = false;

          // const element_position_scroll = document.getElementById(
          //   `_${ganador.idr}`
          // );

          // element_position_scroll?.scrollIntoView();

          // element_position_scroll?.scrollIntoView({
          //   behavior: 'smooth',
          //   block: 'start',
          //   inline: 'nearest',
          // });

          setTimeout(() => {
            get().setGanadorObject();
          }, 6000);
        })
      );
    });
  },
  setGanadorObject: () => {
    set(
      produce((draft) => {
        // draft.scrollStatus = true;
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
    console.log('reiniciar todo');
    socket.on('reiniciarTodo', () => {
      get().getEmpleados();
      get().getGanadores();
      get().getOpciones();
      get().setGanadorObject();
    });
  },
  setEstatus: () => {
    console.log('estatus');
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
