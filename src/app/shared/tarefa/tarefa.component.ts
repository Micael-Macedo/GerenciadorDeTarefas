import { Component, inject, Input } from '@angular/core';
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
  readonly tarefaService = inject(TarefaService);

  editTarefa(tarefa: ITarefa): void {
    console.log('Editando tarefa:', tarefa);
  }

  deleteTarefa(id: number): void {
    this.tarefaService.deleteTarefa(id).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso');
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }
}
