import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/Utilisateurs`;

    constructor(private http: HttpClient) { }

    // Inscription
    register(nom: string, prenom: string, phone: string, email: string, mdp: string): Observable<any> {
        const user = { nom, prenom, phone, email, mdp };
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    // Connexion
    login(email: string, mdp: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, mdp }).pipe(
            tap((response: any) => {
                if (response.token && response.role) {
                    this.storeToken(response.token);
                    localStorage.setItem('role', response.role); // Stocker le rôle
                }
            })
        );
    }

    // Récupérer le profil
    getProfile(): Observable<any> {
        return this.http.get(`${this.apiUrl}/profile`);
    }

    // Stocker le token
    storeToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // Récupérer le token
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Récupérer le rôle de l'utilisateur
    getUserRole(): string | null {
        return localStorage.getItem('role');
    }

    // Déconnexion
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }
}
