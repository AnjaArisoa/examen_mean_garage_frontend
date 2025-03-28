import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiecesService {

  private apiUrl = `${environment.apiUrl}/Pieces`; //vous pouvez modifier le port
     constructor(private http: HttpClient) { }

     addPieces(piece: any): Observable<any> {
         return this.http.post(this.apiUrl, piece);
     }

        // Fonction pour récupérer les pièces par catégorie et modèle de véhicule
    getPieces(categorieVehicule: string, modeleVehicule: string): Observable<any> {
        // Construire l'URL avec les paramètres
        const url = `${this.apiUrl}/getPieces?categorieVehicule=${categorieVehicule}&modeleVehicule=${modeleVehicule}`;
        return this.http.get<any>(url);  // Retourner l'Observable de la requête GET
    }
    getPiecesTache(categorieVehicule: string, modeleVehicule: string,id:string): Observable<any> {
        // Construire l'URL avec les paramètres
        const url = `${this.apiUrl}/getPiecesForTache?categorieVehicule=${categorieVehicule}&modeleVehicule=${modeleVehicule}&tacheId=${id}`;
        return this.http.get<any>(url);  // Retourner l'Observable de la requête GET
    }
}
