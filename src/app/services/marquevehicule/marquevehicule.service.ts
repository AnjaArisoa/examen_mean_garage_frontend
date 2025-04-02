import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarquevehiculeService {

   private apiUrl = `${environment.apiUrl}/MarqueVehicules`; //vous pouvez modifier le port
         constructor(private http: HttpClient) { }
         getMarqueVehicule(): Observable<any> {
          return this.http.get(`${this.apiUrl}`);
          }
         addMarqueVehicule(piece: any): Observable<any> {
             return this.http.post(this.apiUrl, piece);
         }
}
