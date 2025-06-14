import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user'
import { IResponseApi } from '../interfaces/responseApi'

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

  private apiUrl = 'http://localhost:5000';
  // private apiUrl = "https://mcitjuah9d.execute-api.us-east-1.amazonaws.com/";

  getAllUsers(): Observable<IResponseAllUser> {
    const urlAllUsers = `${this.apiUrl}/users`
    return this.http.get<IResponseAllUser>(urlAllUsers)
  }

  postLogin(email: string, password: string): Observable<IResponseUserLogin> {
    const urlLogin = `${this.apiUrl}/auth/login`;
    const jsonData = { email, password }
    return this.http.post<IResponseUserLogin>(urlLogin, jsonData)
  }


}
