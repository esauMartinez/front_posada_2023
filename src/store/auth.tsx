import { create } from 'zustand';
import { instance } from '../helpers/axiosInstance';
import { handleError } from '../helpers/message';
import { Usuario } from '../models/usuario';

interface Auth {
  username: string;
  password: string;
}

interface AuthStore {
  usuario: Usuario;
  logged: boolean;
  auth: (usuario: Auth) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: {
    id: 0,
    username: '',
    password: '',
    nombre: '',
  },
  logged: false,
  auth: async (auth: Auth) => {
    await instance
      .post('/login', auth)
      .then(() => {
        set(() => ({ logged: true }));
      })
      .catch((error) => {
        handleError(error);
      });
  },
}));
