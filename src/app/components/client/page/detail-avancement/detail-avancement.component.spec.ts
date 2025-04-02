import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAvancementComponent } from './detail-avancement.component';

describe('DetailAvancementComponent', () => {
  let component: DetailAvancementComponent;
  let fixture: ComponentFixture<DetailAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAvancementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
