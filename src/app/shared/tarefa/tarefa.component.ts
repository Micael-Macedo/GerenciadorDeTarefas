import { Component, Input } from '@angular/core';
import { ITarefa } from '../../../interfaces/tarefa.interface';

@Component({
  selector: 'app-tarefa',
  imports: [],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent {
  @Input() tarefa!: ITarefa;
}
