import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

    private apiUrl = `${environment.apiUrl}/Stocks`; //vous pouvez modifier le port
    constructor(private http: HttpClient) { }

    getStocks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/recherche-pieces-et-restant`);
    }
}
