export interface ITarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  statusTarefa: StatusTarefa
}

export enum StatusTarefa {
  PENDENTE = 'Pendente',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluída',
}
