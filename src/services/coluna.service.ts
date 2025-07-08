import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IColuna } from '../interfaces/coluna.interface';
import { ITarefa } from '../interfaces/tarefa.interface';

@Injectable({
  providedIn: 'root' //Indica que esse serviço estará disponível para toda a aplicação (singleton)
})
export class ColunaService {

  //URL base da API backend para operações com Colunas
  private apiUrl = 'http://localhost:8080/api/coluna';

  constructor(private http: HttpClient) {} //Injeção do HttpClient para fazer requisições HTTP

  //Evento para notificar componentes interessados que os dados foram atualizados
  @Output() updateDataEmit = new EventEmitter<boolean>()

  //Metodo para buscar todas as colunas do backend
  getColunas(): Observable<IColuna[]> {
    return this.http.get<IColuna[]>(this.apiUrl);
  }

  //Metodo para buscar uma única coluna pelo seu ID
  getColuna(id: number): Observable<IColuna> {
    return this.http.get<IColuna>(`${this.apiUrl}/${id}`);
  }

  //Metodo para criar uma nova coluna enviando dados para o backend
  postColuna(coluna: IColuna): Observable<IColuna> {
    return this.http.post<IColuna>(this.apiUrl, coluna);
  }

  //Metodo para atualizar uma coluna existente pelo ID
  putColuna(id: number, coluna: IColuna): Observable<IColuna> {
    return this.http.put<IColuna>(`${this.apiUrl}/${id}`, coluna);
  }

  //Metodo para deletar uma coluna pelo ID
  deleteColuna(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //Metodo para adicionar uma tarefa a uma coluna específica (endpoint do backend)
  addTarefaToColuna(colunaId: number, tarefa: ITarefa): Observable<IColuna> {
    return this.http.post<IColuna>(`${this.apiUrl}/${colunaId}/tarefa`, tarefa);
  }

}
