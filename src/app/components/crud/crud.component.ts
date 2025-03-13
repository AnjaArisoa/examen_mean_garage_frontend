import { TestService,Article } from '../../services/test.service';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-crud',
  imports: [CommonModule,
          TableModule,
          FormsModule,
          ButtonModule,
          RippleModule,
          ToastModule,
          ToolbarModule,
          RatingModule,
          InputTextModule,
          TextareaModule,
          SelectModule,
          RadioButtonModule,
          InputNumberModule,
          DialogModule,
          TagModule,
          InputIconModule,
          IconFieldModule,
          ConfirmDialogModule
      ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
  providers: [MessageService, TestService, ConfirmationService]
})
export class CrudComponent implements OnInit {
  articles: any[] = [];
  newArticle = { title: '', content: '' }; // Nouveau modèle pour le formulaire
  @ViewChild('dt') dt!: Table;
  selectedArticles!: Article[] | null;
  submitted: boolean = false;
  ArticleDialog: boolean = false;
  article!: Article;

  constructor(
    private testService: TestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  hideDialog() {
    this.ArticleDialog = false;
    this.submitted = false;
 }
  openNew() {
    this.article = {};
    this.submitted = false;
    this.ArticleDialog = true;
 }
  exportCSV() {
  this.dt.exportCSV();
  }
   onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
   }

  ngOnInit(): void {
  this.loadArticles();
  }

  loadArticles(): void {
  this.testService.getArticles().subscribe(data =>{console.log(data); this.articles =
  data});
  }

  deleteArticle(id: string): void {
  this.testService.deleteArticle(id).subscribe(() =>
  this.loadArticles());
  }
  deleteSelectedArticles() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            if (!this.selectedArticles || this.selectedArticles.length === 0) {
                return;
            }

            const selectedIds = this.selectedArticles.map(article => String(article._id));
            console.log("Articles sélectionnés :", selectedIds);

            const deleteRequests = selectedIds.map(id =>
                this.testService.deleteArticle(id)
            );


            forkJoin(deleteRequests).subscribe(() => {
                this.loadArticles();
                this.selectedArticles = null; // Réinitialiser la sélection

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Articles Deleted',
                    life: 3000
                });

            });
        }
    });
}

  addArticle(): void {
    this.submitted = true;
    if (this.newArticle.title && this.newArticle.content) {

    this.testService.addArticle(this.newArticle).subscribe(() => {

    this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Articles added',
        life: 3000
    });
    this.loadArticles();// Recharge la liste après ajout
    this.ArticleDialog = false;
    this.newArticle = { title: '', content: '' }; // Réinitialise le formulaire
    });
    }
    }

}
