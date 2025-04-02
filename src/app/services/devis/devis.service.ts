import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DevisService {

    private apiUrl = `${environment.apiUrl}/Devis`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }
    addDevis(devis: any): Observable<any> {
        return this.http.post(this.apiUrl, devis);
    }
    getLastDevis(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/last/${id}`);
    }
    updateDevis(id:string,donne:any):Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,donne);
    }
    getRevenue(data:any): Observable<any> {
        return this.http.get(`${this.apiUrl}/revenue`,data);
    }
}
