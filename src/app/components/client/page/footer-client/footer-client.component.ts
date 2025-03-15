import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'app-footer-client',
  imports: [RouterModule,ChipModule],
  templateUrl: './footer-client.component.html',
  styleUrl: './footer-client.component.scss'
})
export class FooterClientComponent {
    constructor(public router: Router) {}
}
