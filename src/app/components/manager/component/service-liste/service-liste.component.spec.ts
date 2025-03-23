import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListeComponent } from './service-liste.component';

describe('ServiceListeComponent', () => {
  let component: ServiceListeComponent;
  let fixture: ComponentFixture<ServiceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
