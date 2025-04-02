import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisGeneralClientComponent } from './devis-general-client.component';

describe('DevisGeneralClientComponent', () => {
  let component: DevisGeneralClientComponent;
  let fixture: ComponentFixture<DevisGeneralClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisGeneralClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisGeneralClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
