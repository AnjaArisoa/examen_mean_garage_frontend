import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommandepiecesService {

    private apiUrl = `${environment.apiUrl}/CommandePieces`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }

    getCommandePieces(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
    }
    addCommandePiece(piece: any): Observable<any> {
        return this.http.post(this.apiUrl, piece);
    }
    deleteCommandePiece(id:string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    check_commande(id: string,arrive:any): Observable<any> {
        return this.http.post(`${this.apiUrl}/check_commande/${id}`,arrive);
    }
    addReservationPiece(piece: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/reservationpieces`, piece);
    }

}
