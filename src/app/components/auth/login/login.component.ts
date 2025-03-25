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
import { AuthService } from '../../../services/authservice/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, TopbarClientComponent, FooterClientComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    email: string = '';

    mdp: string = '';


    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.email, this.mdp).subscribe(
            (response) => {
                const role = this.authService.getUserRole();
                if (role === 'mecanicien') {
                    this.router.navigate(['/mecanicien']);
                } else if (role === 'manager') {
                    this.router.navigate(['/manager']);
                } else {
                    this.router.navigate(['/']);
                }
            },
            (error) => {
                console.error('Erreur de connexion', error);
            }
        );
    }

}
