export interface ITarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  prioridade: string;
  status: StatusTarefa
}

export enum StatusTarefa {
  PENDENTE = 'Pendente',
  DESENVOLVIMENTO = 'Desenvolvimento',
  CONCLUIDO = 'Concluído',
}
