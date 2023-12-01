import { Regalo } from "./regalo";

export interface Empleado {
  id: number;
  nombre: string;
  seleccionado: boolean;
  departamento: string;
  gana: boolean;
  regalo: Regalo;
  idr: string;
}
