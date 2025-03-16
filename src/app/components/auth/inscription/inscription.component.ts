import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TopbarClientComponent } from '../../client/page/topbar-client/topbar-client.component';
import { FooterClientComponent } from '../../client/page/footer-client/footer-client.component';

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
}
