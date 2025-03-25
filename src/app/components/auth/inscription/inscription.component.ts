import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TopbarClientComponent } from '../../client/page/topbar-client/topbar-client.component';
import { FooterClientComponent } from '../../client/page/footer-client/footer-client.component';
import { AuthService } from '../../../services/authservice/auth.service';

@Component({
  selector: 'app-inscription',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,TopbarClientComponent,FooterClientComponent],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode appelée lors de l'inscription
  onRegister() {
    if (this.nom && this.prenom && this.telephone && this.email && this.password) {
      this.authService.register(this.nom, this.prenom, this.telephone, this.email, this.password).subscribe(
        response => {
          console.log('Utilisateur inscrit avec succès', response);
          // Redirection après l'inscription (par exemple vers la page de connexion)
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    } else {
      console.error('Tous les champs doivent être remplis');
    }
  }
}
