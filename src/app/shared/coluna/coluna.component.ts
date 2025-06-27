import { Component, inject, Input } from '@angular/core';
import { IColuna } from '../../../interfaces/coluna.interface';
import { ColunaService } from '../../../services/coluna.service';
import { TarefaComponent } from "../tarefa/tarefa.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coluna',
  imports: [TarefaComponent, CommonModule],
  templateUrl: './coluna.component.html',
  styleUrl: './coluna.component.scss'
})
export class ColunaComponent {
  readonly colunaService = inject(ColunaService);
  @Input() coluna!: IColuna
}
