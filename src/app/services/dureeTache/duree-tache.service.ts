import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DureeTacheService {

    private apiUrl = `${environment.apiUrl}/DureeTaches`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }
    addDureeTache(devis: any): Observable<any> {
        return this.http.post(this.apiUrl, devis);
    }
    getDureeTache(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getByTache/${id}`);
    }
}
