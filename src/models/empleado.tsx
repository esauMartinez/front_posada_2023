import { Regalo } from "./regalo";

export interface Empleado {
  id: number;
  nombre: string;
  seleccionado: boolean;
  departamento: string;
  regalo: Regalo;
  idr: string;
}
