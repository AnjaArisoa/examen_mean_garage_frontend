import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningMecanicienComponent } from './planing-mecanicien.component';

describe('PlaningMecanicienComponent', () => {
  let component: PlaningMecanicienComponent;
  let fixture: ComponentFixture<PlaningMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaningMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaningMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
