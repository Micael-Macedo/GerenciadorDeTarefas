import { Component, inject } from '@angular/core';
import { IColuna } from '../interfaces/coluna.interface';
import { ColunaComponent } from './shared/coluna/coluna.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColunaService } from '../services/coluna.service';
import { TarefaService } from '../services/tarefa.service';
import { ITarefa } from '../interfaces/tarefa.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ColunaComponent,
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GerenciadorDeTarefas';
  readonly colunaService = inject(ColunaService)
  readonly tarefaService = inject(TarefaService)

  colunas: IColuna[] = []

  formColuna: FormGroup;
  formTarefa: FormGroup;
  isEditMode = false;

  colunaModel!: IColuna
  tarefaModel!: ITarefa


  // Necessário trocar as validacoes dentro do construtor para se adequar aos atributos de coluna e tarefa
  constructor(
    private fb: FormBuilder,
  ) {
    this.formColuna = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.pattern('[0-9]{10,11}')]
    });
    this.formTarefa = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.pattern('[0-9]{10,11}')]
    });
  }

  //Ao iniciar busca todas as colunas já cadastradas na api
  ngOnInit(): void {
    this.colunaService.getColunas().subscribe({
      next: (colunas: IColuna[]) => {
        this.colunas = colunas
      }
    })
  }

  // Método para todas as operações ao realizar o submit da coluna
  submitColuna(method: string): void {
    if (this.formColuna.invalid) {
      this.formColuna.markAllAsTouched();
      return;
    }

    const formData = this.formColuna.value;

    switch (method) {
      case 'GET':
        this.colunaService.getColuna(formData.id).subscribe(
          {
            next: (coluna: IColuna) => {

            },
            error: (err: Error) => {console.error('Erro ao buscar:', err)}}
        );
        break;

      case 'POST':
        this.colunaService.postColuna(formData).subscribe(
          {
            next: () => {
              this.formColuna.reset();
            },
            error: (err: Error) => {console.error('Erro ao criar:', err)}
          },
        );
        break;

      case 'PUT':
        this.colunaService.putColuna(formData.id, formData).subscribe(
          {
            next: () => {
              this.isEditMode = false;
              this.formColuna.reset();
            },
            error: (err: Error) => {
              console.error('Erro ao atualizar:', err)
            }}
        );
        break;

      case 'DELETE':
        this.colunaService.deleteColuna(formData.id).subscribe(
          {
            next: () => {
              this.isEditMode = false;
              this.formColuna.reset();
            },
            error: (err: Error) => {
              console.error('Erro ao deletar:', err)
            }
          }
        );
        break;
    }
  }

    // Método para todas as operações ao realizar o submit da tarefa
  submitTarefa(method: string): void {
    if (this.formTarefa.invalid) {
      this.formTarefa.markAllAsTouched();
      return;
    }

    const formData = this.formTarefa.value;

    switch (method) {
      case 'GET':
        this.tarefaService.getTarefa(formData.id).subscribe({
          next: (response) => console.log('Dados recebidos:', response),
          error: (error) => console.error('Erro ao buscar:', error)
        });
        break;

      case 'POST':
        this.tarefaService.postTarefa(formData).subscribe({
          next: (response) => {
            console.log('Dados criados:', response);
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
}
