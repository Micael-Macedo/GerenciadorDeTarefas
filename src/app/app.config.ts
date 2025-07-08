// Importa tipos e funções necessárias da API standalone do Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa as rotas definidas separadamente
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

//Fornecendo o roteamento da aplicação baseado nas rotas q a gente importou
//Permite tb o uso de services http (HttpClientModule)
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()]
};
