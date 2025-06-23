import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenUserService } from '../services/token-user.service';
import { IShift } from '../interfaces/shift';
import { IResponseApi } from '../interfaces/responseApi';
import { environment } from '../../environments/environment';

interface IResponseAllShifts extends IResponseApi {
  data?: IShift[];
}

interface IResponseShift extends IResponseApi {
  data?: IShift;
}

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient, private tokenUserService: TokenUserService) {}
  // En tu ShiftService o un ServiceService
    getAllServices(): Observable<IResponseAllShifts> {
    return this.http.get<IResponseAllShifts>(`${environment.apiUrl}/service`, {
        headers: { Authorization: `Bearer ${this.tokenUserService.getToken()}` }
    });
    }


  getAllShifts(): Observable<IResponseAllShifts> {
    const url = `${environment.apiUrl}/shifts`;
    return this.http.get<IResponseAllShifts>(url);
  }

  createShift(shift: IShift): Observable<IResponseShift> {
    const url = `${environment.apiUrl}/shift/create`;
    return this.http.post<IResponseShift>(url, shift);
  }

  updateShift(id: string, shift: IShift): Observable<IResponseShift> {
    const url = `${environment.apiUrl}/shifts/${id}`;
    return this.http.put<IResponseShift>(url, shift);
  }

  deleteShift(id: string): Observable<IResponseApi> {
    const url = `${environment.apiUrl}/shifts/${id}`;
    return this.http.delete<IResponseApi>(url);
  }
}