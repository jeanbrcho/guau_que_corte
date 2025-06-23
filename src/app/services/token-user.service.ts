import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class TokenUserService {

  private TOKEN_KEY = 'token';
  private USER_EMAIL = 'userEmail'
  private USER_NAME = 'userName'
  private USER_LASTNAME = 'userLastName'
  private USER_ID = 'userId';  // <-- agregá esta constante

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  saveUserEmail(user: IUser): void {
    localStorage.setItem(this.USER_EMAIL, user.email);
  }

  saveUserName(user: IUser): void {
    localStorage.setItem(this.USER_NAME, user.name);
  }

  saveUserLastName(user: IUser): void {
    localStorage.setItem(this.USER_EMAIL, user.lastName);
  }

  // Nuevo método para guardar userId
  saveUserId(userId: string): void {
    localStorage.setItem(this.USER_ID, userId);
  }


  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getUserEmail() {
    return localStorage.getItem(this.USER_EMAIL)
  }

  getUserName() {
    return localStorage.getItem(this.USER_NAME)
  }

  getUserLastName() {
    return localStorage.getItem(this.USER_LASTNAME)
  }

  // Nuevo método para obtener userId
  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }

  clearLocalStorage(){
    localStorage.clear()
  }

}
