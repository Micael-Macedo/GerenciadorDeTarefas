import { ITarefa } from "./tarefa.interface";

export interface IColuna {
  id: string
  nome: string;
  corColuna: ICorColuna;
  tarefas: ITarefa[];
}

export enum ICorColuna {
  ROXO = '#900909',
  VERDE = '#009000',
  AZUL = '#0000FF',
  VERMELHO = '#FF0000',
}
