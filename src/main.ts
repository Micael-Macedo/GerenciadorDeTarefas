import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//Executa a inicialização da aplicação Angular com base no componente raiz e nas configurações
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); //Se der erro durante o bootstrap exibe no console
