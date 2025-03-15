import { Component } from '@angular/core';
import { TopbarClientComponent } from "../page/topbar-client/topbar-client.component";
import { AccueilClientComponent } from "../page/accueil-client/accueil-client.component";
import { AboutClientComponent } from "../page/about-client/about-client.component";
import { ServiceClientComponent } from "../page/service-client/service-client.component";
import { FooterClientComponent } from "../page/footer-client/footer-client.component";
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-client',
  imports: [RouterModule,TopbarClientComponent, AccueilClientComponent, AboutClientComponent, ServiceClientComponent, FooterClientComponent,RippleModule, StyleClassModule, ButtonModule, DividerModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
