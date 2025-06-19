import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-panel-perfil',
  standalone: true,
  templateUrl: './panel-perfil.component.html',
  styleUrls: ['./panel-perfil.component.css']
})

export class PanelPerfilComponent implements OnInit {
  logueado = false;

  email = '';

   @Output() cerrar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.logueado$.subscribe(val => this.logueado = val);
    this.userService.email$.subscribe(val => this.email = val);
  }

 cerrarSesion() {
    this.userService.logout();
  }


  cerrarPanel() {
    this.cerrar.emit();
  }

}

/*
export class PanelPerfilComponent {
  @Input() email: string = '';
  @Output() cerrar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  cerrarPanel() {
    this.cerrar.emit();
  }

  cerrarSesion() {
    this.logout.emit();
  }
}
*/ 