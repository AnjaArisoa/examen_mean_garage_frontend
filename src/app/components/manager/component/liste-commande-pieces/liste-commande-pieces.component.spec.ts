import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommandePiecesComponent } from './liste-commande-pieces.component';

describe('ListeCommandePiecesComponent', () => {
  let component: ListeCommandePiecesComponent;
  let fixture: ComponentFixture<ListeCommandePiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCommandePiecesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommandePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
