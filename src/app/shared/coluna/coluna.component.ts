import { IColuna } from '../../../interfaces/coluna.interface';
import { ColunaService } from '../../../services/coluna.service';
import { TarefaComponent } from "../tarefa/tarefa.component";
import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-coluna',                     // Define a tag que será usada no HTML para inserir este componente
  imports: [TarefaComponent, CommonModule],  // Importa o componente filho e funcionalidades de template Angular
  templateUrl: './coluna.component.html',   // Caminho do HTML do componente
  styleUrl: './coluna.component.scss'      // Estilo (CSS/SCSS) específico deste componente
})
export class ColunaComponent {
  readonly colunaService = inject(ColunaService);    //Injeção de dependência
  @Input() coluna!: IColuna;                        //Recebe os dados da coluna vindo do componente pai

  //Atualiza o array de tarefas da coluna no front-end localmente, após deletar uma tarefa
  deletarTarefa(id: number): void {
    this.coluna.tarefas = this.coluna.tarefas.filter(t => t.id !== id);
  }

    //Apenas loga a tarefa a ser editada. Futuramente da pra abrir um modal ou passar os dados para um formulário
  editarTarefa(tarefa: any): void {
    console.log('Tarefa recebida para edição:', tarefa);
  }

  //Permite emitir eventos para o componente pai (como AppComponent)
  @Output() colunaDeletada = new EventEmitter<number>();


//Método para deletar a coluna
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

//Otimização de renderização com trackBy
trackByTarefa(index: number, tarefa: any): number {
  return tarefa.id;
}


}

