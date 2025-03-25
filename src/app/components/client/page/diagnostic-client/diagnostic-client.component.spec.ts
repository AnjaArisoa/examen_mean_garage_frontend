import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticClientComponent } from './diagnostic-client.component';

describe('DiagnosticClientComponent', () => {
  let component: DiagnosticClientComponent;
  let fixture: ComponentFixture<DiagnosticClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
