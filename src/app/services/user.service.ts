import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../interfaces/user';
import { IResponseApi } from '../interfaces/responseApi';
import { environment } from '../../environments/environment';

export interface IResponseAllUser extends IResponseApi {
  status: string;
  message: string;
  data?: IUser[];
}

export interface IResponseUserLogin extends IResponseApi {
  status: string;
  message: string;
  data?: {
    user: IUser;
    token: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logueadoSubject = new BehaviorSubject<boolean>(false);
  logueado$ = this.logueadoSubject.asObservable();

  private usuarioEmailSubject = new BehaviorSubject<string>('');
  email$ = this.usuarioEmailSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IResponseAllUser> {
    const urlAllUsers = `${environment.apiUrl}/users`;
    return this.http.get<IResponseAllUser>(urlAllUsers);
  }

  postLogin(email: string, password: string): Observable<IResponseUserLogin> {
    const urlLogin = `${environment.apiUrl}/auth/login`;
    const jsonData = { email, password };

    return this.http.post<IResponseUserLogin>(urlLogin, jsonData).pipe(
      tap((response: IResponseUserLogin) => {
        if (response.status === 'success' && response.data) {
          const userEmail = response.data.user.email;
          this.logueadoSubject.next(true);
          this.usuarioEmailSubject.next(userEmail);
          localStorage.setItem('logueado', 'true');
          localStorage.setItem('email', userEmail);
        }
      })
    );
  }

  cargarDesdeLocalStorage() {
    const logueado = localStorage.getItem('logueado') === 'true';
    const email = localStorage.getItem('email') || '';
    this.logueadoSubject.next(logueado);
    this.usuarioEmailSubject.next(email);
  }

  logout() {
    this.logueadoSubject.next(false);
    this.usuarioEmailSubject.next('');
    localStorage.removeItem('logueado');
    localStorage.removeItem('email');
  }
}
