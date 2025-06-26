import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenUserService } from '../services/token-user.service';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenUserService: TokenUserService,
    private router: Router,
    private modalService: ModalService
  ) {}

  canActivate(): boolean {
    const token = this.tokenUserService.getToken();
    const userId = this.tokenUserService.getUserId();

    if (token && userId) {
      // Usuario está autenticado
      return true;
    } else {
      // Usuario no está autenticado
      alert('Debes iniciar sesión para sacar un turno.');
      
      // Redirigir al inicio
      this.router.navigate(['/']);
      
      // Abrir automáticamente el modal de login con redirección
      setTimeout(() => {
        this.modalService.abrirModalLoginDesdeGuard();
      }, 100); // Pequeño delay para asegurar que la navegación se complete
      
      return false;
    }
  }
}
