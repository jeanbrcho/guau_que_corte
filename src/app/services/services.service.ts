import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = `${environment.apiUrl}/shift/available`;
  private servicesUrl = `${environment.apiUrl}/service`;

  constructor(private http: HttpClient) { }

  getAvailableShifts(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?date=${date}`);
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.servicesUrl);
  }

  getHorarios(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?date=${date}`);
  }
}
