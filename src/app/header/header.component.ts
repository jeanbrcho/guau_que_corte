import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/login/login.component'
import { UserService } from '../services/user.service'
import { RegisterComponent } from '../user/register/register.component';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule, LoginComponent,RegisterComponent]
})
export class HeaderComponent {
  menuOpen = false;
  modalAbierto: boolean = false;
  formularioActual: 'login' | 'registro' = 'login';


  constructor(private userService: UserService) { }

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