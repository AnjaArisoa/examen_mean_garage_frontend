import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterClientComponent } from './footer-client.component';

describe('FooterClientComponent', () => {
  let component: FooterClientComponent;
  let fixture: ComponentFixture<FooterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
