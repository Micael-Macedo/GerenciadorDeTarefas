//Importa a interface de tarefa que vai ser usada para compor a estrutura da coluna
import { ITarefa } from "./tarefa.interface";

// Interface que define o formato esperado para um objeto Coluna no frontend
export interface IColuna {
  id: number;              // Identificador único da coluna
  nome: string;           // Nome exibido da coluna (a fazer, em andamento....)
  corColuna: ICorColuna; // Enum que define a cor da coluna
  tarefas: ITarefa[];   // Lista de tarefas associadas a essa coluna
}

//Enum mostrando as cores de uma coluna usando valores hexadecimais
export enum ICorColuna {
  ROXO = '#900909',
  VERDE = '#009000',
  AZUL = '#0000FF',
  VERMELHO = '#FF0000',
}
