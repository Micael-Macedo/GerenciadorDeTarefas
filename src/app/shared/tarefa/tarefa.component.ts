import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITarefa } from '../../../interfaces/tarefa.interface';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- importar aqui

@Component({
  selector: 'app-tarefa',
  standalone: true,               
  imports: [CommonModule, FormsModule],  
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']  
})


export class TarefaComponent {
  @Input() tarefa!: ITarefa;
  @Output() tarefaDeletada = new EventEmitter<number>();

  readonly tarefaService = inject(TarefaService);

  editando = false;
  tarefaEditavel!: ITarefa;

  habilitarEdicao() {
    this.editando = true;
    this.tarefaEditavel = { ...this.tarefa };
  }

  cancelarEdicao() {
    this.editando = false;
  }

  salvarEdicao() {
    this.tarefaService.putTarefa(this.tarefaEditavel.id, this.tarefaEditavel).subscribe({
      next: (tarefaAtualizada: ITarefa) => {
        this.tarefa = tarefaAtualizada;
        this.editando = false;
      },
      error: (err: any) => {
        console.error('Erro ao salvar edição:', err);
      }
    });
  }

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
