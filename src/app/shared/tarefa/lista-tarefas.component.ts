import { Component, OnInit } from '@angular/core';
import { ITarefa } from '../../../interfaces/tarefa.interface';
import { TarefaService } from '../../../services/tarefa.service';


@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.component.html',
  styleUrls: ['./lista-tarefa.component.scss']
})
export class ListaTarefaComponent implements OnInit {
  tarefas: ITarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.loadTarefas();
  }

  loadTarefas(): void {
    this.tarefaService.getTarefas().subscribe({
      next: (data) => this.tarefas = data,
      error: (error) => console.error('Erro ao carregar tarefas', error)
    });
  }

  onTarefaDeletada(id: number): void {
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    console.log('Tarefa removida localmente', id);
  }

}
