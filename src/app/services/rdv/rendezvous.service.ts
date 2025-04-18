import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

    private apiUrl = `${environment.apiUrl}/RendezVous`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }

    checkMecaDispoetHeure(piece: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/checkMecaDispoetHeure`, piece);
    }
    checkMecaDispo(piece: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/checkMecaDispo`, piece);
    }
    checkMecaEtPieces(piece: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/checkMecaEtPieces`, piece);
    }
    addRDV(piece: any): Observable<any> {
        return this.http.post(this.apiUrl, piece);
    }
    getLastRdv(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/last/${id}`);
    }
    getRendezvousManager(date:any): Observable<any> {
        return this.http.get(`${this.apiUrl}/rendezvous`,date);
    }
    getDetailRendezvousManager(id:string): Observable<any> {
        return this.http.get(`${this.apiUrl}/rendezvous/${id}`);
    }
    getrdv():Observable<any>{
        return this.http.get(`${this.apiUrl}`);
    }

    getRdvByUser(id:string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getRendezVousByUtilisateur/${id}`);
    }

    getById(id:string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
}
