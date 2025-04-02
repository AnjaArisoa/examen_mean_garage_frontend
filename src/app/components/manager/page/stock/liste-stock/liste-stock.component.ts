import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { StockListeComponent } from '../../../component/stock-liste/stock-liste.component';


@Component({
  selector: 'app-liste-stock',
  imports: [
    StockListeComponent
  ],
  templateUrl: './liste-stock.component.html',
  styleUrl: './liste-stock.component.scss',

})
export class ListeStockComponent {

}
