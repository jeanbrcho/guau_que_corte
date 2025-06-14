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

}
