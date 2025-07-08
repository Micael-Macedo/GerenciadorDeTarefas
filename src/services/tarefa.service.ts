import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITarefa } from '../interfaces/tarefa.interface';

@Injectable({
  providedIn: 'root'  //Indicando de novo que o serviço estará disponível globalmente na aplicação (singleton)

})
export class TarefaService {

  // URL base do endpoint para tarefas no backend
  private apiUrl = 'http://localhost:8080/api/tarefa';

  //Injeção do HttpClient para realizar requisições HTTP
  constructor(private http: HttpClient) {}

  //Busca todas as tarefas do backend, retorna um Observable com array de tarefas
  getTarefas(): Observable<ITarefa[]> {
    return this.http.get<ITarefa[]>(this.apiUrl);
  }

  //Busca uma tarefa específica pelo ID, retorna um Observable com a tarefa
  getTarefa(id: number): Observable<ITarefa> {
    return this.http.get<ITarefa>(`${this.apiUrl}/${id}`);
  }

  //Cria uma nova tarefa na coluna especificada pelo ID da coluna
  //O endpoint espera a tarefa no body e o id da coluna na URL
  postTarefa(Tarefa: ITarefa, coluna_id: string): Observable<ITarefa> {
    return this.http.post<ITarefa>(`${this.apiUrl}/${coluna_id}`, Tarefa);
  }

  //Atualiza uma tarefa existente pelo ID passando a tarefa atualizada no body
  putTarefa(id: number, Tarefa: ITarefa): Observable<ITarefa> {
    return this.http.put<ITarefa>(`${this.apiUrl}/${id}`, Tarefa);
  }

  //Deleta uma tarefa pelo ID
  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
