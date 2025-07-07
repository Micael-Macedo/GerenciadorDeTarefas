import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IColuna } from '../interfaces/coluna.interface';
import { ITarefa } from '../interfaces/tarefa.interface';

@Injectable({
  providedIn: 'root'
})
export class ColunaService {

  private apiUrl = 'http://localhost:8080/api/coluna';

  constructor(private http: HttpClient) {}

  @Output() updateDataEmit = new EventEmitter<boolean>()

  getColunas(): Observable<IColuna[]> {
    return this.http.get<IColuna[]>(this.apiUrl);
  }

  getColuna(id: number): Observable<IColuna> {
    return this.http.get<IColuna>(`${this.apiUrl}/${id}`);
  }

  postColuna(coluna: IColuna): Observable<IColuna> {
    return this.http.post<IColuna>(this.apiUrl, coluna);
  }

  putColuna(id: number, coluna: IColuna): Observable<IColuna> {
    return this.http.put<IColuna>(`${this.apiUrl}/${id}`, coluna);
  }

  deleteColuna(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTarefaToColuna(colunaId: number, tarefa: ITarefa): Observable<IColuna> {
    return this.http.post<IColuna>(`${this.apiUrl}/${colunaId}/tarefa`, tarefa);
  }

}
