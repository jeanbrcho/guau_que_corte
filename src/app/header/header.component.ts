import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink,CommonModule] 
})
export class HeaderComponent {
  menuOpen = false;
  modalAbierto: boolean = false;
  formularioActual: 'login' | 'registro' = 'login';

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

  cerrarModal() {
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

}



 

