import { Component } from '@angular/core';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';

@Component({
  selector: 'app-detail-avancement',
  imports: [FooterClientComponent,TopbarClientComponent],
  templateUrl: './detail-avancement.component.html',
  styleUrl: './detail-avancement.component.scss'
})
export class DetailAvancementComponent {

}
