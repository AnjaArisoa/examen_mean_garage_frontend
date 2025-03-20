import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningRendezVousComponent } from './planning-rendez-vous.component';

describe('PlanningRendezVousComponent', () => {
  let component: PlanningRendezVousComponent;
  let fixture: ComponentFixture<PlanningRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningRendezVousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
