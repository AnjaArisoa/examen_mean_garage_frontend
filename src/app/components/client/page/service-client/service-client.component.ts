import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { PhotoService } from '../../../../pages/service/photo.service';
import { SericesService } from '../../../../services/serices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-client',
  imports: [CommonModule, CarouselModule, ButtonModule, GalleriaModule, ImageModule, TagModule],
  templateUrl: './service-client.component.html',
  styleUrl: './service-client.component.scss'
})
export class ServiceClientComponent implements OnInit{

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private servicesService: SericesService,
        private router: Router
    ) {}

    services: any[] = [];
        ngOnInit(): void {
            this.loadArticles();
        }
        loadArticles(): void {
            this.servicesService.getServices().subscribe(data => this.services =
                data);
        }
    goToProductDetail(serviceid: string) {
        this.router.navigate(['/product', serviceid]);
    }
}
