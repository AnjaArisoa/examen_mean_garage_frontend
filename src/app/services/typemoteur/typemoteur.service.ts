import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TypemoteurService {

    private apiUrl = `${environment.apiUrl}/TypeMoteurs`; //vous pouvez modifier le port
             constructor(private http: HttpClient) { }
             getTypeMoeteur(): Observable<any> {
              return this.http.get(`${this.apiUrl}`);
              }
             addTypeMoteur(piece: any): Observable<any> {
                 return this.http.post(this.apiUrl, piece);
             }
}
