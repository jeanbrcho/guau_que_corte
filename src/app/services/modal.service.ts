import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private modalLoginSubject = new BehaviorSubject<{open: boolean, redirectToTurnos: boolean}>({
    open: false, 
    redirectToTurnos: false
  });
  public modalLogin$ = this.modalLoginSubject.asObservable();

  constructor() { }

  // Método para abrir el modal de login desde el guard (con redirección)
  abrirModalLoginDesdeGuard(): void {
    this.modalLoginSubject.next({open: true, redirectToTurnos: true});
  }

  // Método para abrir el modal de login normal
  abrirModalLogin(): void {
    this.modalLoginSubject.next({open: true, redirectToTurnos: false});
  }

  // Método para cerrar el modal de login  
  cerrarModalLogin(): void {
    this.modalLoginSubject.next({open: false, redirectToTurnos: false});
  }
}
