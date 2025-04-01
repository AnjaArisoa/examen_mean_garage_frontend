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
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, TopbarClientComponent, FooterClientComponent, Tabs, TabList, Tab, TabPanels, TabPanel],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    email: string = 'client@gmail.com';
    mdp: string = "anja";

    constructor(private authService: AuthService, private router: Router) { }

    stat(nombre: number) {
        if (nombre == 1) {
            this.email = 'mecanicien@gmail.com';
            this.mdp = 'test';
        }
        if (nombre == 2) {
            this.email = 'manager@garanja.com';
            this.mdp = 'notia';
        }
    }

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
