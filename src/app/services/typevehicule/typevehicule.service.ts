import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TypevehiculeService {

    private apiUrl = `${environment.apiUrl}/TypeVehicules`; //vous pouvez modifier le port
             constructor(private http: HttpClient) { }
             getTypeVehicule(): Observable<any> {
              return this.http.get(`${this.apiUrl}`);
              }
             addTypeVehicule(piece: any): Observable<any> {
                 return this.http.post(this.apiUrl, piece);
             }
}
