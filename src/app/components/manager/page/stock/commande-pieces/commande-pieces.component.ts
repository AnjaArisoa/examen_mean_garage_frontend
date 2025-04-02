import { Component } from '@angular/core';
import { ListeCommandePiecesComponent } from '../../../component/liste-commande-pieces/liste-commande-pieces.component';

@Component({
  selector: 'app-commande-pieces',
  imports: [ListeCommandePiecesComponent],
  templateUrl: './commande-pieces.component.html',
  styleUrl: './commande-pieces.component.scss'
})
export class CommandePiecesComponent {

}
