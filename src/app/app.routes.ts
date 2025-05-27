import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component'; // ya lo tenés
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const routes: Routes = [
  { path: '', component: BodyComponent }, // body por defecto
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '**', redirectTo: '' }
];
