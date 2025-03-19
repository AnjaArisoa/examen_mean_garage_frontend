import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePiecesComponent } from './commande-pieces.component';

describe('CommandePiecesComponent', () => {
  let component: CommandePiecesComponent;
  let fixture: ComponentFixture<CommandePiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandePiecesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
