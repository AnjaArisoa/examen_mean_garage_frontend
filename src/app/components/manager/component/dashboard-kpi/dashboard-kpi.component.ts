import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendezvousService } from '../../../../services/rdv/rendezvous.service';



@Component({
  selector: 'app-dashboard-kpi',
  imports: [CommonModule],
  templateUrl: './dashboard-kpi.component.html',
  styleUrl: './dashboard-kpi.component.scss'
})
export class DashboardKpiComponent implements OnInit{
    countRdv:number=0;
     constructor(private rendezvousService: RendezvousService) {}
     ngOnInit(): void {
        this.getrdv();
     }
     async getrdv(){
        const val=await lastValueFrom(this.rendezvousService.getrdv());
        this.countRdv=val.length
     }

}
