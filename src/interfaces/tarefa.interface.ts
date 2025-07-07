import { IColuna } from "./coluna.interface";

export enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  DESENVOLVENDO = 'DESENVOLVENDO',
  CONCLUIDO = 'CONCLUIDO',
}

export interface ITarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  prioridade: string;
  status: StatusTarefa;
  coluna_id?: number;
}
