import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITarefa } from '../../../interfaces/tarefa.interface';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa',
  imports: [CommonModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent {
  @Input() tarefa!: ITarefa;
  @Output() tarefaDeletada = new EventEmitter<number>();  
  readonly tarefaService = inject(TarefaService);

  editTarefa(tarefa: ITarefa): void {
    console.log('Editando tarefa:', tarefa);
  }

  deleteTarefa(id: number): void {
    this.tarefaService.deleteTarefa(id).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso');
        this.tarefaDeletada.emit(id);  
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }
}
