import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  imports: [],
  standalone: true,
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent {
  constructor(private router: Router) {}

  cancelar() {
    this.router.navigate(['/']);
  }
}
