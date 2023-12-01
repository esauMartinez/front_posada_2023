import { create } from 'zustand';
import { instance } from '../helpers/axiosInstance';
import { handleError } from '../helpers/message';
import { Usuario } from '../models/usuario';
import { produce } from 'immer';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface Auth {
  username: string;
  password: string;
}

interface AuthStore {
  usuario: Usuario;
  logged: boolean;
  auth: (usuario: Auth) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        usuario: {
          id: 0,
          username: '',
          password: '',
          nombre: '',
          rol: '',
        },
        logged: false,
        auth: async (auth: Auth) => {
          await instance
            .post('/login', auth)
            .then(({ data }) => {
              set(() => ({ usuario: data.data, logged: true }));
            })
            .catch((error) => {
              handleError(error);
            });
        },
        logout: () => {
          set(
            produce((draft) => {
              draft.logged = false;
            })
          );
        },
      }),
      {
        name: 'rol_posada',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
