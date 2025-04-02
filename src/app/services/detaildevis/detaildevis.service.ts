import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetaildevisService {

    private apiUrl = `${environment.apiUrl}/DetailPieces`;
    constructor(private http: HttpClient) { }
    addDetailDevis(devis: any): Observable<any> {
        return this.http.post(this.apiUrl, devis);
    }
    getDetailDevis(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
    }
    getSumDetailDevis(id:string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getByDevis/${id}`);
    }
    getByDetailDevis(id:string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getByDetailDevis/${id}`);
    }

    getDetailDevisByIdDevis(id: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/detaildevis/${id}`);
    }
    getAllInfoTache(id: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/getAllTacheAndPiece/${id}`);
    }
    getAllTacheEnCour(id: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/getAllTacheAndPieceEnCours/${id}`);
    }
    getAllTacheTerminer(id: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/getAllTacheAndPieceTerminer/${id}`);
    }
    UpdateTache(id: string,iddevis: string,tache: any): Observable<any>{
        return this.http.put(`${this.apiUrl}/updatetache/${id}/${iddevis}`,tache);
    }
    getTacheDevis(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/detailForRdv/${id}`);
    }
    getTachePop(data:any): Observable<any>{
        return this.http.get(`${this.apiUrl}/getTachePop`,data);
    }
}
