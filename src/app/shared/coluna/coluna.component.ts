import { IColuna } from '../../../interfaces/coluna.interface';
import { ColunaService } from '../../../services/coluna.service';
import { TarefaComponent } from "../tarefa/tarefa.component";
import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-coluna',
  imports: [TarefaComponent, CommonModule],
  templateUrl: './coluna.component.html',
  styleUrl: './coluna.component.scss'
})
export class ColunaComponent {
  readonly colunaService = inject(ColunaService);
  @Input() coluna!: IColuna;

  deletarTarefa(id: number): void {
    this.coluna.tarefas = this.coluna.tarefas.filter(t => t.id !== id);
  }

  editarTarefa(tarefa: any): void {
    console.log('Tarefa recebida para edição:', tarefa);
    // Aqui você pode abrir um formulário/modal para edição se quiser
  }
  @Output() colunaDeletada = new EventEmitter<number>();

deleteColuna(): void {
  if (confirm(`Tem certeza que deseja excluir a coluna "${this.coluna.nome}"?`)) {
    this.colunaService.deleteColuna(this.coluna.id).subscribe({
      next: () => {
        console.log('Coluna deletada com sucesso');
        this.colunaDeletada.emit(this.coluna.id);  // emite o evento para o componente pai
      },
      error: (err) => {
        console.error('Erro ao deletar coluna:', err);
      }
    });
  }
}


trackByTarefa(index: number, tarefa: any): number {
  return tarefa.id;
}


}

