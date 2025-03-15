
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../includes/header/header.component';
import {FooterComponent} from '../includes/footer/footer.component';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

}
