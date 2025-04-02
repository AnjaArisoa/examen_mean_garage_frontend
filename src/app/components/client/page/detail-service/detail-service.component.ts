import { Component, ViewChild, ElementRef  } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TopbarClientComponent } from '../topbar-client/topbar-client.component';
import { FooterClientComponent } from '../footer-client/footer-client.component';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Dialog } from 'primeng/dialog';
import { jsPDF } from 'jspdf';
import { Message } from 'primeng/message';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-detail-service',
  imports: [CardModule, ButtonModule,TopbarClientComponent,FooterClientComponent,Dialog, ButtonModule, InputTextModule, AvatarModule,Message],
  templateUrl: './detail-service.component.html',
  styleUrl: './detail-service.component.scss'
})


export class DetailServiceComponent {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
    generatePDF() {
    const element = this.pdfContent.nativeElement;
    setTimeout(() => {
        html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Largeur A4 en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('export.pdf');
        });
    }, 1000); // Attendre 1 seconde pour s'assurer que l'image est chargée
    }

}
