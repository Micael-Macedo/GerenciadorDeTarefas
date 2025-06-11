import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IColuna } from '../interfaces/coluna.interface';
import { ColunaComponent } from './shared/coluna/coluna.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColunaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GerenciadorDeTarefas';

  colunas: IColuna[] = []


}
