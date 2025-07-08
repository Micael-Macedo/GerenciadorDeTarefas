//Importa a interface de Coluna p uso se necessário
import { IColuna } from "./coluna.interface";

//Enum com os possíveis status de uma tarefa
export enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  DESENVOLVENDO = 'DESENVOLVENDO',
  CONCLUIDO = 'CONCLUIDO',
}

//Interface representndo uma tarefa no frontend
export interface ITarefa {
  id: number;                // Identificador único da tarefa
  titulo: string;           // Título curto da tarefa
  descricao: string;       // Descrição mais detalhada
  concluida: boolean;     // Indica se está concluida
  prioridade: string;    // Prioridade textual (ALTA, MEDIA, BAIXA)
  status: StatusTarefa; // Status atual da tarefa
  coluna_id?: number;  // ID da coluna da tarefa (opcional)
}
