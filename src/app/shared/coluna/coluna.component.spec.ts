//Importa as ferramentas de teste do Angular (TestBed e ComponentFixture) e o prorio componente
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColunaComponent } from './coluna.component';

//Agrupa os testes relacionados ao ColunaComponent
describe('ColunaComponent', () => {

  //Instância do componente que será testado
  let component: ColunaComponent;

  //Ambiente de testes e permite acessar o DOM
  let fixture: ComponentFixture<ColunaComponent>;

  //Modulo de teste informando que o ColunaComponent será testado 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColunaComponent]
    })
    .compileComponents();

    //Cria a instância do componente no ambiente de teste (fixture)
    fixture = TestBed.createComponent(ColunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Verifica se o componente foi criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
