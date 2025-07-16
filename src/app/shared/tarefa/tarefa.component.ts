import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITarefa } from '../../../interfaces/tarefa.interface';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- importar aqui
import { ColunaService } from '../../../services/coluna.service';
import { IColuna } from '../../../interfaces/coluna.interface';

@Component({
  selector: 'app-tarefa',
  standalone: true,                          //Torna o componente independente, sem necessidade de declarar em um módulo
  imports: [CommonModule, FormsModule],     //Importa os modulos que o template usa
  templateUrl: './tarefa.component.html',  //Indica onde estão o HTML e CSS do componente
  styleUrls: ['./tarefa.component.scss']  //Indica onde estão o HTML e CSS do componente
})

//Classe do componente que controla o comportamento da interface da tarefa
export class TarefaComponent {
  @Input() coluna_id!: number    //Recebe os dados do componente pai (id da coluna)
  @Input() tarefa!: ITarefa;    //Recebe os dados do componente pai (tarefa)
  @Output() tarefaDeletada = new EventEmitter<number>();  //Emite eventos para o pai (avisa que tarefa foi delata)

  //Injeta os serviços de tarefas e colunas p realizar as chamadas a API
  readonly tarefaService = inject(TarefaService);
  readonly colunaService = inject(ColunaService);

  editando = false;           //Controla se a tarefa esta em modo de edição
  tarefaEditavel!: ITarefa;  //Objeto temporário com as alterações que o usuário faz
  colunas: IColuna[] = [];  //Lista de colunas usada quando o user mover a tarefa de uma coluna p ota

  //Ativa o modo de edição e carrega as colunas disponíveis (caso queira mudar de coluna)
  habilitarEdicao() {

    this.colunaService.getColunas().subscribe({
      next: (colunas: IColuna[]) => {
        this.colunas = colunas
      }
    })
    this.editando = true;
    this.tarefa.coluna_id = this.coluna_id
    this.tarefaEditavel = { ...this.tarefa };
  }

  //Cancela a edição 
  cancelarEdicao() {
    this.editando = false;
  }

  //Envia os dados atualizados da tarefa para o backend via PUT
  salvarEdicao() {
    this.tarefaService.putTarefa(this.tarefaEditavel.id, this.tarefaEditavel).subscribe({
      next: (tarefaAtualizada: ITarefa) => {
        this.tarefa = tarefaAtualizada;
        this.editando = false;
        this.colunaService.updateDataEmit.emit(true)  //Avisa que os dados mudaram
      },
      error: (err: any) => {
        console.error('Erro ao salvar edição:', err);
      }
    });
  }

  //Deleta a tarefa do backend e avisa o componente pai para remover da tela
  deleteTarefa(id: number): void {
    this.tarefaService.deleteTarefa(id).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso');
        this.tarefaDeletada.emit(id);
      },
      error: (err: any) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }
}
