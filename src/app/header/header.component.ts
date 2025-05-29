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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


   abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}



 

