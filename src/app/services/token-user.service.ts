import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenUserService {
  private TOKEN_KEY = 'token';
  private USER_EMAIL = 'userEmail';
  private USER_NAME = 'userName';
  private USER_LASTNAME = 'userLastName';
  private USER_ID = 'userId';

  // 👉 Nuevo: estado observable de logueo
  private logueadoSubject = new BehaviorSubject<boolean>(false);
  logueado$ = this.logueadoSubject.asObservable();

  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();

  perfilAbierto = false;

  constructor() {
    this.cargarDesdeLocalStorage();
  }

  // 👉 Métodos de apertura/cierre de panel
  abrirPanel() {
    this.perfilAbierto = true;
  }

  cerrarPanel() {
    this.perfilAbierto = false;
  }

  cerrarSesion() {
    this.logout();
    this.perfilAbierto = false;
  }

  // 👉 Métodos de login
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  saveUserEmail(user: IUser): void {
    const email = user.email;
    localStorage.setItem(this.USER_EMAIL, email);
    this.logueadoSubject.next(true);
    this.emailSubject.next(email);
    localStorage.setItem('logueado', 'true');
  }

  saveUserName(user: IUser): void {
    localStorage.setItem(this.USER_NAME, user.name);
  }

  saveUserLastName(user: IUser): void {
    localStorage.setItem(this.USER_LASTNAME, user.lastName);
  }

  saveUserId(userId: string): void {
    localStorage.setItem(this.USER_ID, userId);
  }

  // 👉 Métodos de acceso
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail() {
    return localStorage.getItem(this.USER_EMAIL);
  }

  getUserName() {
    return localStorage.getItem(this.USER_NAME);
  }

  getUserLastName() {
    return localStorage.getItem(this.USER_LASTNAME);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }

  // 👉 Recuperar sesión
  cargarDesdeLocalStorage() {
    const logueado = localStorage.getItem('logueado') === 'true';
    const email = localStorage.getItem(this.USER_EMAIL) || '';
    this.logueadoSubject.next(logueado);
    this.emailSubject.next(email);
  }

  // 👉 Cerrar sesión
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_NAME);
    localStorage.removeItem(this.USER_LASTNAME);
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem('logueado');

    this.logueadoSubject.next(false);
    this.emailSubject.next('');
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
