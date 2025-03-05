import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments'; // Importde l’environnement

@Injectable({
 providedIn: 'root'
})
export class ArticleService {
private apiUrl = `${environment.apiUrl}/articles`; // Utilisation de la variable d’environnement
  constructor(private http: HttpClient) {}
    getArticles(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
    addArticle(article: FormData): Observable<any> {
      return this.http.post(this.apiUrl, article);
    }
    updateArticle(id: string, formData: FormData): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, formData);
    }
    deleteArticle(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
