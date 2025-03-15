import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { FooterClientComponent } from '../footer-client/footer-client.component';
@Component({
  selector: 'app-detail-service',
  imports: [CardModule, ButtonModule,TopbarClientComponent,FooterClientComponent],
  templateUrl: './detail-service.component.html',
  styleUrl: './detail-service.component.scss'
})
export class DetailServiceComponent {

}
