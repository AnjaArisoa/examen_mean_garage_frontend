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
}
