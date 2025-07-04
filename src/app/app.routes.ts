import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component'; // ya lo tenés
import { ContactoComponent } from './contacto/contacto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { TurnosComponent } from './turnos/turnos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: BodyComponent }, // body por defecto
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'turnos', component: TurnosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
