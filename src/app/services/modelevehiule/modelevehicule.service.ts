import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelevehiculeService {

   private apiUrl = `${environment.apiUrl}/ModeleVehicules`; //vous pouvez modifier le port
       constructor(private http: HttpClient) { }
       getModeleVehicule(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
        }
       addModeleVehicule(piece: any): Observable<any> {
           return this.http.post(this.apiUrl, piece);
       }
}
