  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { IUser } from '../interfaces/user'
  import { IResponseApi } from '../interfaces/responseApi'
  import { environment } from '../../environments/environment'

  interface IResponseAllUser extends IResponseApi {
    status: string,
    message: string,
    data?: IUser[]
  }

  interface IResponseUserLogin extends IResponseApi {
    status: string,
    message: string,
    data?: {
      user: IUser,
      token: string
    },
    token: string
  }

  @Injectable({
    providedIn: 'root'
  })

  export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<IResponseAllUser> {
      const urlAllUsers = `${environment.apiUrl}/users`
      return this.http.get<IResponseAllUser>(urlAllUsers)
    }

    postLogin(email: string, password: string): Observable<IResponseUserLogin> {
      const urlLogin = `${environment.apiUrl}/auth/login`;
      const jsonData = { email, password }
      return this.http.post<IResponseUserLogin>(urlLogin, jsonData)
    }


  }
