import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacardvService {

    private apiUrl = `${environment.apiUrl}/MecaRendezVous`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }

    addMecaRdv(piece: any): Observable<any> {
        return this.http.post(this.apiUrl, piece);
    }
    getRendezvousMecaWithCollab(id: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/listerendezvous/${id}`);
    }
    getMecaRdv(data:any):Observable<any>{
        return this.http.get(`${this.apiUrl}/nombreParMeca`,data);
    }
}
