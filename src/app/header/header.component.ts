import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/login/login.component'
import { UserService } from '../services/user.service'
import { RegisterComponent } from '../user/register/register.component';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule, LoginComponent,RegisterComponent]
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = false;
  modalAbierto: boolean = false;
  formularioActual: 'login' | 'registro' = 'login';
  redirectToTurnos: boolean = false; // Nueva propiedad
  private modalSubscription?: Subscription;


  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    // Escuchar cuando el guard quiera abrir el modal
    this.modalSubscription = this.modalService.modalLogin$.subscribe(modalState => {
      if (modalState.open) {
        this.abrirModal();
        this.formularioActual = 'login'; // Asegurar que se abra el login
        this.redirectToTurnos = modalState.redirectToTurnos; // Establecer si debe redirigir
        // Resetear el estado del servicio
        this.modalService.cerrarModalLogin();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  mostrarFormulario(tipo: 'login' | 'registro') {
    this.formularioActual = tipo;
  }


  toggleMenu() {
    this.modalAbierto = false;
    this.menuOpen = !this.menuOpen;
    console.log('Menu hamburguesa:', this.menuOpen);
  }


  abrirModal() {
    this.modalAbierto = true;

  }

  cerrarModal = () => {
    console.log("hola")
    console.log(this.modalAbierto)
    this.modalAbierto = false;
  }

  abrirModalDesdeMenu() {
    this.menuOpen = false;
    this.modalAbierto = true;
    console.log("se hizo click en el modal tamaño celular")
  }

  // Modal para Sacar Turno
  modalTurnoAbierto = false;

  abrirModalTurno() {
    this.modalTurnoAbierto = true;
  }

  cerrarModalTurno() {
    this.modalTurnoAbierto = false;
  }

  //esto es un ejemplo de que me muestra todos los usuarios  que tengo la base de datos si tengo el token en el localStorage
  handleClickAllUsers() {
    this.userService.getAllUsers().subscribe({
      next(response) {
        console.log(response)
      },
      error(err) {
        console.log(err)
      },
    })
  }

}