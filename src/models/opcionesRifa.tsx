export interface OpcionesRifa {
  id: number;
  estatus: number;
  timepo_segundos: string;
}

export interface Limites {
  id: number;
  cantidad: number;
  opcion_id: number;
}
