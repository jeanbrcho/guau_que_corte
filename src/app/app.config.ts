import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // esto se importa cuando vamos a utilizar service con HttpClient
import { authInterceptor } from './auth.interceptor'


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // agregamos el  "authInterceptor" para que lo aplique en todas las solicitudes HTTP que utilizan los services
    )
  ]
};
