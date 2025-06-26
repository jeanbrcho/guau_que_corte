import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/login/login.component'
import { UserService } from '../services/user.service'
import { RegisterComponent } from '../user/register/register.component';
import { TokenUserService } from '../services/token-user.service';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule, LoginComponent,RegisterComponent,MiPerfilComponent]
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  modalAbierto: boolean = false;
  formularioActual: 'login' | 'registro' = 'login';

  logueado: boolean = false;
  usuarioEmail: string = '';
  perfilAbierto: boolean = false;


  constructor(private tokenUserService: TokenUserService, private userService: UserService) { }

ngOnInit(): void {
    this.tokenUserService.logueado$.subscribe(val => this.logueado = val);
    this.tokenUserService.email$.subscribe(val => this.usuarioEmail = val);
  }

  
  abrirPanel() {
    this.perfilAbierto = true;
  }

  cerrarPanel() {
    this.perfilAbierto = false;
  }


    cerrarSesion() {
    this.tokenUserService.logout();
    this.perfilAbierto = false;
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