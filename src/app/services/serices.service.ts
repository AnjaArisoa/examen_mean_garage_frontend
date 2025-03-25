import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
    _id?: string;
    nom?: string;
    description?: string;
    image?: string;
}
@Injectable({
  providedIn: 'root'
})
export class SericesService {

    private apiUrl = `${environment.apiUrl}/Services`; //vous pouvez modifier le port
    constructor(private http: HttpClient) {}
    getServices(): Observable<any> {
      return this.http.get(this.apiUrl);
      }
    addService(article: any): Observable<any> {
      return this.http.post(this.apiUrl, article);
      }
    updateService(id: string, article: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, article);
      }
    deleteService(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
      }
}
