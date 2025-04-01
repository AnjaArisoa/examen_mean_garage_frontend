import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private apiUrl = `${environment.apiUrl}/Stocks`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }

    getStocks(nomPiece: string, reference: string, modeleVehicule: string, marqueVehicule: string, categorieVehicule: string): Observable<any> {
        // Créer un objet HttpParams
        let params = new HttpParams();

        // Ajouter les paramètres si les valeurs sont présentes
        if (nomPiece) params = params.set('nomPiece', nomPiece);
        if (reference) params = params.set('reference', reference);
        if (modeleVehicule) params = params.set('modeleVehicule', modeleVehicule);
        if (marqueVehicule) params = params.set('marqueVehicule', marqueVehicule);
        if (categorieVehicule) params = params.set('categorieVehicule', categorieVehicule);

        // Retourner la requête GET avec les paramètres
        return this.http.get(`${this.apiUrl}/recherche-pieces-et-restant`, { params });
    }

    getStockByPiece(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getStockByPiece/${id}`);
    }
    addSorti(sorti: any): Observable<any> {
        return this.http.post(this.apiUrl, sorti);
    }

}
