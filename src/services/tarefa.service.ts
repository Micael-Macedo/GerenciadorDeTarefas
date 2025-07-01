import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITarefa } from '../interfaces/tarefa.interface';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'http://localhost:8080/api/tarefa';

  constructor(private http: HttpClient) {}

  getTarefas(): Observable<ITarefa[]> {
    return this.http.get<ITarefa[]>(this.apiUrl);
  }

  getTarefa(id: number): Observable<ITarefa> {
    return this.http.get<ITarefa>(`${this.apiUrl}/${id}`);
  }

  postTarefa(Tarefa: ITarefa, coluna_id: string): Observable<ITarefa> {
    return this.http.post<ITarefa>(`${this.apiUrl}/${coluna_id}`, Tarefa);
  }

  putTarefa(id: number, Tarefa: ITarefa): Observable<ITarefa> {
    return this.http.put<ITarefa>(`${this.apiUrl}/${id}`, Tarefa);
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
