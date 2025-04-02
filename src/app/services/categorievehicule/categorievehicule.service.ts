import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorievehiculeService {

  private apiUrl = `${environment.apiUrl}/CategorieVehicules`; //vous pouvez modifier le port
           constructor(private http: HttpClient) { }
           getCategorieVehicule(): Observable<any> {
            return this.http.get(`${this.apiUrl}`);
            }
           addCetegorieVehicule(piece: any): Observable<any> {
               return this.http.post(this.apiUrl, piece);
           }
           getByCategorie(id:string): Observable<any> {
            return this.http.get(`${this.apiUrl}/getByCategorie/${id}`);
            }

  }

