import { Component } from '@angular/core';
import { ServiceListeComponent } from '../../component/service-liste/service-liste.component';

@Component({
  selector: 'app-service',
  imports: [ServiceListeComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

}
