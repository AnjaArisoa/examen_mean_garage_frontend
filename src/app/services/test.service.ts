import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
    _id?: string;
    title?: string;
    content?: string;
}
@Injectable({
  providedIn: 'root'
})

export class TestService {

    private apiUrl = `${environment.apiUrl}/articles`; //vous pouvez modifier le port
    constructor(private http: HttpClient) {}
    getArticles(): Observable<any> {
      return this.http.get(this.apiUrl);
      }
    addArticle(article: any): Observable<any> {
      return this.http.post(this.apiUrl, article);
      }
    updateArticle(id: string, article: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, article);
      }
    deleteArticle(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
      }
}

