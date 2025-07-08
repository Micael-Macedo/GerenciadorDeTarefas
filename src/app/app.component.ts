//Importação de dependências e serviços do Angular + imp de interfaces e componentes do projeto
import { Component, inject } from '@angular/core';
import { IColuna } from '../interfaces/coluna.interface';
import { ColunaComponent } from './shared/coluna/coluna.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColunaService } from '../services/coluna.service';
import { TarefaService } from '../services/tarefa.service';
import { ITarefa } from '../interfaces/tarefa.interface';
import { CommonModule } from '@angular/common';


//Declaração dos modulos necessários (imports) e html/css do componente principal
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ColunaComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

//Injeção de serviços p se comunicar com o BE
export class AppComponent {
  title = 'GerenciadorDeTarefas';
  readonly colunaService = inject(ColunaService);
  readonly tarefaService = inject(TarefaService);

  //Guarda os dados do BE
  colunas: IColuna[] = [];

  //Formularios reativos
  formColuna: FormGroup;
  formTarefa: FormGroup;
 
  //Controle de estado para saber se está editando
  isEditMode = false;
  colunaModel!: IColuna;
  tarefaModel!: ITarefa;

  //Montagem dos forms reativos com validações obrigatórias (validators.required)
  constructor(private fb: FormBuilder) {
    this.formColuna = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      corColuna: ['', Validators.required],
    });

    this.formTarefa = this.fb.group({
      id: [null],
      coluna_id: ['', Validators.required],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      prioridade: ['', Validators.required],
    });


  }

  //Carrega colunas do BE e tb escuta eventos emitidos pelo ColunaService p atualizar a tela
  ngOnInit(): void {
    this.getColunas();

    this.colunaService.updateDataEmit.subscribe({
      next: () => {
        this.getColunas()
      }
    })
  }

  //Funcão aux pra obter lista de colunas da API
  private getColunas() {
    this.colunaService.getColunas().subscribe({
      next: (colunas: IColuna[]) => {
        this.colunas = colunas;
      }
    });
  }

  //CRUD de colunas (Método genérico para executar ações)
  submitColuna(method: string): void {
    if (this.formColuna.invalid) {
      this.formColuna.markAllAsTouched();
      return;
    }

    const formData = this.formColuna.value;

    switch (method) {
      case 'GET':
        this.colunaService.getColuna(formData.id).subscribe({
          next: (coluna: IColuna) => {
            // lógica se precisar
          },
          error: (err: Error) => {
            console.error('Erro ao buscar:', err);
          }
        });
        break;
      
      //Coluna sendo criada e adicionada no array colunas
      case 'POST':
        this.colunaService.postColuna(formData).subscribe({
          next: (coluna: IColuna) => {
            this.formColuna.reset();
            this.colunas.push(coluna);
            this.isEditMode = false;
          },
          error: (err: Error) => {
            console.error('Erro ao criar:', err);
          }
        });
        break;

      case 'PUT':
        this.colunaService.putColuna(formData.id, formData).subscribe({
          next: () => {
            this.isEditMode = false;
            this.formColuna.reset();
          },
          error: (err: Error) => {
            console.error('Erro ao atualizar:', err);
          }
        });
        break;

      case 'DELETE':
        this.colunaService.deleteColuna(formData.id).subscribe({
          next: () => {
            this.isEditMode = false;
            this.formColuna.reset();
            this.removerColuna(formData.id);  // remover localmente também
          },
          error: (err: Error) => {
            console.error('Erro ao deletar:', err);
          }
        });
        break;
    }
  }

  submitTarefa(method: string): void {
    if (this.formTarefa.invalid) {
      this.formTarefa.markAllAsTouched();
      return;
    }

    const formData = this.formTarefa.value;

    switch (method) {
      case 'GET':
        this.tarefaService.getTarefa(formData.id).subscribe({
          next: (tarefa: ITarefa) => {
            // lógica se precisar
          },
          error: (error) => console.error('Erro ao buscar:', error)
        });
        break;
        
        //Tarefa criada é inserida na coluna
      case 'POST':
        this.tarefaService.postTarefa(formData, this.formTarefa.value.coluna_id).subscribe({
          next: (response) => {
            const colunaId = this.formTarefa.value.coluna_id;
            const coluna = this.colunas.find(col => col.id == colunaId);

            coluna?.tarefas.push(response);
            this.formTarefa.reset();
          },
          error: (error) => console.error('Erro ao criar:', error)
        });
        break;

      case 'PUT':
        this.tarefaService.putTarefa(formData.id, formData).subscribe({
          next: (response) => {
            console.log('Dados atualizados:', response);
            this.isEditMode = false;
            this.formTarefa.reset();
          },
          error: (error) => console.error('Erro ao atualizar:', error)
        });
        break;

      case 'DELETE':
        this.tarefaService.deleteTarefa(formData.id).subscribe({
          next: (response) => {
            console.log('Dados deletados:', response);
            this.isEditMode = false;
            this.formTarefa.reset();
          },
          error: (error) => console.error('Erro ao deletar:', error)
        });
        break;
    }
  }

  //Remove a coluna da lista local sem precisar de nova requisição GET
  removerColuna(id: number): void {
    this.colunas = this.colunas.filter(coluna => coluna.id !== id);
    console.log(`Coluna com id ${id} removida da lista local.`);
  }

  trackByColuna(index: number, item: IColuna): number {
  return item.id;
}
}
