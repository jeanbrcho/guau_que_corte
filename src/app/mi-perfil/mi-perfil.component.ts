import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenUserService } from '../services/token-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  logueado = false;
  email = '';

  @Output() cerrar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor(private tokenUserService: TokenUserService, private router:Router) {}

  ngOnInit(): void {
    this.tokenUserService.logueado$.subscribe(val => (this.logueado = val));
    this.tokenUserService.email$.subscribe(val => (this.email = val));
  }

  cerrarSesion(): void {
    this.logout.emit(); // ⚠️ Emitís evento, no llamás directamente al service desde acá
    this.router.navigate(['/']); // Redirigir a la página principal
  }

  cerrarPanel(): void {
    this.cerrar.emit();
  }
}
